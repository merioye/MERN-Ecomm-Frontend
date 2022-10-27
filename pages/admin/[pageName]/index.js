import { useEffect } from "react";
import { useRouter } from "next/router";
import qs from "qs";
import { useDispatch } from "react-redux";
import {
    setBrands,
    setCategories,
    setUsers,
    setProducts,
    setCoupons,
} from "redux/productSlice";
import { setOrders } from "redux/orderSlice";
import AdminLayout from "components/shared/AdminLayout";
import ProductList from "components/admin/ProductList";
import UserList from "components/admin/UserList";
import OrderList from "components/admin/OrderList";
import CategoryAndBrandList from "components/admin/CategoryAndBrandList";
import CouponList from "components/admin/CouponList";
import Dashboard from "components/admin/Dashboard";
import ssrRequest from "utils/ssrRequest";

const Admin = ({ data, totalCount }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = router;
    const { pageName, page: pageCount, search } = query;

    useEffect(() => {
        if (pageName === "brands") dispatch(setBrands(data));
        else if (pageName === "categories") dispatch(setCategories(data));
        else if (pageName === "users") dispatch(setUsers(data.users));
        else if (pageName === "products")
            dispatch(setProducts({ productType: "all", products: data }));
        else if (pageName === "coupons") dispatch(setCoupons(data));
        else if (pageName === "orders") dispatch(setOrders(data));
    }, [pageName, pageCount, search]);

    return (
        <AdminLayout>
            {pageName === "dashboard" && <Dashboard data={data} />}
            {pageName === "products" && (
                <ProductList
                    heading="Product List"
                    data={data}
                    totalCount={totalCount}
                />
            )}
            {pageName === "users" && (
                <UserList
                    data={data.users}
                    noOfOrders={data.noOfOrders}
                    totalCount={totalCount}
                />
            )}
            {pageName === "orders" && (
                <OrderList
                    heading="Order List"
                    data={data}
                    totalCount={totalCount}
                />
            )}
            {pageName === "categories" && (
                <CategoryAndBrandList
                    name="Category"
                    data={data}
                    totalCount={totalCount}
                />
            )}
            {pageName === "brands" && (
                <CategoryAndBrandList
                    name="Brand"
                    data={data}
                    totalCount={totalCount}
                />
            )}
            {pageName === "coupons" && (
                <CouponList data={data} totalCount={totalCount} />
            )}
        </AdminLayout>
    );
};

export default Admin;

Admin.getLayout = function PageLayout(page) {
    return <>{page}</>;
};

export const getServerSideProps = async ({ req, res, params, query }) => {
    const { pageName } = params;
    const { page, search } = query;

    const options = {};
    if (pageName !== "dashboard") options.page = page ? page : 1;
    if (search) options.search = search;

    const queryString = qs.stringify(options);

    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/admin/${pageName}?${queryString}`;

    const [error, data] = await ssrRequest(req, res, url);
    if (!data) {
        return {
            redirect: {
                statusCode: 307,
                destination: "/",
            },
        };
    }
    return {
        props: {
            data: data.result,
            totalCount: data.totalCount,
        },
    };
};
