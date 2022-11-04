import { useState } from "react";
import { useRouter } from "next/router";
import {
    Box,
    Typography,
    Button,
    Divider,
    CircularProgress,
} from "@mui/material";
import Link from "next/link";
import Popup from "components/shared/Popup";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "redux/authSlice";

const style = {
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
};
const NavProfilePopup = ({ profilePopup, setProfilePopup, fromDashboard }) => {
    const { user } = useSelector((state) => state.auth);
    const [showLoader, setShowLoader] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        setShowLoader(true);
        setProfilePopup(null);
        dispatch(logoutUser(setShowLoader, router));
    };
    return (
        <Popup
            popup={profilePopup}
            setPopup={setProfilePopup}
            anchorOrigin={
                fromDashboard
                    ? null
                    : {
                          vertical: "bottom",
                          horizontal: "right",
                      }
            }
            transformOrigin={
                fromDashboard
                    ? null
                    : {
                          vertical: "top",
                          horizontal: "right",
                      }
            }
        >
            <Box sx={style.profileMenuPopup}>
                <Box sx={{ p: "8px 16px 0px 16px" }}>
                    <Typography variant="h6" fontWeight={600} fontSize="14px">
                        {user?.name}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ color: "text.aliceBlue", fontSize: "12px" }}
                    >
                        {user?.role === "admin" ? "Admin" : "Customer"}
                    </Typography>
                </Box>

                <Divider light={true} sx={{ margin: "0.5rem 0px" }} />

                {user?.role === "admin"
                    ? !fromDashboard && (
                          <Button
                              startIcon={
                                  <DashboardIcon
                                      sx={{ color: "text.primary" }}
                                  />
                              }
                              sx={style.profileLinkBtn}
                              onClick={() => {
                                  setProfilePopup(null);
                                  router.push("/admin/dashboard");
                              }}
                          >
                              dashboard
                          </Button>
                      )
                    : null}

                <Button
                    startIcon={<PersonIcon sx={{ color: "text.primary" }} />}
                    sx={style.profileLinkBtn}
                    onClick={() => {
                        setProfilePopup(null);
                        router.push("/profile");
                    }}
                >
                    profile
                </Button>

                <Button
                    startIcon={
                        <AssignmentIcon sx={{ color: "text.primary" }} />
                    }
                    sx={style.profileLinkBtn}
                    onClick={() => {
                        setProfilePopup(null);
                        router.push("/orders");
                    }}
                >
                    my orders
                </Button>

                <Button
                    startIcon={<SettingsIcon sx={{ color: "text.primary" }} />}
                    sx={style.profileLinkBtn}
                    onClick={() => {
                        setProfilePopup(null);
                        router.push("/profile/settings");
                    }}
                >
                    settings
                </Button>

                <Divider light={true} sx={{ margin: "0.5rem 0px" }} />
                {showLoader ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress
                            size={30}
                            sx={{ color: "pink.dark" }}
                        />
                    </Box>
                ) : (
                    <Button
                        startIcon={
                            <LogoutIcon sx={{ color: "text.primary" }} />
                        }
                        sx={style.profileLinkBtn}
                        onClick={handleLogout}
                    >
                        logout
                    </Button>
                )}
            </Box>
        </Popup>
    );
};

export default NavProfilePopup;
