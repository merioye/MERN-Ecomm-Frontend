import { useState, useEffect } from "react";
import { useTheme, Box, Fab } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleChatBoxVisibility } from "redux/chatSlice";
import CustomAlert from "components/shared/CustomAlert";
import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer";
import BottomNavigation from "components/shared/BottomNavigation";
import ChatBox from "components/shared/ChatBox";
import NextNProgress from "nextjs-progressbar";
import ChatIcon from "@mui/icons-material/Chat";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleIcon from "@mui/icons-material/Circle";

const style = {
    container: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "bg.primary",
    },
    openChatBoxBtn: {
        position: "fixed",
        bottom: { xm: "30px", xs: "80px" },
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
const Layout = ({ children }) => {
    const { alert } = useSelector((state) => state.alert);
    const { user } = useSelector((state) => state.auth);
    const {
        showChatBox,
        conversations: { conversationsList },
    } = useSelector((state) => state.chat);
    const [isUnreadMsgPresent, setIsUnreadMsgPresent] = useState(false);
    const dispatch = useDispatch();
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
        <Box sx={style.container}>
            <NextNProgress color={theme.palette.pink.dark} />
            <Navbar />
            <Box sx={{ flex: 1, marginTop: { xs: "65px", m: "80px" } }}>
                {children}
            </Box>
            <Footer />
            <BottomNavigation />
            {alert.showAlert && <CustomAlert />}
            <ChatBox />
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
        </Box>
    );
};

export default Layout;
