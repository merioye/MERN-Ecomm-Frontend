import { useState } from "react";
import SwipeableViews from 'react-swipeable-views';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme, Box, Button, Badge, IconButton, Typography, Tabs, Tab } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useDispatch } from "react-redux";
import { toggleMobileSidebar } from "redux/productSlice";
import Popup from 'components/shared/Popup';
import NavProfilePopup from "components/shared/NavProfilePopup";
import { useDeviceSize } from 'hooks/useDeviceSize';


const style = {
    container: {
        height: '60px',
        backgroundColor: 'bg.secondary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: '0px',
        right: '0px',
        zIndex: 500,
        padding: '0px 20px'
    },
    browseBtn: {
        backgroundColor: 'bg.primary',
        color: 'text.primary',
        textTransform: 'capitalize',
        padding: '7px 20px',
        fontSize: '14px',
        fontWeight: '600',
        borderRadius: '8px',
        '&:hover': {
            backgroundColor: 'bg.primary'
        }
    },
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
    tabItem: {
        width: '100%',
        height: '50px',
        padding: '32px 16px',
        borderBottom: '1px solid rgb(219, 240, 254)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textTransform: 'capitalize',
        borderRadius: '0px',

    },
    tabItemIcon: {
        color: 'bg.azureBlue',
        marginRight: '16px'
    },
    tabItemText: {
        fontSize: '13px',
        fontWeight: 600,
        color: 'text.primary'
    },
    tabItemDate: {
        fontSize: '11px',
        color: 'text.primary',
        lineHeight: 1.75,
        fontWeight: 400,
        textAlign: 'left'
    }
}



const TabPanel = (props)=>{

    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            style = {{ height: '250px', overflow: 'auto' }}
        >
            {value === index && (
            <Box>
                { children }
            </Box>
            )}
        </div>
    );
}

const AdminNavbar = () => {

    const [profilePopup, setProfilePopup] = useState(null);
    const [notificationsPopup, setNotificationsPopup] = useState(null);
    const [tab, setTab] = useState(0);
    const { width } = useDeviceSize();
    const theme = useTheme();
    const dispatch = useDispatch();



    const a11yProps = (index)=>{
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        };
      }
      

    return (
        <Box 
            sx={style.container}
            style={ width>1280 ? { width: 'calc(100% - 280px)', boxShadow: theme.palette.boxShadow.nav } : { width: '100%', boxShadow: theme.palette.boxShadow.nav} }
        >
            <Box>
                {
                    width<=1280 && <IconButton sx={{ color: 'text.light' }} onClick={()=> dispatch(toggleMobileSidebar(true))}>
                        <svg style={{ height: '25px' }} className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-bbh01c" focusable="false" aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.25 5H1.25C0.559766 5 0 4.44141 0 3.75C0 3.05977 0.559766 2.5 1.25 2.5H16.25C16.9414 2.5 17.5 3.05977 17.5 3.75C17.5 4.44141 16.9414 5 16.25 5ZM16.25 17.5H1.25C0.559766 17.5 0 16.9414 0 16.25C0 15.5586 0.559766 15 1.25 15H16.25C16.9414 15 17.5 15.5586 17.5 16.25C17.5 16.9414 16.9414 17.5 16.25 17.5Z" fill="currentColor" className="secondary"></path><path d="M2.5 10C2.5 9.30859 3.05977 8.75 3.75 8.75H18.75C19.4414 8.75 20 9.30859 20 10C20 10.6914 19.4414 11.25 18.75 11.25H3.75C3.05977 11.25 2.5 10.6914 2.5 10Z" fill="currentColor"></path></svg>
                    </IconButton>
                }   
                
                <Link href='/' passHref>
                    <Button 
                        startIcon={<LanguageIcon/>}
                        sx={style.browseBtn}
                        style={ width<=1280 ? { marginLeft: '10px' } : null }
                    >browse website</Button>
                </Link>
            </Box>

            <Box>

                <IconButton
                    onClick={(e)=> setNotificationsPopup(e.currentTarget)}
                    aria-describedby={Boolean(notificationsPopup) ? 'simple-popover' : undefined}
                >
                    <Badge color='primary' variant="dot">
                        <NotificationsIcon sx={{ color: 'text.aliceBlue' }}/>
                    </Badge>
                </IconButton>

                <Popup
                    popup={notificationsPopup}
                    setPopup={setNotificationsPopup}
                >
                    <Box sx={{ height: '300px', width: '300px' }}>
                        <Box sx={{ bgcolor: 'bg.secondary', width: '100%' }}>

                            <Tabs
                                value={tab}
                                onChange={(e, newVal)=> setTab(newVal)}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Unread" {...a11yProps(0)} sx={{ fontSize: '14px', textTransform: 'capitalize', fontWeight: 400 }} />
                                <Tab label="Archived" {...a11yProps(1)} sx={{ fontSize: '14px', textTransform: 'capitalize', fontWeight: 400 }} />
                            </Tabs>

                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={tab}
                                onChangeIndex={(index)=> setTab(index)}
                            >
                                <TabPanel value={tab} index={0} dir={theme.direction}>
                                    <Link href='#' passHref>
                                        <Button sx={style.tabItem}>
                                            <ShoppingCartIcon sx={style.tabItemIcon}/>
                                            <Box>
                                                <Typography variant='body1' sx={style.tabItemText}>
                                                    new order received
                                                </Typography>
                                                <Typography variant='body2' sx={style.tabItemDate}>
                                                    23 days ago
                                                </Typography>
                                            </Box>
                                        </Button>
                                    </Link>
                                    <Link href='#' passHref>
                                        <Button sx={style.tabItem}>
                                            <LocalShippingIcon sx={style.tabItemIcon}/>
                                            <Box>
                                                <Typography variant='body1' sx={style.tabItemText}>
                                                    order delivered successfully
                                                </Typography>
                                                <Typography variant='body2' sx={style.tabItemDate}>
                                                    23 days ago
                                                </Typography>
                                            </Box>
                                        </Button> 
                                    </Link>                     
                                </TabPanel>
                                <TabPanel value={tab} index={1} dir={theme.direction}>
                                    Archived
                                </TabPanel>

                            </SwipeableViews>

                        </Box>
                    </Box>
                </Popup>

                <IconButton 
                    sx={{ height: '40px', width: '40px', ml: 1, padding: '0px' }}
                    onClick={(e)=> setProfilePopup(e.currentTarget)}
                    aria-describedby={Boolean(profilePopup) ? 'simple-popover' : undefined}
                >
                    <Image
                        src='/images/man.svg'
                        alt='profileImage'
                        height='100%' 
                        width='100%'
                        placeholder="blur"
                        blurDataURL="/images/man.svg"
                    />
                </IconButton>

                <NavProfilePopup profilePopup={profilePopup} setProfilePopup={setProfilePopup} fromDashboard={true}/>

            </Box>          
        </Box>
    )
}

export default AdminNavbar;