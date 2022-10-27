import Link from "next/link";
import { useRouter } from "next/router";
import { Drawer, Box, Typography, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleUserDashboardVisibility } from "redux/productSlice";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const style = {
    mainContainer: {
        width: "280px",
        height: "100vh",
        overflow: "auto",
        transition: "all 0.2s ease 0s",
        zIndex: 2000,
        color: "text.primary",
    },
    container: {
        backgroundColor: "bg.secondary",
        color: "text.primary",
        height: "auto",
        width: "auto",
    },
    heading: {
        fontSize: "12px",
        fontWeight: 600,
        color: "text.light",
        textTransform: "uppercase",
        padding: "26px 30px 1rem 30px",
    },
    menuItem: {
        borderLeft: "4px solid transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 1.5rem",
        marginBottom: "0.8rem",
        borderTopColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        "&:hover": {
            color: "bg.azureBlue",
            borderLeftColor: "bg.azureBlue",
        },
    },
    menuItemIcon: {
        color: "text.light",
        fontSize: "20px",
        marginTop: "4px",
        "&:hover": {
            color: "bg.azureBlue",
        },
    },
    menuItemText: {
        fontSize: "14px",
    },
};
const SidebarContent = () => {
    const router = useRouter();

    return (
        <Box sx={style.container}>
            <Typography variant="h4" sx={style.heading}>
                Dashboard
            </Typography>
            <Link href="/orders">
                <a>
                    <Box
                        sx={
                            router.pathname === "/orders" ||
                            router.pathname === "/orders/[id]"
                                ? {
                                      ...style.menuItem,
                                      color: "bg.azureBlue",
                                      borderLeftColor: "bg.azureBlue",
                                  }
                                : style.menuItem
                        }
                    >
                        <Grid container alignItems="center" gap="8px">
                            <Grid item>
                                <ShoppingBagOutlinedIcon
                                    sx={
                                        router.pathname === "/orders" ||
                                        router.pathname === "/orders/[id]"
                                            ? {
                                                  ...style.menuItemIcon,
                                                  color: "bg.azureBlue",
                                              }
                                            : style.menuItemIcon
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={style.menuItemText}
                                >
                                    Orders
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </a>
            </Link>
            <Link href="/wishlist">
                <a>
                    <Box
                        sx={
                            router.pathname === "/wishlist"
                                ? {
                                      ...style.menuItem,
                                      color: "bg.azureBlue",
                                      borderLeftColor: "bg.azureBlue",
                                  }
                                : style.menuItem
                        }
                    >
                        <Grid container alignItems="center" gap="8px">
                            <Grid item>
                                <FavoriteBorderOutlinedIcon
                                    sx={
                                        router.pathname === "/wishlist"
                                            ? {
                                                  ...style.menuItemIcon,
                                                  color: "bg.azureBlue",
                                              }
                                            : style.menuItemIcon
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={style.menuItemText}
                                >
                                    Wishlist
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </a>
            </Link>
            <Typography variant="h4" sx={style.heading}>
                account settings
            </Typography>
            <Link href="/profile">
                <a>
                    <Box
                        sx={
                            router.pathname === "/profile"
                                ? {
                                      ...style.menuItem,
                                      color: "bg.azureBlue",
                                      borderLeftColor: "bg.azureBlue",
                                  }
                                : style.menuItem
                        }
                    >
                        <Grid container alignItems="center" gap="8px">
                            <Grid item>
                                <PersonIcon
                                    sx={
                                        router.pathname === "/profile"
                                            ? {
                                                  ...style.menuItemIcon,
                                                  color: "bg.azureBlue",
                                              }
                                            : style.menuItemIcon
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={style.menuItemText}
                                >
                                    Profile Info
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </a>
            </Link>
            <Link href="/profile/settings">
                <a>
                    <Box
                        sx={
                            router.pathname === "/profile/settings"
                                ? {
                                      ...style.menuItem,
                                      color: "bg.azureBlue",
                                      borderLeftColor: "bg.azureBlue",
                                  }
                                : style.menuItem
                        }
                    >
                        <Grid container alignItems="center" gap="8px">
                            <Grid item>
                                <ManageAccountsIcon
                                    sx={
                                        router.pathname === "/profile/settings"
                                            ? {
                                                  ...style.menuItemIcon,
                                                  color: "bg.azureBlue",
                                              }
                                            : style.menuItemIcon
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={style.menuItemText}
                                >
                                    Edit Profile
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </a>
            </Link>
        </Box>
    );
};
const UserDashboardSidebar = () => {
    const { showUserDashboardSidebar } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const handleToggleSidebar = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        dispatch(toggleUserDashboardVisibility(open));
    };

    return (
        <Drawer
            open={showUserDashboardSidebar}
            onClose={handleToggleSidebar(false)}
        >
            <Box
                sx={style.mainContainer}
                role="presentation"
                onClick={handleToggleSidebar(false)}
                onKeyDown={handleToggleSidebar(false)}
            >
                <SidebarContent />
            </Box>
        </Drawer>
    );
};

export default UserDashboardSidebar;
