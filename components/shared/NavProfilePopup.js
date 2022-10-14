import { Box, Typography, Button, Divider } from "@mui/material";
import Link from 'next/link';
import Popup from "components/shared/Popup";
// import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';


const style = {
    profileMenuPopup: {
        height: 'auto',
        width: '200px',
        backgroundColor: 'bg.secondary',
        color: 'text.primary',
        padding: '8px 0px',
    },
    profileLinkBtn: {
        padding: '8px 16px',
        fontSize: '14px',
        textTransform: 'capitalize',
        justifyContent: 'flex-start',
        width: '100%',
        color: 'text.primary',
        fontWeight: 400,
        borderRadius: '0px',
        '&:hover': {
            backgroundColor: 'bg.aliceBlue'
        }
    },
}
const NavProfilePopup = ( { profilePopup, setProfilePopup, fromDashboard } ) => {

    return (
        <Popup
            popup={profilePopup}
            setPopup={setProfilePopup}
            anchorOrigin={
                fromDashboard
                ?
                null
                :
                {
                    vertical: 'bottom',
                    horizontal: 'right'
                }
            }
            transformOrigin={
                fromDashboard
                ?
                null
                :
                {
                    vertical: 'top',
                    horizontal: 'right'
                }
            }
        >
            <Box sx={style.profileMenuPopup}>
                <Box sx={{ p: '8px 16px 0px 16px' }}>
                    <Typography 
                        variant='h6'
                        fontWeight={600}
                        fontSize='14px'
                    >Umair Saleem</Typography>
                    <Typography variant='body2' sx={{ color: 'text.aliceBlue', fontSize: '12px' }}>
                        Admin
                    </Typography>
                </Box>

                <Divider light={true} sx={{ margin: '0.5rem 0px' }}/>

                {
                    !fromDashboard
                    &&
                    <Link href='/admin/dashboard' passHref>
                        <Button 
                            startIcon={<DashboardIcon sx={{ color: 'text.primary' }}/>} 
                            sx={style.profileLinkBtn}
                        >dashboard</Button>
                    </Link>
                }

                <Link href='/profile' passHref>
                    <Button 
                        startIcon={<PersonIcon sx={{ color: 'text.primary' }}/>} 
                        sx={style.profileLinkBtn}
                    >profile</Button>
                </Link>

                <Link href='/orders' passHref>
                    <Button 
                        startIcon={<AssignmentIcon sx={{ color: 'text.primary' }}/>} 
                        sx={style.profileLinkBtn}
                    >my orders</Button>
                </Link>

                <Link href='/profile/settings' passHref>
                    <Button 
                        startIcon={<SettingsIcon sx={{ color: 'text.primary' }}/>} 
                        sx={style.profileLinkBtn}
                    >settings</Button>
                </Link>

                <Button 
                    startIcon={<DarkModeIcon sx={{ color: 'text.primary' }}/>} 
                    sx={style.profileLinkBtn}
                >dark mode</Button>

                <Divider light={true} sx={{ margin: '0.5rem 0px' }}/>

                <Button 
                    startIcon={<LogoutIcon sx={{ color: 'text.primary' }}/>} 
                    sx={style.profileLinkBtn}
                >logout</Button>

            </Box>
        </Popup>
    )
}

export default NavProfilePopup;