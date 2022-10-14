import { useDispatch } from "react-redux";
import { toggleUserDashboardVisibility } from "redux/productSlice";
import { Box, Typography, IconButton } from "@mui/material";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


const style = {
    headingContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        algnItems: 'center',
        width: { lg: '1200px', xs: '90%' },
        margin: 'auto'
    },
    heading: {
        fontSize: '25px',
        fontWeight: 700,
    },
    headingIcon: {
        color: 'pink.dark',
        marginBottom: '-5px',
        marginRight: '5px',
        fontSize: '30px',
    }
}
const PageHeading = ( { heading } ) => {

    const dispatch = useDispatch();

    return (
        <Box sx={style.headingContainer}>
            <Typography variant='h2' sx={style.heading}>
                {(heading==='My Orders' || heading==='Order Details') && <ShoppingBagIcon sx={style.headingIcon}/>}
                {heading==='My Wish List' && <FavoriteIcon sx={style.headingIcon}/>}
                {heading==='My Profile' && <PersonIcon sx={style.headingIcon}/>}
                {heading==='Edit Profile' && <ManageAccountsIcon sx={style.headingIcon}/>}
                {heading}
            </Typography>
            <IconButton onClick={()=> dispatch(toggleUserDashboardVisibility(true))}>
                <MenuIcon sx={{ color: 'text.primary' }}/>
            </IconButton>
        </Box>
    )
}

export default PageHeading;