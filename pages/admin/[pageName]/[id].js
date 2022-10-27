import { useRouter } from "next/router";
import AdminLayout from "components/shared/AdminLayout";
import CreateORUpdateProduct from "components/admin/CreateORUpdateProduct";
import CreateORUpdateCoupon from "components/admin/CreateORUpdateCoupon";
import OrderDetails from "components/admin/OrderDetails";
import CreateORUpdateCategoryAndBrand from "components/admin/CreateORUpdateCategoryAndBrand";
import ssrRequest from "utils/ssrRequest";

const Details = ({ data }) => {
    const router = useRouter();
    const { query } = router;
    const { pageName } = query;

    return (
        <AdminLayout>
            {pageName === "products" && (
                <CreateORUpdateProduct heading="Edit Product" data={data} />
            )}
            {pageName === "categories" && (
                <CreateORUpdateCategoryAndBrand
                    heading="Edit Category"
                    data={data}
                />
            )}
            {pageName === "brands" && (
                <CreateORUpdateCategoryAndBrand
                    heading="Edit Brand"
                    data={data}
                />
            )}
            {pageName === "coupons" && (
                <CreateORUpdateCoupon heading="Edit Coupon" data={data} />
            )}
            {pageName === "orders" && <OrderDetails order={data} />}
        </AdminLayout>
    );
};

export default Details;

Details.getLayout = function PageLayout(page) {
    return <>{page}</>;
};

export const getServerSideProps = async ({ req, res, params }) => {
    const { pageName, id } = params;
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/admin/${pageName}/${id}`;

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
        },
    };
};
