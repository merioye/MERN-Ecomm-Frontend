import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { updateCart } from "redux/cartSlice";
import {
    useTheme,
    Grid,
    Box,
    Typography,
    IconButton,
    Button,
} from "@mui/material";
import handleAddToCart from "utils/handleAddToCart";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Currency from "react-currency-formatter";

const style = {
    container: {
        backgroundColor: "bg.secondary",
        color: "text.primary",
        borderRadius: "10px",
        padding: "16px",
    },
    imageContainer: {
        height: "120px",
        width: "120px",
        position: "relative",
    },
    title: {
        fontSize: "18px",
        fontWeight: 600,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    remProdBtn: {
        position: "absolute",
        top: "5px",
        right: "-20px",
    },
    body: {
        fontSize: "14px",
        fontWeight: 400,
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
const CartPageProduct = ({ item }) => {
    const [count, setCount] = useState(item.quantity);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleCartBtnClick = (e, type) => {
        e.preventDefault();
        handleAddToCart(
            type,
            item.product,
            count,
            setCount,
            dispatch,
            setIsBtnDisabled
        );
    };

    return (
        <Grid item xs={12}>
            <Grid
                container
                gap={1}
                sx={style.container}
                style={{ boxShadow: theme.palette.boxShadow.nav }}
            >
                <Grid item sx={style.imageContainer}>
                    <Image
                        src={item.product.images[0].imageUrl}
                        alt="productImage"
                        layout="fill"
                        placeholder="blur"
                        blurDataURL={item.product.images[0].imageUrl}
                    />
                </Grid>
                <Grid
                    item
                    sx={{ width: "calc(100% - 150px)", position: "relative" }}
                >
                    <Typography
                        variant="h2"
                        sx={style.title}
                        style={{
                            width: "calc(100% - 30px)",
                            margin: "10px 0px",
                        }}
                    >
                        {item.product.name}
                    </Typography>
                    <IconButton
                        disabled={isBtnDisabled}
                        sx={style.remProdBtn}
                        onClick={() => {
                            setIsBtnDisabled(true);
                            dispatch(
                                updateCart(
                                    null,
                                    null,
                                    item.product,
                                    "remove",
                                    setIsBtnDisabled
                                )
                            );
                        }}
                    >
                        <CloseIcon
                            sx={{
                                color: "text.secondaryLight",
                                fontSize: "20px",
                            }}
                        />
                    </IconButton>

                    <Grid container mb="16px">
                        <Grid item>
                            <Typography
                                variant="body1"
                                sx={{ ...style.body, color: "text.light" }}
                            >
                                {item.product.isOnSale ? (
                                    <Currency
                                        quantity={item.product.salePrice}
                                        currency="usd"
                                    />
                                ) : (
                                    <Currency
                                        quantity={item.product.regularPrice}
                                        currency="usd"
                                    />
                                )}{" "}
                                x {count}&nbsp;&nbsp;
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body1"
                                sx={{
                                    ...style.body,
                                    color: "bg.azureBlue",
                                    fontWeight: 600,
                                }}
                            >
                                {item.product.isOnSale ? (
                                    <Currency
                                        quantity={
                                            item.product.salePrice * count
                                        }
                                        currency="usd"
                                    />
                                ) : (
                                    <Currency
                                        quantity={
                                            item.product.regularPrice * count
                                        }
                                        currency="usd"
                                    />
                                )}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box sx={style.cartBtns}>
                        <Button
                            variant="outlined"
                            style={{ minWidth: "30px", padding: "5px" }}
                            onClick={(e) => handleCartBtnClick(e, "dec")}
                            disabled={count === 1 || isBtnDisabled}
                        >
                            <RemoveIcon sx={{ fontSize: "20px" }} />
                        </Button>

                        <Typography variant="body1" sx={style.addedItemsCount}>
                            {item.quantity}
                        </Typography>

                        <Button
                            disabled={isBtnDisabled}
                            variant="outlined"
                            style={{ minWidth: "30px", padding: "5px" }}
                            onClick={(e) => handleCartBtnClick(e, "inc")}
                        >
                            <AddIcon sx={{ fontSize: "20px" }} />
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CartPageProduct;
