import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setReviews } from "redux/productSlice";
import qs from "qs";
import ReviewList from "components/admin/ReviewList";
import AdminLayout from "components/shared/AdminLayout";
import ssrRequest from "utils/ssrRequest";

const ProductsReviews = ({ data, totalCount }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = router;
    const { page: pageCount, search } = query;

    useEffect(() => {
        dispatch(setReviews(data));
    }, [pageCount, search]);

    return (
        <AdminLayout>
            <ReviewList data={data} totalCount={totalCount} />
        </AdminLayout>
    );
};

export default ProductsReviews;

ProductsReviews.getLayout = function PageLayout(page) {
    return <>{page}</>;
};

export const getServerSideProps = async ({ req, res, query }) => {
    const { page, search } = query;

    const options = {
        page: page ? page : 1,
    };
    if (search) options.search = search;

    const queryString = qs.stringify(options);

    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/admin/reviews?${queryString}`;

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
