import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
    useTheme,
    Box,
    Grid,
    Typography,
    Rating,
    Button,
    Tabs,
    Tab,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import ProductCard from "components/shared/ProductCard";
import InputBox from "components/shared/InputBox";
import ssrRequest from "utils/ssrRequest";
import handleAddToCart from "utils/handleAddToCart";
import handleAddToWishList from "utils/handleAddToWishList";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const style = {
    container: {
        backgroundColor: "bg.primary",
        padding: "50px 0px",
    },
    itemsContainer: {
        width: "1200px",
        margin: "auto",
    },
    largeImageContainer: {
        marginBottom: "48px",
        height: "280px",
        width: "280px",
        position: "relative",
    },
    smallImageContainer: {
        height: "64px",
        width: "64px",
        backgroundColor: "bg.secondary",
        cursor: "pointer",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: "1px",
        borderStyle: "solid",
    },
    productTitle: {
        fontSize: "30px",
        fontWeight: 700,
        color: "text.primary",
        marginBottom: "16px",
        marginLeft: "-3px",
    },
    shortInfo: {
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
    },
    details: {
        fontSize: "14px",
        color: "text.primary",
        fontWeight: 400,
    },
    price: {
        fontSize: "25px",
        fontWeight: 700,
        marginBottom: "4px",
        color: "bg.azureBlue",
    },
    cartBtns: {
        display: "flex",
        alignItems: "center",
    },
    addedItemsCount: {
        fontSize: "20px",
        fontWeight: 600,
        color: "text.primary",
        padding: "0px 20px",
    },
    tabsContainer: {
        width: "1200px",
        margin: "auto",
        marginTop: "80px",
        marginBottom: "24px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
    },
    reviewContainer: {
        maxWidth: "600px",
        marginBottom: "32px",
    },
    reviewAvatar: {
        height: "48px",
        width: "48px",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
    },
    reviewerName: {
        fontSize: "16px",
        color: "text.primary",
        fontWeight: 600,
        marginBottom: "4px",
    },
    wishListBtn: {
        color: "text.light",
        "&.Mui-checked": {
            color: "pink.dark",
        },
    },
};

