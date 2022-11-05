import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showErrorAlert } from "redux/alertSlice";
import {
    useTheme,
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    FormControl,
} from "@mui/material";
import Steps from "components/cart/Steps";
import InputBox from "components/shared/InputBox";
import AmountSummary from "components/cart/AmountSummary";
import ssrRequest from "utils/ssrRequest";

const style = {
    container: {
        backgroundColor: "bg.primary",
        padding: "40px 0px",
        width: "100%",
    },
    itemsContainer: {
        width: { xs: "90%", lg: "1200px" },
        margin: "auto",
    },
    addressContainer: {
        padding: "24px 28px",
        backgroundColor: "bg.secondary",
        color: "text.primary",
        borderRadius: "8px",
        marginBottom: "32px",
    },
    addressTitle: {
        fontSize: "14px",
        fontWeight: 600,
        marginBottom: "16px",
    },
    amountSection: {
        backgroundColor: "bg.secondary",
        color: "text.primary",
        padding: "24px",
        borderRadius: "8px",
    },
};

const AddressDetails = ({ values, setValues }) => {
    const theme = useTheme();

    return (
        <Box
            sx={style.addressContainer}
            style={{ boxShadow: theme.palette.boxShadow.card }}
        >
            <Typography variant="body1" sx={style.addressTitle}>
                Shipping Address
            </Typography>
            <Grid container gap="16px" justifyContent="space-between" mb="16px">
                <Grid item xs={12} md={5.5}>
                    <InputBox
                        label="Full Name"
                        type="text"
                        name="name"
                        pattern=".{3,}$"
                        errorMessage="Full Name must be minimum of 3 characters"
                        values={values}
                        setValues={setValues}
                        fromAdmin={false}
                    />
                </Grid>
                <Grid item xs={12} md={5.5}>
                    <InputBox
                        label="Phone No"
                        type="number"
                        name="phone"
                        pattern=".{1,}$"
                        errorMessage="Phone Number is required"
                        values={values}
                        setValues={setValues}
                        fromAdmin={false}
                    />
                </Grid>
            </Grid>
            <Grid container gap="16px" justifyContent="space-between" mb="16px">
                <Grid item xs={12} md={5.5}>
                    <InputBox
                        label="Country"
                        type="text"
                        name="country"
                        pattern=".{1,}$"
                        errorMessage="Country is required"
                        values={values}
                        setValues={setValues}
                        fromAdmin={false}
                    />
                </Grid>
                <Grid item xs={12} md={5.5}>
                    <InputBox
                        label="State"
                        type="text"
                        name="state"
                        pattern=".{1,}$"
                        errorMessage="State required"
                        values={values}
                        setValues={setValues}
                        fromAdmin={false}
                    />
                </Grid>
            </Grid>
            <Grid container gap="16px" justifyContent="space-between" mb="16px">
                <Grid item xs={12} md={5.5}>
                    <InputBox
                        label="City"
                        type="text"
                        name="city"
                        pattern=".{1,}$"
                        errorMessage="City is required"
                        values={values}
                        setValues={setValues}
                        fromAdmin={false}
                    />
                </Grid>
                <Grid item xs={12} md={5.5}>
                    <InputBox
                        label="Zip Code"
                        type="number"
                        name="zipCode"
                        pattern=".{1,}$"
                        errorMessage="Zip code is required"
                        values={values}
                        setValues={setValues}
                        fromAdmin={false}
                    />
                </Grid>
            </Grid>
            <Grid container gap="16px" justifyContent="space-between">
                <Grid item xs={12} md={5.5}>
                    <InputBox
                        label="Address 1"
                        type="text"
                        name="address1"
                        pattern=".{3,}$"
                        errorMessage="Address 1 must be minimum of 3 characters"
                        values={values}
                        setValues={setValues}
                        fromAdmin={false}
                    />
                </Grid>
                <Grid item xs={12} md={5.5}>
                    <TextField
                        label="Address 2"
                        type="text"
                        size="small"
                        placeholder="Address 2"
                        sx={{ width: "100%" }}
                        variant="outlined"
                        autoComplete="off"
                        InputProps={{ style: theme.userInput }}
                        value={values.address2}
                        onChange={(e) =>
                            setValues({
                                ...values,
                                address2: e.target.value,
                            })
                        }
                    />
                </Grid>
            </Grid>
        </Box>
    );
};
const CheckoutPage = ({ cartItems, voucher, user }) => {
    const { name, phone, address } = user;
    const [shippingAddress, setShippingAddress] = useState({
        name: name,
        phone: phone,
        country: address?.country,
        state: address?.state,
        city: address?.city,
        zipCode: address?.zipCode,
        address1: address?.address1,
        address2: address?.address2,
    });
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();

    const proceedToPayment = (e) => {
        e.preventDefault();

        if (!phone) {
            dispatch(
                showErrorAlert(
                    "Please Add you phone No by going to profile settings page, then come back here to continue"
                )
            );
            return;
        }
        if (!user.address) {
            dispatch(
                showErrorAlert(
                    "Please Add your address in profile settings page, then come back here to continue"
                )
            );
            return;
        }
        if (
            shippingAddress.name !== name ||
            shippingAddress.phone !== phone ||
            shippingAddress.country !== address.country ||
            shippingAddress.state !== address.state ||
            shippingAddress.city !== address.city ||
            shippingAddress.zipCode !== address.zipCode ||
            shippingAddress.address1 !== address.address1 ||
            shippingAddress.address2 !== address.address2
        ) {
            dispatch(
                showErrorAlert(
                    "If you want to update your shipping address then please go your profile settings page, then come back here to continue"
                )
            );
            return;
        }
        router.push("/payment");
    };
    return (
        <Box sx={style.container}>
            <Steps />
            <Grid
                container
                justifyContent="center"
                gap={3}
                flexDirection={{ xs: "column-reverse", xm: "row" }}
                sx={style.itemsContainer}
            >
                <Grid item xs={12} xm={7} lg={8}>
                    <FormControl fullWidth>
                        <form onSubmit={proceedToPayment}>
                            <Grid container sx={{ width: "100%" }}>
                                <Grid item xs={12}>
                                    <AddressDetails
                                        title="Shipping Address"
                                        values={shippingAddress}
                                        setValues={setShippingAddress}
                                    />
                                </Grid>
                                <Grid item sx={{ width: "100%" }}>
                                    <Grid
                                        container
                                        gap={2}
                                        justifyContent="space-between"
                                    >
                                        <Grid item xs={12} md={5.5}>
                                            <Link href="/cart">
                                                <a>
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            ...theme.outlinedBtn,
                                                            ...theme.btnPy5,
                                                        }}
                                                    >
                                                        back to cart
                                                    </Button>
                                                </a>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} md={5.5}>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                sx={{
                                                    ...theme.containedBtn,
                                                    ...theme.btnPy5,
                                                }}
                                            >
                                                proceed to payment
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </FormControl>
                </Grid>
                <Grid item xs={12} xm={4} lg={3.75}>
                    <AmountSummary
                        fromDetails={true}
                        cartItems={cartItems}
                        voucher={voucher}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CheckoutPage;

export const getServerSideProps = async ({ req, res }) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/checkout`;
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
            user: data.user,
        },
    };
};
