import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
    useTheme,
    Grid,
    Box,
    Checkbox,
    Typography,
    Rating,
    Button,
} from "@mui/material";
import handleAddToCart from "utils/handleAddToCart";
import handleAddToWishList from "utils/handleAddToWishList";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Currency from "react-currency-formatter";

const style = {
    container: {
        backgroundColor: "bg.secondary",
        color: "text.primary",
        borderRadius: "8px",
        padding: "40px 1.25rem",
        width: "100%",
        position: "relative",
    },
    imageContainer: {
        height: "180px",
        width: "180px",
        position: "relative",
    },
    discountPer: {
        position: "absolute",
        top: "15px",
        left: "15px",
        height: "24px",
        borderRadius: "16px",
        backgroundColor: "bg.azureBlue",
        color: "text.white",
        padding: "0px 7px",
        fontSize: "10px",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    wishListBtn: {
        color: "text.light",
        position: "absolute",
        top: "15px",
        right: "15px",
        "&.Mui-checked": {
            color: "pink.dark",
        },
    },
    productTitle: {
        fontSize: "16px",
        fontWeight: 600,
        color: "text.secondary",
        marginBottom: "8px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        lineHeight: 1.5,
    },
    originalPrice: {
        fontSize: "14px",
        fontWeight: 600,
        color: "text.light",
        textDecoration: "line-through",
        paddingTop: "2px",
    },
    discountedPrice: {
        fontSize: "16px",
        fontWeight: 600,
        color: "bg.azureBlue",
    },
    cartBtns: {
        display: "flex",
        alignItems: "center",
    },
    addedItemsCount: {
        fontSize: "14px",
        fontWeight: 600,
        color: "text.primary",
        padding: "0px 13px",
    },
};
const LandscapeProductCard = ({ product }) => {
    const [count, setCount] = useState(0);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isWishlistChecked, setIsWishlistChecked] = useState(false);
    const [isWishlistCheckDisabled, setIsWishlistCheckDisabled] =
        useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();

    const memoizedAverageRating = useMemo(() => {
        return (
            product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length
        );
    }, []);

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

    const handleWishlistBtnClick = (e) => {
        e.preventDefault();
        handleAddToWishList(
            e.target.checked,
            product._id,
            setIsWishlistChecked,
            setIsWishlistCheckDisabled,
            dispatch
        );
    };
    return (
        <Link href={`/product/${product._id}`}>
            <a>
                <Grid
                    container
                    gap="20px"
                    alignItems="center"
                    sx={style.container}
                    style={{ boxShadow: theme.palette.boxShadow.card }}
                >
                    <Grid item sx={style.imageContainer}>
                        <Image
                            src={product.images[0].imageUrl}
                            alt="productImage"
                            layout="fill"
                            placeholder="blur"
                            blurDataURL={product.images[0].imageUrl}
                        />
                    </Grid>
                    <Grid item sx={{ width: "calc(100% - 200px)" }}>
                        <Typography variant="h3" sx={style.productTitle}>
                            {product.name}
                        </Typography>
                        <Rating
                            value={
                                product.reviews.length
                                    ? memoizedAverageRating
                                    : null
                            }
                            precision={0.5}
                            readOnly
                        />

                        <Grid container gap="8px" mt="4px" mb="16px">
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={style.discountedPrice}
                                >
                                    {product.isOnSale ? (
                                        <Currency
                                            quantity={product.salePrice}
                                            currency="usd"
                                        />
                                    ) : (
                                        <Currency
                                            quantity={product.regularPrice}
                                            currency="usd"
                                        />
                                    )}
                                </Typography>
                            </Grid>
                            {product.isOnSale && (
                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        sx={style.originalPrice}
                                    >
                                        <Currency
                                            quantity={product.regularPrice}
                                            currency="usd"
                                        />
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>

                        {count > 0 ? (
                            <Box sx={style.cartBtns}>
                                <Button
                                    disabled={isBtnDisabled}
                                    variant="outlined"
                                    style={{ minWidth: "30px", padding: "5px" }}
                                    onClick={(e) =>
                                        handleCartBtnClick(e, "inc")
                                    }
                                >
                                    <AddIcon sx={{ fontSize: "20px" }} />
                                </Button>

                                <Typography
                                    variant="body1"
                                    sx={style.addedItemsCount}
                                >
                                    {count}
                                </Typography>

                                <Button
                                    disabled={isBtnDisabled}
                                    variant="outlined"
                                    style={{ minWidth: "30px", padding: "5px" }}
                                    onClick={(e) =>
                                        handleCartBtnClick(e, "dec")
                                    }
                                >
                                    <RemoveIcon sx={{ fontSize: "20px" }} />
                                </Button>
                            </Box>
                        ) : (
                            <Button
                                disabled={isBtnDisabled}
                                variant="contained"
                                sx={{
                                    ...theme.containedBtn,
                                    ...theme.btnPx16y4,
                                }}
                                onClick={(e) => handleCartBtnClick(e, "inc")}
                            >
                                add to cart
                            </Button>
                        )}
                    </Grid>

                    <Checkbox
                        size="small"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        sx={style.wishListBtn}
                        checked={isWishlistChecked}
                        onClick={handleWishlistBtnClick}
                        disabled={isWishlistCheckDisabled}
                    />
                    {product.isOnSale && (
                        <Box sx={style.discountPer}>
                            {Math.trunc(
                                (100 *
                                    (product.regularPrice -
                                        product.salePrice)) /
                                    product.regularPrice
                            )}
                            % off
                        </Box>
                    )}
                </Grid>
            </a>
        </Link>
    );
};

export default LandscapeProductCard;
