import { Pagination } from "@mui/material";
import qs from "qs";

const CustomPagination = ({
    totalCount,
    page,
    setPage,
    router,
    pageName,
    search,
    fromAdmin,
    queryOptions,
}) => {
    return (
        <Pagination
            variant="outlined"
            color="primary"
            count={Math.ceil(totalCount / 8)}
            page={page}
            onChange={(e, value) => {
                setPage(value);
                if (!fromAdmin) {
                    // if (pageName === "search") {
                    //     if (queryOptions.hasOwnProperty("page")) {
                    //         delete queryOptions["page"];
                    //     }

                    //     if (value > 1) queryOptions.page = value;

                    //     const queryString = qs.stringify(queryOptions);
                    //     router.push(`/search?${queryString}`);
                    // } else if (pageName === "orders") {
                    // }
                    if (queryOptions.hasOwnProperty("page")) {
                        delete queryOptions["page"];
                    }

                    if (value > 1) queryOptions.page = value;

                    const queryString = qs.stringify(queryOptions);
                    router.push(`/${pageName}?${queryString}`);
                } else {
                    if (search) {
                        if (value === 1) {
                            router.push(`/admin/${pageName}?search=${search}`);
                        } else {
                            router.push(
                                `/admin/${pageName}?page=${value}&search=${search}`
                            );
                        }
                    } else {
                        if (value === 1) {
                            router.push(`/admin/${pageName}`);
                        } else {
                            router.push(`/admin/${pageName}?page=${value}`);
                        }
                    }
                }
            }}
        />
    );
};

export default CustomPagination;
