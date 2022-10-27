import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { applyVoucher } from "redux/cartSlice";
import {
    useTheme,
    Box,
    TextField,
    Button,
    CircularProgress,
    FormControl,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const style = {
    voucherStatusIcon: {
        position: "absolute",
        right: "17px",
        top: "7px",
    },
};
const ApplyVoucher = ({ voucher, setDiscountPercentage, purchaseAmount }) => {
    const [voucherValue, setVoucherValue] = useState(
        voucher.code ? voucher.code : ""
    );
    const [voucherStatus, setVoucherStatus] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        if (!voucher.code) {
            setVoucherStatus("");
        }
        setVoucherValue(voucher.code);
    }, [JSON.stringify(voucher)]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowLoader(true);
        dispatch(
            applyVoucher(
                { voucherCode: voucherValue, purchaseAmount },
                setShowLoader,
                setVoucherStatus,
                setDiscountPercentage
            )
        );
    };

    return (
        <FormControl fullWidth>
            <form onSubmit={handleSubmit}>
                <Box mb="16px" sx={{ position: "relative" }}>
                    <TextField
                        label="Voucher"
                        type="text"
                        size="small"
                        placeholder="Voucher"
                        sx={{ width: "100%" }}
                        variant="outlined"
                        autoComplete="off"
                        InputProps={{
                            style: { ...theme.userInput, paddingRight: "30px" },
                            required: true,
                        }}
                        error={
                            voucherStatus === "invalid" &&
                            voucherValue.trim().length
                                ? true
                                : false
                        }
                        value={voucherValue}
                        onChange={(e) => setVoucherValue(e.target.value)}
                    />

                    {(voucherStatus === "valid" || voucher.percentage > 0) && (
                        <CheckCircleOutlineIcon
                            style={style.voucherStatusIcon}
                            sx={{ color: "text.green" }}
                        />
                    )}
                    {voucherStatus === "invalid" &&
                    voucherValue.trim().length ? (
                        <CancelOutlinedIcon
                            style={style.voucherStatusIcon}
                            sx={{ color: "pink.dark" }}
                        />
                    ) : null}
                </Box>

                <Button
                    type="submit"
                    variant="outlined"
                    sx={{ ...theme.outlinedBtn, ...theme.btnPy5 }}
                    disabled={showLoader}
                    onClick={applyVoucher}
                >
                    {showLoader ? (
                        <CircularProgress
                            size={25}
                            sx={{ color: theme.palette.pink.dark }}
                        />
                    ) : (
                        <>Apply Voucher</>
                    )}
                </Button>
            </form>
        </FormControl>
    );
};

export default ApplyVoucher;
