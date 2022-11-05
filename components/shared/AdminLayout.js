import { useState, useEffect } from "react";
import { useTheme, Box, Fab } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleChatBoxVisibility } from "redux/chatSlice";
import NextNProgress from "nextjs-progressbar";
import CustomAlert from "components/shared/CustomAlert";
import Sidebar from "components/shared/Sidebar";
import AdminNavbar from "components/shared/AdminNavbar";
import ChatBox from "components/shared/ChatBox";
import { useDeviceSize } from "hooks/useDeviceSize";
import ChatIcon from "@mui/icons-material/Chat";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleIcon from "@mui/icons-material/Circle";

const style = {
    openChatBoxBtn: {
        position: "fixed",
        bottom: { xm: "30px", xs: "20px" },
        right: { xm: "30px", xs: "20px" },
        backgroundColor: "bg.azureBlue",
        "&:hover": {
            backgroundColor: "bg.azureBlue",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    chatIcon: {
        color: "text.white",
        fontSize: "30px",
    },
};
const AdminLayout = ({ children }) => {
    const { alert } = useSelector((state) => state.alert);
    const { user } = useSelector((state) => state.auth);
    const {
        showChatBox,
        conversations: { conversationsList },
    } = useSelector((state) => state.chat);
    const [isUnreadMsgPresent, setIsUnreadMsgPresent] = useState(false);
    const dispatch = useDispatch();
    const { width } = useDeviceSize();
    const theme = useTheme();

    useEffect(() => {
        if (!user) return;

        for (let i = 0; i < conversationsList.length; i++) {
            if (!conversationsList[i].lastMessageReadBy.includes(user._id)) {
                setIsUnreadMsgPresent(true);
                break;
            }
            if (i === conversationsList.length - 1) {
                setIsUnreadMsgPresent(false);
            }
        }
    }, [user, JSON.stringify(conversationsList)]);

    return (
        <>
            <NextNProgress color={theme.palette.pink.dark} />
            <Box sx={theme.adminPageContainer}>
                <Sidebar />
                <Box
                    sx={theme.adminMainContent}
                    style={
                        width > 1280
                            ? { width: "calc(100% - 280px)" }
                            : { width: "100%" }
                    }
                >
                    <AdminNavbar />
                    {children}
                </Box>
            </Box>
            {alert.showAlert && <CustomAlert />}
            <ChatBox fromAdmin={true} />
            <Fab
                sx={style.openChatBoxBtn}
                onClick={() => dispatch(toggleChatBoxVisibility(!showChatBox))}
            >
                {showChatBox === true ? (
                    <KeyboardArrowDownIcon
                        sx={{ ...style.chatIcon, fontSize: "40px" }}
                    />
                ) : (
                    <ChatIcon sx={style.chatIcon} />
                )}
                {isUnreadMsgPresent ? (
                    <CircleIcon
                        sx={{
                            color: "text.green",
                            fontSize: "20px",
                            position: "absolute",
                            right: "0px",
                            top: "0px",
                        }}
                    />
                ) : null}
            </Fab>
        </>
    );
};

export default AdminLayout;
