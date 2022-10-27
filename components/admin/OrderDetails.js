import { useState, useMemo, useRef, useEffect } from "react";
import {
    useTheme,
    Box,
    Typography,
    Grid,
    MenuItem,
    Divider,
    Button,
    CircularProgress,
} from "@mui/material";
import InputBox from "components/shared/InputBox";
import SelectBox from "components/shared/SelectBox";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeOrderNotification } from "redux/alertSlice";
import { showErrorAlert } from "redux/alertSlice";
import { updateOrderStatus } from "redux/orderSlice";
import Currency from "react-currency-formatter";

const style = {
    orderDetails: {
        backgroundColor: "bg.secondary",
        borderRadius: "8px",
        width: "100%",
        padding: "24px",
        overflow: "hidden",
        color: "text.primary",
    },
    text: {
        fontSize: "14px",
        fontWeight: 400,
    },
    inputContainer: {
        width: "48%",
    },
    orderItemImage: {
        height: "64px",
        width: "64px",
        borderRadius: "8px",
        border: "1px solid #E8E8EE",
        padding: "5px",
        marginRight: "10px",
    },
    saveBtn: {
        backgroundColor: "bg.azureBlue",
        color: "text.white",
        borderRadius: "8px",
        fontWeight: 600,
        "&:hover": {
            backgroundColor: "bg.royalBlue",
        },
    },
};
const OrderDetails = ({ order }) => {
    const { _id, name, address } = order.user;
    const [values, setValues] = useState({
        name: name,
        status: order.status,
        shippingAddress: `${address.address1}, ${
            address.address2 ? address.address2 + ", " : ""
        }${address.city}, ${address.state}, ${address.country}`,
        note: order.note ? order.note : " ",
    });

    const [showLoader, setShowLoader] = useState(false);
    const shippingPrice = useRef(5);
    const dispatch = useDispatch();
    const theme = useTheme();

    const memoizedDate = useMemo(() => {
        const date = new Date(order.createdAt)
            .toDateString()
            .slice(4)
            .split(" ");
        return `${date[1]} ${date[0]}, ${date[2]}`;
    }, []);

    const memoizedSubTotal = useMemo(() => {
        return order.items.reduce(
            (acc, item) =>
                acc +
                (item.product.isOnSale
                    ? item.product.salePrice
                    : item.product.regularPrice) *
                    item.quantity,
            0
        );
    }, []);

    useEffect(() => {
        dispatch(removeOrderNotification(order._id));
    }, []);

    const handleUpdateOrderStatus = () => {
        if (order.status === values.status) {
            dispatch(
                showErrorAlert("Please make any change to order status to save")
            );
            return;
        }
        setShowLoader(true);
        dispatch(
            updateOrderStatus(
                { orderStatus: values.status },
                order._id,
                _id,
                setShowLoader
            )
        );
    };

    return (
        <Box sx={theme.adminTableMainContainer}>
            <Typography variant="h3" sx={theme.adminTableCaption}>
                Order Details
            </Typography>

            <Box
                sx={style.orderDetails}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <Grid container gap="32px">
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.light",
                                        mr: 0.5,
                                    }}
                                >
                                    Order ID:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.primary",
                                    }}
                                >
                                    {order._id}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.light",
                                        mr: 0.5,
                                    }}
                                >
                                    Placed on:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.primary",
                                    }}
                                >
                                    {memoizedDate}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    container
                    justifyContent="space-between"
                    mt="24px"
                    mb="24px"
                >
                    <Grid item sx={style.inputContainer}>
                        <InputBox
                            label="Name"
                            type="text"
                            name="name"
                            pattern="^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$"
                            errorMessage="Name must be minimum of 3 characters and should not contain number/special characters"
                            values={values}
                            setValues={setValues}
                            fromAdmin={true}
                            multiline={false}
                            readOnly={true}
                        />
                    </Grid>
                    <Grid item sx={style.inputContainer}>
                        <SelectBox
                            label="Order Status"
                            name="status"
                            errorMessage="Order Status is required"
                            values={values}
                            setValues={setValues}
                            fromAdmin={true}
                        >
                            {order.status === "pending" && (
                                <MenuItem
                                    value="pending"
                                    sx={theme.adminSelectMenuItem}
                                >
                                    Pending
                                </MenuItem>
                            )}
                            {(order.status === "pending" ||
                                order.status === "cancelled") && (
                                <MenuItem
                                    value="cancelled"
                                    sx={theme.adminSelectMenuItem}
                                >
                                    Cancelled
                                </MenuItem>
                            )}
                            {(order.status === "pending" ||
                                order.status === "processing") && (
                                <MenuItem
                                    value="processing"
                                    sx={theme.adminSelectMenuItem}
                                >
                                    Processing
                                </MenuItem>
                            )}
                            {(order.status === "pending" ||
                                order.status === "processing" ||
                                order.status === "delivered") && (
                                <MenuItem
                                    value="delivered"
                                    sx={theme.adminSelectMenuItem}
                                >
                                    Delivered
                                </MenuItem>
                            )}
                        </SelectBox>
                    </Grid>
                </Grid>

                {order.items.map((item) => {
                    return (
                        <Grid
                            container
                            alignItems="center"
                            mt="16px"
                            key={item.product._id}
                        >
                            <Grid item sx={style.orderItemImage}>
                                <Image
                                    src={item.product.images[0].imageUrl}
                                    alt="productImage"
                                    height="100%"
                                    width="100%"
                                    placeholder="blur"
                                    blurDataURL={
                                        item.product.images[0].imageUrl
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        fontWeight: 600,
                                        color: "text.primary",
                                    }}
                                >
                                    {item.product.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ ...style.text, color: "text.light" }}
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
                                    )}
                                    x {item.quantity}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                })}
            </Box>

            <Grid container spacing={2.4} mb="20px" mt="0px">
                <Grid item xs={6}>
                    <Box
                        sx={style.orderDetails}
                        style={{ boxShadow: theme.palette.boxShadow.card }}
                    >
                        <Box mb="28px">
                            <InputBox
                                label="Shipping Address"
                                type="text"
                                name="shippingAddress"
                                pattern=".{3,}$"
                                errorMessage="Shipping Address must be minimum of 3 characters"
                                values={values}
                                setValues={setValues}
                                fromAdmin={true}
                                multiline={true}
                                readOnly={true}
                            />
                        </Box>
                        <Box>
                            <InputBox
                                label="Customer's note"
                                type="text"
                                name="note"
                                pattern=".{1,}$"
                                errorMessage="Customer's note must be minimum of 3 characters"
                                values={values}
                                setValues={setValues}
                                fromAdmin={true}
                                multiline={true}
                                readOnly={true}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={style.orderDetails}
                        style={{ boxShadow: theme.palette.boxShadow.card }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                ...style.text,
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "text.primary",
                                mb: "17px",
                            }}
                        >
                            Total Summary
                        </Typography>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            mb="17px"
                        >
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{ ...style.text, color: "text.light" }}
                                >
                                    Subtotal:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.primary",
                                        fontWeight: 600,
                                    }}
                                >
                                    <Currency
                                        quantity={memoizedSubTotal}
                                        currency="usd"
                                    />
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            mb="17px"
                        >
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{ ...style.text, color: "text.light" }}
                                >
                                    Shipping fee:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.primary",
                                        fontWeight: 600,
                                    }}
                                >
                                    <Currency
                                        quantity={shippingPrice.current}
                                        currency="usd"
                                    />
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            mb="17px"
                        >
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{ ...style.text, color: "text.light" }}
                                >
                                    Discount:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.primary",
                                        fontWeight: 600,
                                    }}
                                >
                                    {order.discountAmount == 0 ? (
                                        <Currency quantity={0} currency="usd" />
                                    ) : (
                                        <Currency
                                            quantity={order.discountAmount}
                                            currency="usd"
                                        />
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider light />

                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            mb="17px"
                            mt="17px"
                        >
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.primary",
                                        fontWeight: 600,
                                    }}
                                >
                                    Total payable
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.primary",
                                        fontWeight: 600,
                                    }}
                                >
                                    <Currency
                                        quantity={order.amountToCharge}
                                        currency="usd"
                                    />
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            mb="17px"
                        >
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.primary",
                                        fontWeight: 600,
                                    }}
                                >
                                    Amount received
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.primary",
                                        fontWeight: 600,
                                    }}
                                >
                                    {order.paymentReceived ? (
                                        <Currency
                                            quantity={order.amountToCharge}
                                            currency="usd"
                                        />
                                    ) : (
                                        <Currency quantity={0} currency="usd" />
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider light />

                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            mb="17px"
                            mt="17px"
                        >
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.primary",
                                        fontWeight: 600,
                                    }}
                                >
                                    Remaining Amount
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.text,
                                        color: "text.primary",
                                        fontWeight: 600,
                                    }}
                                >
                                    {order.paymentReceived ? (
                                        <Currency quantity={0} currency="usd" />
                                    ) : (
                                        <Currency
                                            quantity={order.amountToCharge}
                                            currency="usd"
                                        />
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>

                        {order.paymentReceived && (
                            <Typography
                                variant="body1"
                                sx={{ ...style.text, color: "text.primary" }}
                            >
                                {order.paymentMethod === "card"
                                    ? "Paid by Credit/Debit Card"
                                    : "Paid by cash"}
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>

            <Button
                disabled={showLoader}
                onClick={handleUpdateOrderStatus}
                variant="contained"
                sx={theme.containedBtn}
                style={theme.btnPy10}
            >
                {showLoader ? (
                    <CircularProgress
                        size={25}
                        sx={{ color: theme.palette.pink.dark }}
                    />
                ) : (
                    "save changes"
                )}
            </Button>
        </Box>
    );
};

export default OrderDetails;
