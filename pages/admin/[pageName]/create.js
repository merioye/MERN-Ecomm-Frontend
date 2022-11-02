import { useRouter } from "next/router";
import AdminLayout from "components/shared/AdminLayout";
import CreateORUpdateProduct from "components/admin/CreateORUpdateProduct";
import CreateORUpdateCoupon from "components/admin/CreateORUpdateCoupon";
import CreateORUpdateCategoryAndBrand from "components/admin/CreateORUpdateCategoryAndBrand";

const CreateProduct = () => {
    const router = useRouter();
    const { pageName } = router.query;

    return (
        <AdminLayout>
            {pageName === "products" && (
                <CreateORUpdateProduct heading="Add New Product" />
            )}
            {pageName === "categories" && (
                <CreateORUpdateCategoryAndBrand heading="Add New Category" />
            )}
            {pageName === "brands" && (
                <CreateORUpdateCategoryAndBrand heading="Add New Brand" />
            )}
            {pageName === "coupons" && (
                <CreateORUpdateCoupon heading="Add New Coupon" />
            )}
        </AdminLayout>
    );
};

export default CreateProduct;

CreateProduct.getLayout = function PageLayout(page) {
    return <>{page}</>;
};
