import { useTheme, Box, Fab } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleChatBoxVisibility } from "redux/productSlice";
import NextNProgress from "nextjs-progressbar";
import CustomAlert from "components/shared/CustomAlert";
import Sidebar from "components/shared/Sidebar";
import AdminNavbar from "components/shared/AdminNavbar";
import ChatBox from "components/shared/ChatBox";
import { useDeviceSize } from "hooks/useDeviceSize";
import ChatIcon from '@mui/icons-material/Chat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const style = {
    openChatBoxBtn: {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: 'bg.azureBlue',
        '&:hover': {
            backgroundColor: 'bg.azureBlue'
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatIcon: {
        color: 'text.white',
        fontSize: '30px'
    }
}
const AdminLayout = ({ children }) => {

    const { alert } = useSelector((state)=>state.alert);
    const { showChatBox } = useSelector((state)=>state.product);
    const dispatch = useDispatch();
    const { width } = useDeviceSize();
    const theme = useTheme();

    return ( 
        <>
            <NextNProgress color={theme.palette.pink.dark}/>
            <Box sx={theme.adminPageContainer}>
                <Sidebar/>
                <Box
                    sx={theme.adminMainContent}
                    style={ width>1280 ? { width: 'calc(100% - 280px)' } : { width: '100%' } }
                >
                    <AdminNavbar/>
                    {children}
                </Box>
            </Box>
            {
                alert.showAlert && <CustomAlert/>
            }
            <ChatBox fromAdmin={true}/>
            <Fab 
                sx={style.openChatBoxBtn}
                onClick={()=>dispatch(toggleChatBoxVisibility(!showChatBox))}
            >
                {
                    showChatBox===true
                    ?
                    <KeyboardArrowDownIcon sx={{ ...style.chatIcon, fontSize: '40px' }}/>
                    :
                    <ChatIcon sx={style.chatIcon} />
                }
            </Fab>
        </>
    )
}

export default AdminLayout;