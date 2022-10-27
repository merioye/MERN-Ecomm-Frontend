import { useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import {
    useTheme,
    Box,
    FormControl,
    Grid,
    RadioGroup,
    Radio,
    FormControlLabel,
    Divider,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { showErrorAlert } from "redux/alertSlice";
import { placeOrder } from "redux/orderSlice";
import { useRouter } from "next/router";
import Steps from "components/cart/Steps";
import AmountSummary from "components/cart/AmountSummary";
import ssrRequest from "utils/ssrRequest";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const style = {
    container: {
        backgroundColor: "bg.primary",
        padding: "40px",
        width: "100%",
    },
    itemsContainer: {
        width: "1200px",
        margin: "auto",
    },
    paymentContainer: {
        padding: "24px 28px",
        backgroundColor: "bg.secondary",
        color: "text.primary",
        borderRadius: "8px",
        marginBottom: "32px",
    },
};
const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
        base: {
            iconColor: "rgb(240, 57, 122)",
            color: "rgb(240, 57, 122)",
            fontSize: "16px",
            fontFamily: '"Open Sans", sans-serif',
            fontSmoothing: "antialiased",
            "::placeholder": {
                color: "#CFD7DF",
            },
        },
        invalid: {
            color: "#303238",
            ":focus": {
                color: "#303238",
            },
        },
    },
};

const PaymentForm = ({ totalAmount, discountAmount, cartItems }) => {
    const { note } = useSelector((state) => state.cart);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [showLoader, setShowLoader] = useState(false);
    const dispatch = useDispatch();
    const elements = useElements();
    const stripe = useStripe();
    const router = useRouter();
    const theme = useTheme();

    const makeOrder = async (e) => {
        e.preventDefault();

        const data = {
            paymentMethod,
            items: cartItems,
            discountAmount,
            amountToCharge: totalAmount,
            note,
        };

        if (paymentMethod === "card") {
            if (!stripe || !elements) {
                dispatch(
                    showErrorAlert(
                        "Oops! something went wrong, please try again"
                    )
                );
                return;
            }

            // generating stripe token from stripe api
            const card = elements.getElement(CardElement);
            const result = await stripe.createToken(card);
            if (result.error) {
                dispatch(showErrorAlert(result.error.message));
            } else {
                data.stripeToken = result.token;
            }
        }

        setShowLoader(true);
        dispatch(placeOrder(data, setShowLoader, router));
    };

    return (
        <FormControl fullWidth>
            <form onSubmit={makeOrder}>
                <Grid container sx={{ width: "100%" }}>
                    <Grid item xs={12}>
                        <Box
                            sx={style.paymentContainer}
                            style={{
                                boxShadow: theme.palette.boxShadow.card,
                            }}
                        >
                            <RadioGroup
                                value={paymentMethod}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            >
                                <FormControlLabel
                                    value="card"
                                    control={<Radio size="small" />}
                                    label={
                                        <Typography
                                            sx={{
                                                ...theme.userInput,
                                                fontWeight: 600,
                                            }}
                                        >
                                            Pay with credit card
                                        </Typography>
                                    }
                                />

                                {paymentMethod === "card" && (
                                    <Box sx={{ width: "323px" }}>
                                        <CardElement
                                            options={CARD_ELEMENT_OPTIONS}
                                        />
                                    </Box>
                                )}

                                <Divider light sx={{ margin: "26px 0px" }} />

                                <FormControlLabel
                                    value="cash"
                                    control={<Radio size="small" />}
                                    label={
                                        <Typography
                                            sx={{
                                                ...theme.userInput,
                                                fontWeight: 600,
                                            }}
                                        >
                                            Cash On Delivery
                                        </Typography>
                                    }
                                />
                            </RadioGroup>
                        </Box>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                        <Grid container justifyContent="space-between">
                            <Grid item xs={5.5}>
                                <Link href="/checkout">
                                    <a>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                ...theme.outlinedBtn,
                                                ...theme.btnPy5,
                                            }}
                                        >
                                            back to checkout details
                                        </Button>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={5.5}>
                                <Button
                                    variant="contained"
                                    disabled={showLoader}
                                    type="submit"
                                    sx={{
                                        ...theme.containedBtn,
                                        ...theme.btnPy5,
                                    }}
                                >
                                    {showLoader ? (
                                        <CircularProgress
                                            size={25}
                                            sx={{
                                                color: theme.palette.pink.dark,
                                            }}
                                        />
                                    ) : paymentMethod === "card" ? (
                                        <>
                                            pay{" "}
                                            {totalAmount
                                                ? `$${totalAmount}.00`
                                                : ""}
                                        </>
                                    ) : (
                                        <>place order</>
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </FormControl>
    );
};
const PaymentPage = ({ cartItems, voucher }) => {
    const [discountAmount, setDiscountAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState("");

    return (
        <Box sx={style.container}>
            <Steps />
            <Grid container gap={3} sx={style.itemsContainer}>
                <Grid item xs={8}>
                    <Elements stripe={stripePromise}>
                        <PaymentForm
                            totalAmount={totalAmount}
                            discountAmount={discountAmount}
                            cartItems={cartItems}
                        />
                    </Elements>
                </Grid>
                <Grid item xs={3.75}>
                    <AmountSummary
                        fromDetails={false}
                        cartItems={cartItems}
                        voucher={voucher}
                        setTotalAmount={setTotalAmount}
                        setDiscountValue={setDiscountAmount}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PaymentPage;

export const getServerSideProps = async ({ req, res }) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/payment`;
    const [error, data] = await ssrRequest(req, res, url);

    if (!data) {
        return {
            redirect: {
                statusCode: 307,
                destination: "/",
            },
        };
    }
    if (data.error) {
        return {
            redirect: {
                statusCode: 307,
                destination: "/checkout",
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
