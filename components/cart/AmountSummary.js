import { useEffect, useState, useRef, useMemo } from "react";
import { useTheme, Grid, Box, Typography, Divider } from "@mui/material";
import ApplyVoucher from "components/cart/ApplyVoucher";
import Currency from "react-currency-formatter";

const style = {
    amountSection: {
        backgroundColor: "bg.secondary",
        color: "text.primary",
        padding: "24px",
        borderRadius: "8px",
    },
};
const AmountSummary = ({
    fromDetails,
    cartItems,
    voucher,
    setTotalAmount,
    setDiscountValue,
}) => {
    const [discountPercentage, setDiscountPercentage] = useState(
        voucher.percentage
    );
    const shippingPrice = useRef(5);
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
    }, []);
    const [discountAmount, setDiscountAmount] = useState(() => {
        const discount =
            discountPercentage === 0
                ? 0
                : memoizedSubTotal * (discountPercentage / 100);
        if (setDiscountValue) {
            setDiscountValue(discount);
        }
        return discount;
    });
    const [total, setTotal] = useState(() => {
        const total = memoizedSubTotal + shippingPrice.current - discountAmount;
        if (setTotalAmount) {
            setTotalAmount(total);
        }
        return total;
    });

    useEffect(() => {
        if (discountPercentage === voucher.percentage) return;

        const newDiscountAmount =
            discountPercentage === 0
                ? 0
                : memoizedSubTotal * (discountPercentage / 100);
        const newTotal =
            memoizedSubTotal + shippingPrice.current - newDiscountAmount;
        setDiscountAmount(newDiscountAmount);
        setTotal(newTotal);
    }, [discountPercentage]);

    return (
        <Box
            sx={style.amountSection}
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
                        sx={{ fontSize: "14px", color: "text.light" }}
                    >
                        Subtotal:
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="h3"
                        sx={{ fontSize: "18px", fontWeight: 600 }}
                    >
                        <Currency quantity={memoizedSubTotal} currency="usd" />
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                mb="16px"
            >
                <Grid item>
                    <Typography
                        variant="body1"
                        sx={{ fontSize: "14px", color: "text.light" }}
                    >
                        Shipping:
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="h3"
                        sx={{ fontSize: "18px", fontWeight: 600 }}
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
                mb="16px"
            >
                <Grid item>
                    <Typography
                        variant="body1"
                        sx={{ fontSize: "14px", color: "text.light" }}
                    >
                        Discount:
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="h3"
                        sx={{ fontSize: "18px", fontWeight: 600 }}
                    >
                        {discountAmount === 0 ? (
                            "-"
                        ) : (
                            <Currency
                                quantity={discountAmount}
                                currency="usd"
                            />
                        )}
                    </Typography>
                </Grid>
            </Grid>

            <Divider light sx={{ marginBottom: "16px" }} />

            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                style={fromDetails ? { marginBottom: "16px" } : null}
            >
                <Grid item></Grid>
                <Grid item>
                    <Typography
                        variant="h3"
                        sx={{ fontSize: "22px", fontWeight: 600 }}
                    >
                        <Currency quantity={total} currency="usd" />
                    </Typography>
                </Grid>
            </Grid>

            {fromDetails && (
                <ApplyVoucher
                    voucher={voucher}
                    setDiscountPercentage={setDiscountPercentage}
                    purchaseAmount={memoizedSubTotal}
                />
            )}
        </Box>
    );
};

export default AmountSummary;
