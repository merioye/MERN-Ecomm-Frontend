import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TimeAgo from "timeago-react";
import { useSocket } from "hooks/useSocket";
import {
    useTheme,
    Box,
    Button,
    Badge,
    IconButton,
    Typography,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { getOrderNotifications } from "redux/alertSlice";
import { toggleMobileSidebar } from "redux/productSlice";
import Popup from "components/shared/Popup";
import NavProfilePopup from "components/shared/NavProfilePopup";
import { useDeviceSize } from "hooks/useDeviceSize";

const style = {
    container: {
        height: "60px",
        backgroundColor: "bg.secondary",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: "0px",
        right: "0px",
        zIndex: 500,
        padding: "0px 20px",
    },
    browseBtn: {
        backgroundColor: "bg.primary",
        color: "text.primary",
        textTransform: "capitalize",
        padding: "7px 20px",
        fontSize: "14px",
        fontWeight: "600",
        borderRadius: "8px",
        "&:hover": {
            backgroundColor: "bg.primary",
        },
    },
    profileMenuPopup: {
        height: "auto",
        width: "200px",
        backgroundColor: "bg.secondary",
        color: "text.primary",
        padding: "8px 0px",
    },
    profileLinkBtn: {
        padding: "8px 16px",
        fontSize: "14px",
        textTransform: "capitalize",
        justifyContent: "flex-start",
        width: "100%",
        color: "text.primary",
        fontWeight: 400,
        borderRadius: "0px",
        "&:hover": {
            backgroundColor: "bg.aliceBlue",
        },
    },
    tabItem: {
        width: "100%",
        height: "50px",
        padding: "32px 16px",
        borderBottom: "1px solid rgb(219, 240, 254)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "capitalize",
        borderRadius: "0px",
    },
    tabItemIcon: {
        color: "bg.azureBlue",
        marginRight: "16px",
    },
    tabItemText: {
        fontSize: "13px",
        fontWeight: 600,
        color: "text.primary",
    },
    tabItemDate: {
        fontSize: "11px",
        color: "text.primary",
        lineHeight: 1.75,
        fontWeight: 400,
        textAlign: "left",
    },
};

const AdminNavbar = () => {
    const { user } = useSelector((state) => state.auth);
    const { orderNotificationsList, status } = useSelector(
        (state) => state.alert.orderNotifications
    );
    const [profilePopup, setProfilePopup] = useState(null);
    const [notificationsPopup, setNotificationsPopup] = useState(null);
    const { width } = useDeviceSize();
    const theme = useTheme();
    const dispatch = useDispatch();
    useSocket();

    useEffect(() => {
        dispatch(getOrderNotifications());
    }, [dispatch]);

    return (
        <Box
            sx={style.container}
            style={
                width > 1280
                    ? {
                          width: "calc(100% - 280px)",
                          boxShadow: theme.palette.boxShadow.nav,
                      }
                    : { width: "100%", boxShadow: theme.palette.boxShadow.nav }
            }
        >
            <Box>
                {width <= 1280 && (
                    <IconButton
                        sx={{ color: "text.light" }}
                        onClick={() => dispatch(toggleMobileSidebar(true))}
                    >
                        <svg
                            style={{ height: "25px" }}
                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-bbh01c"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.25 5H1.25C0.559766 5 0 4.44141 0 3.75C0 3.05977 0.559766 2.5 1.25 2.5H16.25C16.9414 2.5 17.5 3.05977 17.5 3.75C17.5 4.44141 16.9414 5 16.25 5ZM16.25 17.5H1.25C0.559766 17.5 0 16.9414 0 16.25C0 15.5586 0.559766 15 1.25 15H16.25C16.9414 15 17.5 15.5586 17.5 16.25C17.5 16.9414 16.9414 17.5 16.25 17.5Z"
                                fill="currentColor"
                                className="secondary"
                            ></path>
                            <path
                                d="M2.5 10C2.5 9.30859 3.05977 8.75 3.75 8.75H18.75C19.4414 8.75 20 9.30859 20 10C20 10.6914 19.4414 11.25 18.75 11.25H3.75C3.05977 11.25 2.5 10.6914 2.5 10Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </IconButton>
                )}

                <Link href="/" passHref>
                    <Button
                        startIcon={<LanguageIcon />}
                        sx={style.browseBtn}
                        style={width <= 1280 ? { marginLeft: "10px" } : null}
                    >
                        browse website
                    </Button>
                </Link>
            </Box>

            <Box>
                <IconButton
                    onClick={(e) => setNotificationsPopup(e.currentTarget)}
                    aria-describedby={
                        Boolean(notificationsPopup)
                            ? "simple-popover"
                            : undefined
                    }
                >
                    {orderNotificationsList.length ? (
                        <Badge color="primary" variant="dot">
                            <NotificationsIcon
                                sx={{ color: "text.aliceBlue" }}
                            />
                        </Badge>
                    ) : (
                        <NotificationsIcon sx={{ color: "text.aliceBlue" }} />
                    )}
                </IconButton>

                <Popup
                    popup={notificationsPopup}
                    setPopup={setNotificationsPopup}
                >
                    <Box sx={{ height: "300px", width: "300px" }}>
                        <Box sx={{ bgcolor: "bg.secondary", width: "100%" }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: "text.primary",
                                    fontWeight: 600,
                                    fontSize: "17px",
                                    paddingLeft: "16px",
                                    py: "10px",
                                }}
                            >
                                Notifications
                            </Typography>
                            {orderNotificationsList.length ? (
                                orderNotificationsList.map((notification) => {
                                    return (
                                        <Link
                                            href={`/admin/orders/${notification._id}`}
                                            passHref
                                            key={notification._id}
                                        >
                                            <Button sx={style.tabItem}>
                                                <ShoppingCartIcon
                                                    sx={style.tabItemIcon}
                                                />
                                                <Box>
                                                    <Typography
                                                        variant="body1"
                                                        sx={style.tabItemText}
                                                    >
                                                        {
                                                            notification.customerName
                                                        }{" "}
                                                        placed a new order
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={style.tabItemDate}
                                                    >
                                                        <TimeAgo
                                                            datetime={
                                                                notification.createdAt
                                                            }
                                                        />
                                                    </Typography>
                                                </Box>
                                            </Button>
                                        </Link>
                                    );
                                })
                            ) : (
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: "16px",
                                        color: "text.secondaryLight",
                                        fontWeight: 600,
                                        textAlign: "center",
                                        mt: "100px",
                                    }}
                                >
                                    No notifications present 😮
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Popup>

                <IconButton
                    sx={{
                        height: "40px",
                        width: "40px",
                        ml: 1,
                        padding: "0px",
                        borderRadius: "50%",
                        positon: "relative",
                        overflow: "hidden",
                    }}
                    onClick={(e) => setProfilePopup(e.currentTarget)}
                    aria-describedby={
                        Boolean(profilePopup) ? "simple-popover" : undefined
                    }
                >
                    <Image
                        src={
                            user
                                ? user.avatar
                                    ? user.avatar
                                    : "/images/man.svg"
                                : "/images/man.svg"
                        }
                        alt="profileImage"
                        height="100%"
                        width="100%"
                        placeholder="blur"
                        blurDataURL={
                            user
                                ? user.avatar
                                    ? user.avatar
                                    : "/images/man.svg"
                                : "/images/man.svg"
                        }
                    />
                </IconButton>

                <NavProfilePopup
                    profilePopup={profilePopup}
                    setProfilePopup={setProfilePopup}
                    fromDashboard={true}
                />
            </Box>
        </Box>
    );
};

export default AdminNavbar;
