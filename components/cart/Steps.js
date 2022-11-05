import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";

const style = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "90%", lg: "1200px" },
        margin: "auto",
        marginBottom: "24px",
    },
    stepBtn: {
        height: "32px",
        borderRadius: "16px",
        fontSize: "14px",
        fontWeight: 600,
        textTransform: "capitalize",
    },
    selectedStep: {
        backgroundColor: "bg.azureBlue",
        color: "text.white",
        "&:hover": {
            backgroundColor: "bg.azureBlue",
            color: "text.white",
        },
    },
    unSelectedStep: {
        backgroundColor: "#c3ddfd",
        color: "bg.royalBlue",
        "&:hover": {
            backgroundColor: "bg.azureBlue",
            color: "text.white",
        },
    },
    line: {
        width: { xs: "30px", sm: "50px" },
        height: "4px",
    },
};

const Steps = () => {
    const router = useRouter();

    return (
        <Box sx={style.container}>
            <Link href="/cart">
                <a>
                    <Button
                        style={style.stepBtn}
                        sx={
                            router.pathname === "/cart" ||
                            router.pathname === "/checkout" ||
                            router.pathname === "/payment"
                                ? style.selectedStep
                                : style.unSelectedStep
                        }
                    >
                        1. Cart
                    </Button>
                </a>
            </Link>
            <Box
                sx={
                    router.pathname === "/checkout" ||
                    router.pathname === "/payment"
                        ? { ...style.selectedStep, ...style.line }
                        : { ...style.unSelectedStep, ...style.line }
                }
            ></Box>
            <Link href="/checkout">
                <a>
                    <Button
                        style={style.stepBtn}
                        sx={
                            router.pathname === "/checkout" ||
                            router.pathname === "/payment"
                                ? style.selectedStep
                                : style.unSelectedStep
                        }
                    >
                        2. Details
                    </Button>
                </a>
            </Link>
            <Box
                sx={
                    router.pathname === "/checkout" ||
                    router.pathname === "/payment"
                        ? { ...style.selectedStep, ...style.line }
                        : { ...style.unSelectedStep, ...style.line }
                }
            ></Box>
            <Link href="/payment">
                <a>
                    <Button
                        style={style.stepBtn}
                        sx={
                            router.pathname === "/payment"
                                ? style.selectedStep
                                : style.unSelectedStep
                        }
                    >
                        3. Payment
                    </Button>
                </a>
            </Link>
        </Box>
    );
};

export default Steps;
