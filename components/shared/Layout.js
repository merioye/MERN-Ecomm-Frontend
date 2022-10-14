import { useTheme, Box, Fab, Grow } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleChatBoxVisibility } from "redux/productSlice";
import CustomAlert from "components/shared/CustomAlert";
import Navbar from "components/shared/Navbar";
import Footer from "components/shared/Footer";
import BottomNavigation from "components/shared/BottomNavigation";
import ChatBox from "components/shared/ChatBox";
import NextNProgress from "nextjs-progressbar";
import ChatIcon from '@mui/icons-material/Chat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'bg.primary'
    },
    openChatBoxBtn: {
        position: 'fixed',
        bottom: { xm: '30px', xs: '90px' },
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
const Layout = ( { children } ) => {

    const { alert } = useSelector((state)=>state.alert);
    const { showChatBox } = useSelector((state)=>state.product);
    const dispatch = useDispatch();
    const theme = useTheme();

    return ( 
        <Box sx={style.container}>
            <NextNProgress color={theme.palette.pink.dark}/>
            <Navbar/>
            <Box sx={{ flex: 1, marginTop: '80px' }}>
                {children}
            </Box>
            <Footer/>
            <BottomNavigation/>
            {
                alert.showAlert && <CustomAlert/>
            }
            <ChatBox/>
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
        </Box>
    )
}

export default Layout;