import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWishlistProducts } from "redux/wishlistSlice";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import PageHeading from "components/cart/PageHeading";
import UserDashboardSidebar from "components/shared/UserDashboardSidebar";
import ProductCard from "components/shared/ProductCard";
import ssrRequest from "utils/ssrRequest";

const style = {
    container: {
        padding: "40px 0px",
        width: "100%",
    },
    itemsContainer: {
        width: { lg: "1200px", xs: "90%" },
        margin: "auto",
        paddingTop: "30px",
    },
    emptyContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    imageContainer: {
        height: "50px",
        width: "60px",
        position: "relative",
    },
};
const Wishlist = ({ wishlistProducts }) => {
    const { status, wishlistProductsList } = useSelector(
        (state) => state.wishlist.wishlistProducts
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setWishlistProducts(wishlistProducts));
    }, []);

    return (
        <Box sx={style.container}>
            <PageHeading heading="My Wish List" />
            <UserDashboardSidebar />
            <Grid container gap={3} sx={style.itemsContainer}>
                {status ? (
                    wishlistProductsList.length ? (
                        wishlistProductsList.map((product) => {
                            return (
                                <Grid item key={product._id}>
                                    <ProductCard
                                        fromCarousel={false}
                                        product={product}
                                        isInWishlist={true}
                                    />
                                </Grid>
                            );
                        })
                    ) : (
                        <Box sx={style.emptyContainer}>
                            <Typography variant="h5">
                                Your wishlist is empty
                            </Typography>
                            <Box sx={style.imageContainer}>
                                <Image
                                    src="/images/empty-box.jpg"
                                    alt="emptyBox"
                                    layout="fill"
                                    placeholder="blur"
                                    blurDataURL="/images/empty-box.jpg"
                                />
                            </Box>
                        </Box>
                    )
                ) : wishlistProducts.length ? (
                    wishlistProducts.map((product) => {
                        return (
                            <Grid item key={product._id}>
                                <ProductCard
                                    fromCarousel={false}
                                    product={product}
                                    isInWishlist={true}
                                />
                            </Grid>
                        );
                    })
                ) : (
                    <Box sx={style.emptyContainer}>
                        <Typography variant="h5">
                            Your wishlist is empty
                        </Typography>
                        <Box sx={style.imageContainer}>
                            <Image
                                src="/images/empty-box.jpg"
                                alt="emptyBox"
                                layout="fill"
                                placeholder="blur"
                                blurDataURL="/images/empty-box.jpg"
                            />
                        </Box>
                    </Box>
                )}
            </Grid>
        </Box>
    );
};

export default Wishlist;

export const getServerSideProps = async ({ req, res }) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/wishlists/wishlist`;
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
            wishlistProducts: data.wishlistProducts,
        },
    };
};
