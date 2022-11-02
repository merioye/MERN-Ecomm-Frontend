import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleFiltersVisibility } from "redux/productSlice";
import {
    useTheme,
    Grid,
    Box,
    Typography,
    MenuItem,
    IconButton,
} from "@mui/material";
import qs from "qs";
import SelectBox from "components/shared/SelectBox";
import Filters from "components/shared/Filters";
import ProductCard from "components/shared/ProductCard";
import LandscapeProductCard from "components/others/LandscapeProductCard";
import FeaturedBrandCard from "components/Home/FeaturedBrandCard";
import CustomPagination from "components/shared/CustomPagination";
import redirect from "utils/redirect";
import ssrRequest from "utils/ssrRequest";
import ViewListIcon from "@mui/icons-material/ViewList";
import AppsIcon from "@mui/icons-material/Apps";
import FilterListIcon from "@mui/icons-material/FilterList";

const style = {
    mainContainer: {
        width: "100%",
        height: "auto",
        backgroundColor: "bg.primary",
        paddingTop: "30px",
        paddingBottom: "5px",
    },
    filtersContainer: {
        width: "1200px",
        margin: "auto",
        padding: "0.8rem 1.25rem",
        backgroundColor: "bg.secondary",
        color: "text.primary",
        borderRadius: "8px",
    },
    lightText: {
        fontSize: "14px",
        color: "text.light",
        fontWeight: 400,
        lineHeight: 1.75,
    },
    itemsContainer: {
        width: "1200px",
        margin: "auto",
        marginTop: "55px",
    },
};
const Search = ({
    categories,
    brands,
    productsPriceRange,
    data,
    totalCount,
    type,
}) => {
    const [values, setValues] = useState({ sortBy: "relevance" });
    const [productsView, setProductsView] = useState("grid");
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();

    const queryOptions = qs.parse(router.asPath.split("?")[1]);

    return (
        <Box sx={style.mainContainer}>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={style.filtersContainer}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <Grid item>
                    <Grid container flexDirection="column">
                        <Grid item>
                            <Typography
                                variant="h5"
                                fontSize="16px"
                                fontWeight={600}
                            >
                                Results
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" sx={style.lightText}>
                                {totalCount === 0 ? "No" : totalCount} results
                                found
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {type === "product" ? (
                    <Grid item>
                        <Grid container gap={3}>
                            <Grid item>
                                <Grid
                                    container
                                    alignItems="center"
                                    sx={{ width: "220px" }}
                                >
                                    <Grid item xs={3.3}>
                                        <Typography
                                            variant="body1"
                                            sx={style.lightText}
                                        >
                                            Sort by :
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8.7}>
                                        <SelectBox
                                            label=""
                                            name="sortBy"
                                            errorMessage=""
                                            values={values}
                                            setValues={setValues}
                                            fromAdmin={false}
                                        >
                                            <MenuItem
                                                sx={theme.userSelectMenuItem}
                                                value="relevance"
                                                onClick={() =>
                                                    redirect(
                                                        router,
                                                        queryOptions,
                                                        "sort",
                                                        false
                                                    )
                                                }
                                            >
                                                Relevance
                                            </MenuItem>
                                            <MenuItem
                                                sx={theme.userSelectMenuItem}
                                                value="date"
                                                onClick={() =>
                                                    redirect(
                                                        router,
                                                        queryOptions,
                                                        "sort",
                                                        "date"
                                                    )
                                                }
                                            >
                                                Date
                                            </MenuItem>
                                            <MenuItem
                                                sx={theme.userSelectMenuItem}
                                                value="lth"
                                                onClick={() =>
                                                    redirect(
                                                        router,
                                                        queryOptions,
                                                        "sort",
                                                        "lth"
                                                    )
                                                }
                                            >
                                                Price Low to High
                                            </MenuItem>
                                            <MenuItem
                                                sx={theme.userSelectMenuItem}
                                                value="htl"
                                                onClick={() =>
                                                    redirect(
                                                        router,
                                                        queryOptions,
                                                        "sort",
                                                        "htl"
                                                    )
                                                }
                                            >
                                                Price High to Low
                                            </MenuItem>
                                        </SelectBox>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item>
                                        <Grid
                                            container
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <Grid item>
                                                <Typography
                                                    variant="body1"
                                                    sx={style.lightText}
                                                >
                                                    View :
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <IconButton
                                                    onClick={() =>
                                                        setProductsView("grid")
                                                    }
                                                >
                                                    <AppsIcon
                                                        sx={
                                                            productsView ===
                                                            "grid"
                                                                ? {
                                                                      color: "pink.dark",
                                                                  }
                                                                : {
                                                                      color: "text.primary",
                                                                  }
                                                        }
                                                    />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() =>
                                                        setProductsView("list")
                                                    }
                                                >
                                                    <ViewListIcon
                                                        sx={
                                                            productsView ===
                                                            "list"
                                                                ? {
                                                                      color: "pink.dark",
                                                                  }
                                                                : {
                                                                      color: "text.primary",
                                                                  }
                                                        }
                                                    />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container gap={1} alignItems="center">
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            sx={style.lightText}
                                        >
                                            Filters :
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            onClick={() =>
                                                dispatch(
                                                    toggleFiltersVisibility(
                                                        true
                                                    )
                                                )
                                            }
                                        >
                                            <FilterListIcon
                                                sx={{ color: "text.primary" }}
                                            />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : null}
            </Grid>

            {type === "product" && (
                <Filters
                    categories={categories}
                    productsPriceRange={productsPriceRange}
                    brands={brands}
                />
            )}

            {data.length ? (
                <Grid
                    container
                    flexDirection={productsView === "grid" ? "row" : "column"}
                    gap={3}
                    sx={style.itemsContainer}
                >
                    {type === "product"
                        ? data.map((product) => {
                              return (
                                  <Grid key={product._id} item>
                                      {productsView === "grid" ? (
                                          <ProductCard
                                              fromCarousel={false}
                                              product={product}
                                          />
                                      ) : (
                                          <LandscapeProductCard
                                              product={product}
                                          />
                                      )}
                                  </Grid>
                              );
                          })
                        : data.map((brand) => {
                              return (
                                  <Grid key={brand._id} item>
                                      <FeaturedBrandCard brand={brand} />
                                  </Grid>
                              );
                          })}
                </Grid>
            ) : null}

            {data.length ? (
                <Box sx={theme.adminTablePaginationContainer}>
                    <CustomPagination
                        totalCount={totalCount}
                        page={page}
                        setPage={setPage}
                        router={router}
                        pageName="search"
                        search={null}
                        fromAdmin={false}
                        queryOptions={queryOptions}
                    />
                </Box>
            ) : null}
        </Box>
    );
};

export default Search;

export const getServerSideProps = async ({ req, res, query }) => {
    let options = { ...query };
    if (!options.page) options.page = 1;

    if (Object.keys(options).length === 1) options = {};

    const queryString = qs.stringify(options);

    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/products/filtered?${queryString}`;
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
            categories: data.categories,
            brands: data.brands,
            productsPriceRange: data.productsPriceRange,
            data: data.data,
            totalCount: data.totalCount,
            type: data.type,
        },
    };
};
