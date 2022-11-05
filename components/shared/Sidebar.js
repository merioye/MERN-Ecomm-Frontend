import { useEffect, useState } from "react";
import {
    useTheme,
    Drawer,
    Box,
    Typography,
    List,
    Collapse,
    Button,
    CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toggleMobileSidebar } from "redux/productSlice";
import { logoutUser } from "redux/authSlice";
import { useDeviceSize } from "hooks/useDeviceSize";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import ListIcon from "@mui/icons-material/List";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const style = {
    container: {
        width: "280px",
        height: "100vh",
        overflow: "auto",
        transition: "all 0.2s ease 0s",
        zIndex: 2000,
        backgroundColor: "text.primary",
        padding: "16px",
        paddingTop: "0px",
        color: "text.white",
    },
    header: {
        width: "100%",
        height: "70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 10px",
    },
    modeBtn: {
        color: "text.white",
        backgroundColor: "text.secondary",
        "&:hover": {
            backgroundColor: "text.secondary",
        },
    },
    menuItems: {
        width: "100%",
        position: "relative",
        minHeight: "calc(100% - 70px)",
        paddingBottom: "60px",
    },
    menuItem: {
        borderRadius: "8px",
        backgroundColor: "none",
        width: "100%",
        height: "44px",
        padding: "0px 12px 0px 16px",
        marginBottom: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        "&:hover": {
            backgroundColor: "#373F5099",
        },
    },
    selectedMenuItem: {
        backgroundColor: "#373F5099",
    },
    menuItemText: {
        fontSize: "14px",
        color: "text.white",
        textTransform: "capitalize",
        marginLeft: "13px",
        fontWeight: 600,
    },
    selectedMenuItemText: {
        color: "#4E97FD",
    },
    menuItemIcon: {
        fontSize: "24px",
        color: "text.fadedSilver",
    },
    arrowIcon: {
        position: "absolute",
        right: "17px",
        top: "11px",
        color: "text.white",
    },
    circleIcon: {
        fontSize: "7px",
        color: "text.fadedSilver",
    },
    logoutBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "bg.azureBlue",
        color: "text.white",
        borderRadius: "8px",
        position: "absolute",
        bottom: "0px",
        cursor: "pointer",
        transitionProperty: "all",
        transitionDuration: "0.2s",
        fontSize: "14px",
        letterSpacing: "0.05rem",
        "&:hover": {
            backgroundColor: "bg.royalBlue",
        },
    },
    logoutPlaceholderBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0",

        borderRadius: "8px",
        position: "absolute",
        bottom: "0px",
        cursor: "not-allowed",
    },
};

