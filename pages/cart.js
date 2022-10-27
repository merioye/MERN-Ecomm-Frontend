import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setNoteValue, setVoucher } from "redux/cartSlice";
import {
    useTheme,
    Box,
    Grid,
    Typography,
    Divider,
    Button,
    TextField,
} from "@mui/material";
import Steps from "components/cart/Steps";
import CartPageProduct from "components/cart/CartPageProduct";
import ApplyVoucher from "components/cart/ApplyVoucher";
import ssrRequest from "utils/ssrRequest";
import Currency from "react-currency-formatter";

const style = {
    container: {
        backgroundColor: "bg.primary",
        padding: "40px",
        width: "100%",
    },
    itemsConainer: {
        width: "1200px",
        margin: "auto",
    },
    checkoutSection: {
        backgroundColor: "bg.secondary",
        color: "text.primary",
        padding: "24px",
        borderRadius: "8px",
    },
    note: {
        fontSize: "12px",
        padding: "6px 10px",
        borderRadius: "3px",
        backgroundColor: "#c3ddfd",
        color: "bg.royalBlue",
    },
    emptyCartImageContainer: {
        position: "relative",
        height: "300px",
        width: "400px",
    },
};

const CartData = ({ cartItems, voucher, note }) => {
    const [discountPercentage, setDiscountPercentage] = useState(
        voucher.percentage
    );
    const dispatch = useDispatch();
    const theme = useTheme();

    const memoizedSubTotal = useMemo(() => {
        return cartItems.reduce(
            (acc, item) =>
                acc +
                (item.product.isOnSale
                    ? item.product.salePrice
                    : item.product.regularPrice) *
                    item.quantity,
            0
        );
    }, [JSON.stringify(cartItems)]);

    const [discountAmount, setDiscountAmount] = useState(() => {
        return discountPercentage === 0
            ? 0
            : memoizedSubTotal * (discountPercentage / 100);
    });
    const [total, setTotal] = useState(() => {
        return memoizedSubTotal - discountAmount;
    });

    useEffect(() => {
        const newDiscountAmount =
            discountPercentage === 0
                ? 0
                : memoizedSubTotal * (discountPercentage / 100);
        const newTotal = memoizedSubTotal - newDiscountAmount;
        setDiscountPercentage(voucher.percentage);
        setDiscountAmount(newDiscountAmount);
        setTotal(newTotal);
    }, [JSON.stringify(cartItems), discountPercentage]);

    return (
        <>
            <Steps />
            <Grid container gap={3} sx={style.itemsConainer}>
                <Grid item xs={8}>
                    <Grid container flexDirection="column" gap={1.5}>
                        {cartItems.map((item) => {
                            return (
                                <CartPageProduct
                                    key={item.product._id}
                                    item={item}
                                />
                            );
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={3.75}>
                    <Box
                        sx={style.checkoutSection}
                        style={{ boxShadow: theme.palette.boxShadow.card }}
                    >
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            mb="16px"
                        >
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: "14px",
                                        color: "text.light",
                                    }}
                                >
                                    Total:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="h3"
                                    sx={{ fontSize: "18px", fontWeight: 600 }}
                                >
                                    <Currency quantity={total} currency="usd" />
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider light sx={{ marginBottom: "16px" }} />

                        <Grid container alignItems="center" gap={1} mb="16px">
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: "14px", fontWeight: 600 }}
                                >
                                    Additional Comments
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h3" sx={style.note}>
                                    Note
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box mb="16px">
                            <TextField
                                type="text"
                                size="small"
                                sx={{ width: "100%" }}
                                variant="outlined"
                                autoComplete="off"
                                InputProps={{
                                    style: {
                                        ...theme.userInput,
                                        height: "150px",
                                        alignItems: "flex-start",
                                    },
                                }}
                                value={note}
                                onChange={(e) =>
                                    dispatch(setNoteValue(e.target.value))
                                }
                                multiline={true}
                                maxRows={6}
                            />
                        </Box>

                        <Divider light sx={{ marginBottom: "16px" }} />

                        <ApplyVoucher
                            voucher={voucher}
                            setDiscountPercentage={setDiscountPercentage}
                            purchaseAmount={memoizedSubTotal}
                        />

                        <Link href="/checkout">
                            <a>
                                <Button
                                    variant="contained"
                                    sx={{
                                        ...theme.containedBtn,
                                        ...theme.btnPy5,
                                    }}
                                    style={{ marginTop: "16px" }}
                                >
                                    checkout now
                                </Button>
                            </a>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};
const CartPage = ({ cartItems, voucher }) => {
    const {
        isCartItemsFetched,
        cartItems: items,
        note,
        voucher: cartVoucher,
    } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setVoucher(voucher));
    }, []);

    return (
        <Box sx={style.container}>
            {cartItems.length &&
            (isCartItemsFetched ? Boolean(items.length) : true) ? (
                isCartItemsFetched ? (
                    <CartData
                        cartItems={items}
                        voucher={cartVoucher ? cartVoucher : voucher}
                        note={note}
                    />
                ) : (
                    <CartData
                        cartItems={cartItems}
                        voucher={cartVoucher ? cartVoucher : voucher}
                        note={note}
                    />
                )
            ) : (
                <Grid
                    container
                    flexDirection="column"
                    alignItems="center"
                    gap={3}
                    sx={style.itemsConainer}
                >
                    <Grid item>
                        <Box sx={style.emptyCartImageContainer}>
                            <Image
                                src="/images/empty-cart.png"
                                alt="emptyCartImage"
                                layout="fill"
                                placeholder="blur"
                                blurDataURL="/images/empty-cart.png"
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: "20px",
                                color: "text.primary",
                                fontWeight: 600,
                            }}
                        >
                            Your Cart is empty
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default CartPage;

export const getServerSideProps = async ({ req, res }) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/carts/cart`;
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
            cartItems: data.cart.products,
            voucher: {
                code: data.cart.couponCode,
                percentage: data.cart.couponDiscountPercentage,
            },
        },
    };
};