const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
};
function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const SingleProduct = ({ product, relatedProducts }) => {
    const [largeImageSrc, setLargeImageSrc] = useState(
        product.images[0].imageUrl
    );
    const [count, setCount] = useState(0);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isWishlistChecked, setIsWishlistChecked] = useState(false);
    const [isWishlistCheckDisabled, setIsWishlistCheckDisabled] =
        useState(false);
    const [values, setValues] = useState({ review: "" });
    const [userRating, setUserRating] = useState(0);
    const [hover, setHover] = useState(-1);
    const [tab, setTab] = useState(0);
    const dispatch = useDispatch();
    const theme = useTheme();

    const memoizedAverageRating = useMemo(() => {
        return (
            product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length
        );
    }, []);

    useEffect(() => {
        setLargeImageSrc(product.images[0].imageUrl);
    }, [product]);

    const a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            "aria-controls": `full-width-tabpanel-${index}`,
        };
    };

    const handleCartBtnClick = (e, type) => {
        e.preventDefault();
        handleAddToCart(
            type,
            product,
            count,
            setCount,
            dispatch,
            setIsBtnDisabled
        );
    };

    return (
        <Box sx={style.container}>
            <Grid container gap={2} sx={style.itemsContainer}>
                <Grid item xs={6}>
                    <Grid container flexDirection="column" alignItems="center">
                        <Grid item sx={style.largeImageContainer}>
                            <Image
                                src={largeImageSrc}
                                alt="productImage"
                                layout="fill"
                                placeholder="blur"
                                blurDataURL={largeImageSrc}
                            />
                        </Grid>
                        <Grid item>
                            <Grid container gap={1}>
                                {product.images.map((image) => {
                                    return (
                                        <Grid
                                            item
                                            key={image.cloudinaryId}
                                            sx={style.smallImageContainer}
                                            style={
                                                largeImageSrc === image.imageUrl
                                                    ? {
                                                          borderColor:
                                                              theme.palette.bg
                                                                  .azureBlue,
                                                      }
                                                    : {
                                                          borderColor:
                                                              theme.palette.text
                                                                  .fadedSilver,
                                                      }
                                            }
                                            onClick={() =>
                                                setLargeImageSrc(image.imageUrl)
                                            }
                                        >
                                            <Image
                                                src={image.imageUrl}
                                                alt="productImage"
                                                height="40px"
                                                width="40px"
                                                placeholder="blur"
                                                blurDataURL={image.imageUrl}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h1" sx={style.productTitle}>
                        {product.name}
                    </Typography>
                    <Box sx={style.shortInfo}>
                        <Typography variant="body1" sx={style.details}>
                            Brand :
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={style.details}
                            style={{ marginLeft: "8px", fontWeight: 600 }}
                        >
                            {product.brand}
                        </Typography>
                    </Box>
                    <Box sx={style.shortInfo}>
                        <Typography variant="body1" sx={style.details}>
                            Rated :
                        </Typography>
                        <Box
                            sx={style.shortInfo}
                            style={{ marginBottom: "0px", marginLeft: "8px" }}
                        >
                            <Rating
                                size="small"
                                value={
                                    product.reviews.length
                                        ? memoizedAverageRating
                                        : null
                                }
                                readOnly
                            />
                            <Typography
                                variant="body1"
                                sx={style.details}
                                style={{ marginLeft: "8px", fontWeight: 600 }}
                            >
                                ({product.reviews.length})
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="h2" sx={style.price}>
                        $
                        {product.isOnSale
                            ? product.salePrice
                            : product.regularPrice}
                        .00
                    </Typography>
                    <Typography
                        variant="body1"
                        mb="10px"
                        sx={style.details}
                        style={
                            product.stock
                                ? { color: theme.palette.text.green }
                                : { color: theme.palette.pink.dark }
                        }
                    >
                        {product.stock ? "Stock Available" : "Out Of Stock"}
                    </Typography>
                    <FormControlLabel
                        sx={{ ...style.details }}
                        control={
                            <Checkbox
                                size="medium"
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                sx={style.wishListBtn}
                            />
                        }
                        label="Add to wishlist"
                        checked={isWishlistChecked}
                        onChange={(e) =>
                            handleAddToWishList(
                                e.target.checked,
                                product._id,
                                setIsWishlistChecked,
                                setIsWishlistCheckDisabled,
                                dispatch
                            )
                        }
                        disabled={isWishlistCheckDisabled}
                    />
                    <Box sx={style.cartBtns} mt="15px">
                        <Button
                            disabled={isBtnDisabled}
                            variant="outlined"
                            style={{ minWidth: "30px", padding: "7px" }}
                            onClick={(e) => handleCartBtnClick(e, "inc")}
                        >
                            <AddIcon sx={{ fontSize: "20px" }} />
                        </Button>
                        {count > 0 && (
                            <>
                                <Typography
                                    variant="body1"
                                    sx={style.addedItemsCount}
                                >
                                    {count}
                                </Typography>
                                <Button
                                    disabled={isBtnDisabled}
                                    variant="outlined"
                                    style={{ minWidth: "30px", padding: "7px" }}
                                    onClick={(e) =>
                                        handleCartBtnClick(e, "dec")
                                    }
                                >
                                    <RemoveIcon sx={{ fontSize: "20px" }} />
                                </Button>
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>

            <Box
                sx={style.tabsContainer}
                style={{ borderColor: theme.palette.text.fadedSilver }}
            >
                <Tabs
                    value={tab}
                    onChange={(e, newVal) => setTab(newVal)}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="full width tabs example"
                >
                    <Tab
                        label="Description"
                        {...a11yProps(0)}
                        sx={{
                            fontSize: "14px",
                            textTransform: "capitalize",
                            fontWeight: 600,
                        }}
                    />
                    <Tab
                        label={`Reviews (${product.reviews.length})`}
                        {...a11yProps(1)}
                        sx={{
                            fontSize: "14px",
                            textTransform: "capitalize",
                            fontWeight: 600,
                        }}
                    />
                </Tabs>
            </Box>

            {tab === 0 && (
                <Box sx={style.itemsContainer}>
                    <Typography
                        variant="h3"
                        sx={style.productTitle}
                        style={{ marginLeft: "0px", fontSize: "20px" }}
                    >
                        Specification :
                    </Typography>
                    <Typography variant="body1" sx={style.details}>
                        {product.desc}
                    </Typography>
                </Box>
            )}

            {tab === 1 && (
                <Box sx={style.itemsContainer}>
                    {product.reviews.map((review) => {
                        return (
                            <Box sx={style.reviewContainer} key={review._id}>
                                <Grid container gap="16px" mb="16px">
                                    <Grid item sx={style.reviewAvatar}>
                                        <Image
                                            src={
                                                review.reviewAuthor.avatar
                                                    ? review.reviewAuthor.avatar
                                                    : "/images/man.svg"
                                            }
                                            alt="userAvatar"
                                            layout="fill"
                                            placeholder="blur"
                                            blurDataURL={
                                                review.reviewAuthor.avatar
                                                    ? review.reviewAuthor.avatar
                                                    : "/images/man.svg"
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            sx={style.reviewerName}
                                        >
                                            {review.reviewAuthor.name}
                                        </Typography>
                                        <Grid container gap={1}>
                                            <Grid item>
                                                <Rating
                                                    size="small"
                                                    value={review.rating}
                                                    readOnly
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="body1"
                                                    sx={style.details}
                                                    style={{
                                                        fontWeight: 600,
                                                        marginTop: "-2px",
                                                    }}
                                                >
                                                    {review.rating}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="body1"
                                                    sx={style.details}
                                                    style={{
                                                        marginTop: "-2px",
                                                    }}
                                                >
                                                    {new Date(
                                                        review.updatedAt
                                                    ).toLocaleDateString()}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Typography variant="body1" sx={style.details}>
                                    {review.text}
                                </Typography>
                            </Box>
                        );
                    })}

                    <Typography
                        variant="h3"
                        sx={style.productTitle}
                        style={{
                            marginLeft: "0px",
                            fontSize: "25px",
                            fontWeight: 600,
                            marginBottom: "30px",
                            marginTop: product.reviews.length ? "56px" : "0px",
                        }}
                    >
                        Write a Review for this product
                    </Typography>

                    <Typography variant="body1" sx={style.reviewerName}>
                        Your Rating <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <Box
                        sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Rating
                            value={userRating}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setUserRating(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={
                                <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                />
                            }
                        />
                        {userRating !== null && (
                            <Box sx={{ ml: 2 }}>
                                {labels[hover !== -1 ? hover : userRating]}
                            </Box>
                        )}
                    </Box>

                    <Typography
                        variant="body1"
                        sx={style.reviewerName}
                        style={{ marginTop: "20px", marginBottom: "10px" }}
                    >
                        Your Review <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <InputBox
                        label=""
                        type="text"
                        name="review"
                        pattern="^.{1,}$"
                        errorMessage="Review is required"
                        values={values}
                        setValues={setValues}
                        fromAdmin={false}
                        multiline={true}
                        readOnly={false}
                        placeholder="Write a review here..."
                    />

                    <Button
                        variant="contained"
                        sx={theme.containedBtn}
                        style={{ marginTop: "24px" }}
                        disabled={
                            userRating && values.review.trim().length
                                ? false
                                : true
                        }
                    >
                        Submit
                    </Button>
                </Box>
            )}

            {relatedProducts.length && (
                <Box sx={style.itemsContainer} style={{ marginTop: "60px" }}>
                    <Typography
                        variant="h3"
                        sx={style.productTitle}
                        style={{ marginLeft: "0px", fontSize: "20px" }}
                    >
                        Related Products
                    </Typography>
                </Box>
            )}
            {relatedProducts.length && (
                <Grid container gap={3} sx={style.itemsContainer}>
                    {relatedProducts.map((product) => {
                        return (
                            <Grid item key={product._id}>
                                <ProductCard
                                    fromCarousel={false}
                                    product={product}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Box>
    );
};

export default SingleProduct;

export const getServerSideProps = async ({ req, res, params }) => {
    const { productId } = params;
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/products/${productId}`;
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
            product: data.product,
            relatedProducts: data.relatedProducts,
        },
    };
};
