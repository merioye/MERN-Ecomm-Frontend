import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleFiltersVisibility } from "redux/productSlice";
import { useTheme, Box, Grid, IconButton, Typography } from "@mui/material";
import HomePageSlider from "components/Home/HomePageSlider";
import ServiceCard from "components/Home/ServiceCard";
import HomePageSectionHeading from "components/Home/HomePageSectionHeading";
import FeaturedBrandCard from "components/Home/FeaturedBrandCard";
import CategoryCard from "components/Home/CategoryCard";
import ProductCard from "components/shared/ProductCard";
import FilterListIcon from "@mui/icons-material/FilterList";
import Filters from "components/shared/Filters";
import Carousel from "components/Home/Carousel";
import ssrRequest from "utils/ssrRequest";

const style = {
    mainContainer: {
        width: "100%",
        height: "auto",
        backgroundColor: "bg.primary",
        paddingBottom: "50px",
    },
    itemsContainer: {
        width: { xs: "90%", m: "600px", xm: "900px", lg: "1200px" },
        margin: "auto",
        marginBottom: { xs: "10px", sm: "24px" },
    },
    featuredBrands: {
        width: { xs: "90%", m: "600px", xm: "900px", lg: "1200px" },
        margin: "auto",
        marginBottom: { xs: "30px", sm: "24px" },
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "bg.secondary",
    },
};
const Home = ({
    categories,
    productsPriceRange,
    featuredBrands,
    flashDealProducts,
    featuredProducts,
    moreForYouProducts,
    newArrivalProducts,
    topRatedProducts,
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    // removing '#_=_' hash from url if present(it is necessary bcz when you login with facebook it appends this hash to the url)
    useEffect(() => {
        if (window.location.hash === "#_=_") {
            if (history.replaceState) {
                const cleanHref = window.location.href.split("#")[0];
                history.replaceState(null, null, cleanHref);
            } else {
                window.location.hash = "";
            }
            document.title = "TeleCart";
        }
    }, []);

    return (
        <Box sx={style.mainContainer}>
            <HomePageSlider />

            <Grid
                container
                justifyContent={{ xs: "center", m: "space-between" }}
                gap={3}
                display={{ xs: "none", m: "flex" }}
                sx={style.itemsContainer}
            >
                <ServiceCard
                    columns={2.6}
                    iconBgColor="#fcd9bd"
                    iconTextColor="pink.dark"
                    title="Fast Delivery"
                    body="Start from $10"
                />
                <ServiceCard
                    columns={2.6}
                    iconBgColor="#c3ddfd"
                    iconTextColor="bg.blue"
                    title="Money Guarantee"
                    body="7 days back"
                />
                <ServiceCard
                    columns={2.6}
                    iconBgColor="bg.silver"
                    iconTextColor="text.primary"
                    title="365 days"
                    body="For free return"
                />
                <ServiceCard
                    columns={2.6}
                    iconBgColor="bg.green"
                    iconTextColor="#0e9f6e"
                    title="Payment"
                    body="Secure system"
                />
            </Grid>

            <Grid
                container
                justifyContent="flex-end"
                alignItems="center"
                sx={style.itemsContainer}
            >
                <Grid item>
                    <Typography
                        variant="body1"
                        sx={{ color: "text.primary", marginRight: "10px" }}
                    >
                        Filters :
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => dispatch(toggleFiltersVisibility(true))}
                    >
                        <FilterListIcon sx={{ color: "text.primary" }} />
                    </IconButton>
                </Grid>
            </Grid>
            <Filters
                categories={categories}
                productsPriceRange={productsPriceRange}
            />

            {flashDealProducts.length ? (
                <>
                    <HomePageSectionHeading
                        heading="Flash Deals"
                        link="/search?onSale=true"
                    />
                    <Carousel
                        type="product"
                        heading="Flash Deals"
                        products={flashDealProducts}
                    />
                </>
            ) : null}
            {featuredBrands.length ? (
                <>
                    <HomePageSectionHeading
                        heading="Featured Brands"
                        link="/search?isFeatured=true&isBrand=true"
                    />
                    <Grid
                        container
                        justifyContent={{ xs: "center", m: "flex-start" }}
                        gap={2.255}
                        sx={style.featuredBrands}
                        style={{
                            boxShadow: theme.palette.boxShadow.card,
                        }}
                    >
                        {featuredBrands.map((brand) => {
                            return (
                                <Grid item key={brand._id}>
                                    <FeaturedBrandCard
                                        key={brand._id}
                                        brand={brand}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            ) : null}

            {newArrivalProducts.length ? (
                <>
                    <HomePageSectionHeading
                        heading="New Arrivals"
                        link="/search?sort=date"
                    />
                    <Carousel
                        type="smallProduct"
                        heading="arrival"
                        products={newArrivalProducts}
                    />
                </>
            ) : null}

            {topRatedProducts.length ? (
                <>
                    <HomePageSectionHeading
                        heading="Top Ratings"
                        link="/search?topRated=true"
                    />
                    <Carousel
                        type="smallProduct"
                        heading="rating"
                        products={topRatedProducts}
                    />
                </>
            ) : null}

            {featuredProducts.length ? (
                <>
                    <HomePageSectionHeading
                        heading="Featured Products"
                        link="/search?isFeatured=true"
                    />
                    <Carousel
                        type="product"
                        heading="Featured Products"
                        products={featuredProducts}
                    />
                </>
            ) : null}

            {categories.length ? (
                <>
                    <HomePageSectionHeading heading="Categories" />
                    <Grid
                        container
                        gap={3}
                        sx={style.itemsContainer}
                        display={{ xs: "none", m: "flex" }}
                        style={{ marginBottom: "50px" }}
                    >
                        {categories.map((category) => {
                            return (
                                <CategoryCard
                                    key={category._id}
                                    category={category}
                                />
                            );
                        })}
                    </Grid>
                </>
            ) : null}

            {moreForYouProducts.length ? (
                <>
                    <HomePageSectionHeading
                        heading="More For You"
                        link="/search?sort=date"
                    />
                    <Grid
                        container
                        gap={{ xs: 2, sm: 3 }}
                        sx={style.itemsContainer}
                    >
                        {moreForYouProducts.map((product) => {
                            return (
                                <Grid
                                    sx={{ width: { xs: "100%", m: "initial" } }}
                                    item
                                    key={product._id}
                                >
                                    <ProductCard
                                        fromCarousel={false}
                                        product={product}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            ) : null}
        </Box>
    );
};

export default Home;

export const getServerSideProps = async ({ req, res }) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/products/home`;
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
            productsPriceRange: data.productsPriceRange,
            featuredBrands: data.featuredBrands,
            flashDealProducts: data.flashDealProducts,
            featuredProducts: data.featuredProducts,
            moreForYouProducts: data.moreForYouProducts,
            newArrivalProducts: data.newArrivalProducts,
            topRatedProducts: data.topRatedProducts,
        },
    };
};
