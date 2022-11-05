import { useMemo } from "react";
import { useTheme, Box, Grid, Typography, Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Currency from "react-currency-formatter";

const style = {
    container: {
        padding: "16px",
        backgroundColor: "bg.secondary",
        color: "text.primary",
        borderRadius: "8px",
        margin: "2px 10px",
        cursor: "pointer",
    },
    imageContainer: {
        margin: "auto",
        height: "150px",
        width: "150px",
        marginBottom: "15px",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        transitionProperty: "all",
        transitionDuration: "0.5s",
        "&:hover": {
            filter: "brightness(70%)",
        },
    },
    heading: {
        fontSize: "14px",
        fontWeight: 600,
        color: "text.primary",
        marginBottom: "4px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        lineHeight: 1.5,
    },
    reviewCount: {
        fontSize: "12px",
        fontWeight: 600,
        color: "text.primary",
        paddingLeft: "4px",
    },
    price: {
        fontSize: "14px",
        fontWeight: 600,
        color: "bg.azureBlue",
    },
};
const SmallProductCard = ({ heading, product }) => {
    const theme = useTheme();

    const memoizedAverageRating = useMemo(() => {
        return (
            product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length
        );
    }, []);

    return (
        <Link href={`/product/${product._id}`} passHref>
            <a>
                <Box
                    sx={style.container}
                    style={{ boxShadow: theme.palette.boxShadow.card }}
                >
                    <Box sx={style.imageContainer}>
                        <Image
                            src={product.images[0].imageUrl}
                            alt="productImage"
                            layout="fill"
                            placeholder="blur"
                            blurDataURL={product.images[0].imageUrl}
                        />
                    </Box>
                    {heading === "rating" ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Rating
                                        value={
                                            product.reviews.length
                                                ? memoizedAverageRating
                                                : null
                                        }
                                        size="small"
                                        precision={0.5}
                                        readOnly
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        sx={style.reviewCount}
                                    >
                                        ({product.reviews.length})
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography
                                variant="h4"
                                sx={style.heading}
                                style={{ width: "150px" }}
                            >
                                {product.name}
                            </Typography>
                            <Typography variant="h4" sx={style.price}>
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
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h4" sx={style.heading}>
                                {product.name}
                            </Typography>
                            <Typography variant="h4" sx={style.price}>
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
                        </>
                    )}
                </Box>
            </a>
        </Link>
    );
};

export default SmallProductCard;
