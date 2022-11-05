import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTheme, Box, Grid, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const style = {
    bottomNavigationContainer: {
        width: "100vw",
        position: "fixed",
        zIndex: 1201,
        bottom: "-1.5px",
        left: 0,
        right: 0,
        height: "64px",
        backgroundColor: "bg.secondary",
        display: { xm: "none", xs: "flex" },
    },
    bottomNavigationLabel: {
        fontSize: "13px",
        fontWeight: 600,
        marginTop: "-5px",
        color: "text.primary",
    },
    bottomNavigationLabelSelected: {
        fontSize: "15px",
        fontWeight: 600,
        marginTop: "-5px",
        color: "bg.azureBlue",
    },
    bottomNavigationIcon: {
        fontSize: "25px",
    },
    cartItemsCount: {
        position: "absolute",
        right: "-5px",
        top: "-7px",
        backgroundColor: "bg.azureBlue",
        color: "text.white",
        borderRadius: "50%",
        padding: "4px",
        fontSize: "12px",
        minWidth: "22px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};
const BottomNavigation = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const router = useRouter();
    const theme = useTheme();

    return (
        <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            sx={style.bottomNavigationContainer}
            style={{ boxShadow: theme.palette.boxShadow.bottomNavigation }}
        >
            <Grid item>
                <Link href="/">
                    <a>
                        <Grid
                            container
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Grid item>
                                <HomeOutlinedIcon
                                    sx={
                                        router.pathname === "/"
                                            ? { color: "bg.azureBlue" }
                                            : { color: "text.primary" }
                                    }
                                    style={style.bottomNavigationIcon}
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={
                                        router.pathname === "/"
                                            ? style.bottomNavigationLabelSelected
                                            : style.bottomNavigationLabel
                                    }
                                >
                                    Home
                                </Typography>
                            </Grid>
                        </Grid>
                    </a>
                </Link>
            </Grid>
            <Grid item style={{ position: "relative" }}>
                <Link href="/cart">
                    <a>
                        <Grid
                            container
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Grid item>
                                <ShoppingBagOutlinedIcon
                                    sx={
                                        router.pathname === "/cart"
                                            ? { color: "bg.azureBlue" }
                                            : { color: "text.primary" }
                                    }
                                    style={{
                                        ...style.bottomNavigationIcon,
                                        fontSize: "22px",
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={
                                        router.pathname === "/cart"
                                            ? {
                                                  ...style.bottomNavigationLabelSelected,
                                                  marginTop: "-2px",
                                              }
                                            : {
                                                  ...style.bottomNavigationLabel,
                                                  marginTop: "-2px",
                                              }
                                    }
                                >
                                    Cart
                                </Typography>
                            </Grid>
                        </Grid>
                    </a>
                </Link>
                {cartItems.length ? (
                    <Box sx={style.cartItemsCount}>{cartItems.length}</Box>
                ) : null}
            </Grid>
            <Grid item>
                <Link href="/profile">
                    <a>
                        <Grid
                            container
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Grid item>
                                <PersonOutlineOutlinedIcon
                                    sx={
                                        router.pathname === "/profile"
                                            ? { color: "bg.azureBlue" }
                                            : { color: "text.primary" }
                                    }
                                    style={style.bottomNavigationIcon}
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={
                                        router.pathname === "/profile"
                                            ? style.bottomNavigationLabelSelected
                                            : style.bottomNavigationLabel
                                    }
                                >
                                    Account
                                </Typography>
                            </Grid>
                        </Grid>
                    </a>
                </Link>
            </Grid>
        </Grid>
    );
};

export default BottomNavigation;