const SidebarContent = () => {
    const [openProductsNestedList, setOpenProductsNestedList] = useState(false);
    const [openCategoriesNestedList, setOpenCategoriesNestedList] =
        useState(false);
    const [openBrandsNestedList, setOpenBrandsNestedList] = useState(false);
    const [openCouponsNestedList, setOpenCouponsNestedList] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { query, asPath } = router;
    const { pageName, id } = query;
    const theme = useTheme();

    useEffect(() => {
        if (pageName === "products" && !id) {
            setOpenProductsNestedList(true);
            setOpenCategoriesNestedList(false);
            setOpenBrandsNestedList(false);
            setOpenCouponsNestedList(false);
        } else if (pageName === "categories" && !id) {
            setOpenCategoriesNestedList(true);
            setOpenProductsNestedList(false);
            setOpenBrandsNestedList(false);
            setOpenCouponsNestedList(false);
        } else if (pageName === "brands" && !id) {
            setOpenBrandsNestedList(true);
            setOpenProductsNestedList(false);
            setOpenCategoriesNestedList(false);
            setOpenCouponsNestedList(false);
        } else if (pageName === "coupons" && !id) {
            setOpenCouponsNestedList(true);
            setOpenProductsNestedList(false);
            setOpenCategoriesNestedList(false);
            setOpenBrandsNestedList(false);
        } else {
            setOpenProductsNestedList(false);
            setOpenCategoriesNestedList(false);
            setOpenBrandsNestedList(false);
            setOpenCouponsNestedList(false);
        }
    }, [pageName]);

    const handleLogout = () => {
        setShowLoader(true);
        dispatch(logoutUser(setShowLoader, router));
    };

    return (
        <>
            <Box sx={style.header}>
                <Typography variant="h5" fontWeight="bold">
                    TeleCart
                </Typography>
            </Box>

            <List sx={style.menuItems} component="nav">
                <Link href="/admin/dashboard" passHref>
                    <Button
                        sx={style.menuItem}
                        style={
                            pageName === "dashboard"
                                ? style.selectedMenuItem
                                : null
                        }
                    >
                        <DashboardIcon
                            sx={style.menuItemIcon}
                            style={
                                pageName === "dashboard"
                                    ? style.selectedMenuItemText
                                    : null
                            }
                        />
                        <Typography
                            variant="body1"
                            sx={style.menuItemText}
                            style={
                                pageName === "dashboard"
                                    ? style.selectedMenuItemText
                                    : null
                            }
                        >
                            dashboard
                        </Typography>
                    </Button>
                </Link>

                <Button
                    sx={style.menuItem}
                    style={
                        pageName === "products" && !id
                            ? style.selectedMenuItem
                            : null
                    }
                    onClick={() =>
                        setOpenProductsNestedList(!openProductsNestedList)
                    }
                >
                    <InventoryIcon
                        sx={style.menuItemIcon}
                        style={
                            pageName === "products" && !id
                                ? style.selectedMenuItemText
                                : null
                        }
                    />
                    <Typography
                        variant="body1"
                        style={
                            pageName === "products" && !id
                                ? style.selectedMenuItemText
                                : null
                        }
                        sx={style.menuItemText}
                    >
                        products
                    </Typography>
                    {openProductsNestedList ? (
                        <ExpandLess sx={style.arrowIcon} />
                    ) : (
                        <ExpandMore sx={style.arrowIcon} />
                    )}
                </Button>
                <Collapse
                    in={openProductsNestedList}
                    timeout="auto"
                    unmountOnExit
                >
                    <List component="div" disablePadding>
                        <Button
                            sx={style.menuItem}
                            style={{ paddingLeft: "40px" }}
                            onClick={() => router.push("/admin/products")}
                        >
                            <CircleIcon
                                sx={style.circleIcon}
                                style={
                                    asPath.split("?")[0] === "/admin/products"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            />
                            <Typography
                                variant="body1"
                                sx={style.menuItemText}
                                style={
                                    asPath.split("?")[0] === "/admin/products"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            >
                                product list
                            </Typography>
                        </Button>

                        <Button
                            sx={style.menuItem}
                            style={{ paddingLeft: "40px" }}
                            onClick={() =>
                                router.push("/admin/products/create")
                            }
                        >
                            <CircleIcon
                                sx={style.circleIcon}
                                style={
                                    asPath === "/admin/products/create"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            />
                            <Typography
                                variant="body1"
                                sx={style.menuItemText}
                                style={
                                    asPath === "/admin/products/create"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            >
                                create product
                            </Typography>
                        </Button>

                        <Button
                            sx={style.menuItem}
                            style={{ paddingLeft: "40px" }}
                            onClick={() =>
                                router.push("/admin/products/reviews")
                            }
                        >
                            <CircleIcon
                                sx={style.circleIcon}
                                style={
                                    asPath === "/admin/products/reviews"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            />
                            <Typography
                                variant="body1"
                                sx={style.menuItemText}
                                style={
                                    asPath === "/admin/products/reviews"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            >
                                reviews
                            </Typography>
                        </Button>
                    </List>
                </Collapse>

                <Button
                    sx={style.menuItem}
                    style={
                        pageName === "categories" && !id
                            ? style.selectedMenuItem
                            : null
                    }
                    onClick={() =>
                        setOpenCategoriesNestedList(!openCategoriesNestedList)
                    }
                >
                    <ListIcon
                        sx={style.menuItemIcon}
                        style={
                            pageName === "categories" && !id
                                ? style.selectedMenuItemText
                                : null
                        }
                    />
                    <Typography
                        variant="body1"
                        sx={style.menuItemText}
                        style={
                            pageName === "categories" && !id
                                ? style.selectedMenuItemText
                                : null
                        }
                    >
                        categories
                    </Typography>
                    {openCategoriesNestedList ? (
                        <ExpandLess sx={style.arrowIcon} />
                    ) : (
                        <ExpandMore sx={style.arrowIcon} />
                    )}
                </Button>
                <Collapse
                    in={openCategoriesNestedList}
                    timeout="auto"
                    unmountOnExit
                >
                    <List component="div" disablePadding>
                        <Button
                            sx={style.menuItem}
                            style={{ paddingLeft: "40px" }}
                            onClick={() => router.push("/admin/categories")}
                        >
                            <CircleIcon
                                sx={style.circleIcon}
                                style={
                                    asPath.split("?")[0] === "/admin/categories"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            />
                            <Typography
                                variant="body1"
                                sx={style.menuItemText}
                                style={
                                    asPath.split("?")[0] === "/admin/categories"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            >
                                category list
                            </Typography>
                        </Button>

                        <Button
                            sx={style.menuItem}
                            style={{ paddingLeft: "40px" }}
                            onClick={() =>
                                router.push("/admin/categories/create")
                            }
                        >
                            <CircleIcon
                                sx={style.circleIcon}
                                style={
                                    asPath === "/admin/categories/create"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            />
                            <Typography
                                variant="body1"
                                sx={style.menuItemText}
                                style={
                                    asPath === "/admin/categories/create"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            >
                                create category
                            </Typography>
                        </Button>
                    </List>
                </Collapse>

                <Button
                    sx={style.menuItem}
                    style={
                        pageName === "brands" && !id
                            ? style.selectedMenuItem
                            : null
                    }
                    onClick={() =>
                        setOpenBrandsNestedList(!openBrandsNestedList)
                    }
                >
                    <LocalActivityIcon
                        sx={style.menuItemIcon}
                        style={
                            pageName === "brands" && !id
                                ? style.selectedMenuItemText
                                : null
                        }
                    />
                    <Typography
                        variant="body1"
                        sx={style.menuItemText}
                        style={
                            pageName === "brands" && !id
                                ? style.selectedMenuItemText
                                : null
                        }
                    >
                        brands
                    </Typography>
                    {openBrandsNestedList ? (
                        <ExpandLess sx={style.arrowIcon} />
                    ) : (
                        <ExpandMore sx={style.arrowIcon} />
                    )}
                </Button>
                <Collapse
                    in={openBrandsNestedList}
                    timeout="auto"
                    unmountOnExit
                >
                    <List component="div" disablePadding>
                        <Button
                            sx={style.menuItem}
                            style={{ paddingLeft: "40px" }}
                            onClick={() => router.push("/admin/brands")}
                        >
                            <CircleIcon
                                sx={style.circleIcon}
                                style={
                                    asPath.split("?")[0] === "/admin/brands"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            />
                            <Typography
                                variant="body1"
                                sx={style.menuItemText}
                                style={
                                    asPath.split("?")[0] === "/admin/brands"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            >
                                brand list
                            </Typography>
                        </Button>

                        <Button
                            sx={style.menuItem}
                            style={{ paddingLeft: "40px" }}
                            onClick={() => router.push("/admin/brands/create")}
                        >
                            <CircleIcon
                                sx={style.circleIcon}
                                style={
                                    asPath === "/admin/brands/create"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            />
                            <Typography
                                variant="body1"
                                sx={style.menuItemText}
                                style={
                                    asPath === "/admin/brands/create"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            >
                                create brand
                            </Typography>
                        </Button>
                    </List>
                </Collapse>

                <Link href="/admin/orders" passHref>
                    <Button
                        sx={style.menuItem}
                        style={
                            pageName === "orders" && !id
                                ? style.selectedMenuItem
                                : null
                        }
                    >
                        <AssignmentIcon
                            sx={style.menuItemIcon}
                            style={
                                pageName === "orders" && !id
                                    ? style.selectedMenuItemText
                                    : null
                            }
                        />
                        <Typography
                            variant="body1"
                            sx={style.menuItemText}
                            style={
                                pageName === "orders" && !id
                                    ? style.selectedMenuItemText
                                    : null
                            }
                        >
                            orders
                        </Typography>
                    </Button>
                </Link>

                <Link href="/admin/users" passHref>
                    <Button
                        sx={style.menuItem}
                        style={
                            asPath.split("?")[0] === "/admin/users"
                                ? style.selectedMenuItem
                                : null
                        }
                    >
                        <PeopleAltIcon
                            sx={style.menuItemIcon}
                            style={
                                asPath.split("?")[0] === "/admin/users"
                                    ? style.selectedMenuItemText
                                    : null
                            }
                        />
                        <Typography
                            variant="body1"
                            sx={style.menuItemText}
                            style={
                                asPath.split("?")[0] === "/admin/users"
                                    ? style.selectedMenuItemText
                                    : null
                            }
                        >
                            users
                        </Typography>
                    </Button>
                </Link>

                <Button
                    sx={style.menuItem}
                    style={
                        pageName === "coupons" && !id
                            ? style.selectedMenuItem
                            : null
                    }
                    onClick={() =>
                        setOpenCouponsNestedList(!openCouponsNestedList)
                    }
                >
                    <LocalMallIcon
                        sx={style.menuItemIcon}
                        style={
                            pageName === "coupons" && !id
                                ? style.selectedMenuItemText
                                : null
                        }
                    />
                    <Typography
                        variant="body1"
                        sx={style.menuItemText}
                        style={
                            pageName === "coupons" && !id
                                ? style.selectedMenuItemText
                                : null
                        }
                    >
                        coupons
                    </Typography>
                    {openCouponsNestedList ? (
                        <ExpandLess sx={style.arrowIcon} />
                    ) : (
                        <ExpandMore sx={style.arrowIcon} />
                    )}
                </Button>
                <Collapse
                    in={openCouponsNestedList}
                    timeout="auto"
                    unmountOnExit
                >
                    <List component="div" disablePadding>
                        <Button
                            sx={style.menuItem}
                            style={{ paddingLeft: "40px" }}
                            onClick={() => router.push("/admin/coupons")}
                        >
                            <CircleIcon
                                sx={style.circleIcon}
                                style={
                                    asPath.split("?")[0] === "/admin/coupons"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            />
                            <Typography
                                variant="body1"
                                sx={style.menuItemText}
                                style={
                                    asPath.split("?")[0] === "/admin/coupons"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            >
                                coupon list
                            </Typography>
                        </Button>

                        <Button
                            sx={style.menuItem}
                            style={{ paddingLeft: "40px" }}
                            onClick={() => router.push("/admin/coupons/create")}
                        >
                            <CircleIcon
                                sx={style.circleIcon}
                                style={
                                    asPath === "/admin/coupons/create"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            />
                            <Typography
                                variant="body1"
                                sx={style.menuItemText}
                                style={
                                    asPath === "/admin/coupons/create"
                                        ? style.selectedMenuItemText
                                        : null
                                }
                            >
                                create coupon
                            </Typography>
                        </Button>
                    </List>
                </Collapse>

                {showLoader ? (
                    <Box
                        style={theme.authBtnStyle}
                        sx={style.logoutPlaceholderBtn}
                    >
                        <CircularProgress
                            size={25}
                            sx={{ color: "pink.dark" }}
                        />
                    </Box>
                ) : (
                    <Box
                        style={theme.authBtnStyle}
                        sx={style.logoutBtn}
                        onClick={handleLogout}
                    >
                        <LogoutIcon
                            sx={{
                                ...style.menuItemIcon,
                                mr: 1,
                                color: "text.white",
                            }}
                        />
                        logout
                    </Box>
                )}
            </List>
        </>
    );
};

const DesktopSidebar = () => {
    return (
        <Box sx={style.container}>
            <SidebarContent />
        </Box>
    );
};

const MobileSidebar = () => {
    const { showSidebarOnMobile } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const handleToggleSidebar = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        dispatch(toggleMobileSidebar(open));
    };

    return (
        <Drawer
            ModalProps={{ keepMounted: true }}
            open={showSidebarOnMobile}
            onClose={handleToggleSidebar(false)}
        >
            <Box
                sx={style.container}
                role="presentation"
                onKeyDown={handleToggleSidebar(false)}
            >
                <SidebarContent />
            </Box>
        </Drawer>
    );
};

const Sidebar = () => {
    const { width } = useDeviceSize();

    return width > 1280 ? <DesktopSidebar /> : <MobileSidebar />;
};

export default Sidebar;
