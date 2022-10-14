import { useState } from "react";
import Image from 'next/image';
import { useTheme, Box, Typography, Grid, Divider } from "@mui/material";
import PageHeading from "components/cart/PageHeading";
import UserDashboardSidebar from "components/shared/UserDashboardSidebar";
import CheckIcon from '@mui/icons-material/Check';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


const style = {
    container: {
        padding: '40px 0px',
        width: '100%'
    },
    statusCard: {
        width: { lg: '1200px', xs: '90%' },
        margin: 'auto',
        backgroundColor: 'bg.secondary',
        borderRadius: '8px',
        padding: '2rem 1.5rem',
        marginBottom: '30px',
        marginTop: '1rem'
    },
    statusItems: {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '2rem 0px'
    },
    statusItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        borderRadius: '50%',
        width: '64px',
        height: '64px',
        backgroundColor: 'rgb(227, 233, 239)'
    },
    statusItemIcon: {
        height: '1em', 
        width: '1em', 
        fontSize: '32px', 
        color: '#4E97FD'
    },
    statusItemCompletedIcon: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        backgroundColor: 'rgb(227, 233, 239)',
        height: '22px',
        width: '22px',
        borderRadius: '50%',
        color: 'text.green'
    },
    statusItemLine: {
        height: { xs: '50px', md: '4px' },
        minWidth: { xs: '4px', md: '50px' },
        flex: { xs: 'unset', md: '1 1 0px' },
        backgroundColor: 'rgb(227, 233, 239)'
    },
    expectedDelivery: {
        fontSize: '14px',
        fontWeight: 400,
        padding: '0.5rem 1rem',
        textAlign: 'center',
        borderRadius: '300px',
        // color: 'bg.azureBlue',
        // backgroundColor: '#c3ddfd'
        color: 'pink.dark',
        backgroundColor: 'pink.light'
    },
    orderedItems: {
        width: { lg: '1200px', xs: '90%' },
        margin: 'auto',
        backgroundColor: 'bg.secondary',
        borderRadius: '8px',
        marginBottom: '30px'
    },
    ordersHeading: {
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '12px',
        backgroundColor: 'bg.aliceBlue'
    },
    ordersHeadingItem: {
        display: 'flex',
        alignItems: 'center',
        flex: '1 1 0px',
        margin: '6px',
        whiteSpace: 'pre'
    },
    simpleText: {
        color: 'text.primary',
        fontSize: '14px',
        fontWeight: 400,
    },
    orderedItem: {
        display: 'flex',
        alignItems: 'center',
        flex: '2 2 260px',
        padding: '8px 16px',
        margin: '6px'
    },
    orderedItemImageContainer: {
        position: 'relative',
        borderRadius: '50%',
        overflow: 'hidden',
        height: '64px',
        width: '64px'
    },
    addressAndAmountCard: {
        backgroundColor: 'bg.secondary',
        borderRadius: '8px',
        padding: '20px 30px'
    }
}
const OrderDetails = () => {

    const [status, setStatus] = useState('processing');
    const theme = useTheme();

    return (
        <Box sx={style.container}>
            <PageHeading heading='Order Details'/>
            <UserDashboardSidebar/>
            <Box 
                sx={style.statusCard}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <Box sx={style.statusItems}>
                    <Box sx={{ position: 'relative' }}>
                        <Box 
                            sx={style.statusItem}
                            style={status==='pending' || status==='processing' || status==='delivered' ? { backgroundColor: theme.palette.bg.azureBlue } : null}
                        >
                            <CachedOutlinedIcon 
                                sx={style.statusItemIcon}
                                style={status==='pending' || status==='processing' || status==='delivered' ? { color: 'rgb(246, 249, 252)' } : null}
                            />
                        </Box>
                        {
                            (status==='pending' || status==='processing' || status==='delivered')
                            &&
                            <Box sx={style.statusItemCompletedIcon}>
                                <CheckIcon sx={{ fontSize: '1rem' }}/>
                            </Box>
                        }
                    </Box>
                    <Box 
                        sx={style.statusItemLine}
                        style={status==='processing' || status==='delivered' ? { backgroundColor: theme.palette.bg.azureBlue } : null}
                    ></Box>
                    <Box sx={{ position: 'relative' }}>
                        <Box 
                            sx={style.statusItem}
                            style={status==='processing' || status==='delivered' ? { backgroundColor: theme.palette.bg.azureBlue } : null}
                        >
                            <svg style={status==='processing' || status==='delivered' ? { ...style.statusItemIcon, color: 'rgb(246, 249, 252)' } : style.statusItemIcon} className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1jvxg3n" focusable="false" aria-hidden="true" viewBox="0 0 32 32"><path fill='currentColor' d="M7.40692 11.3465L20.5779 4.304L16.0004 2L2.41992 8.836L7.40692 11.3465Z"></path><path fill='currentColor' d="M24.5773 6.3175L11.4062 13.36L15.9998 15.6725L29.5803 8.83601L24.5773 6.3175Z"></path><path fill='currentColor' d="M15.625 16.3275L11 13.9995V19.1145L9 17.101H7V11.986L2 9.46948V23.1415L15.625 30V16.3275Z"></path><path fill='currentColor' d="M16.375 16.3275V30L30 23.1415V9.46948L16.375 16.3275Z"></path></svg>
                        </Box>
                        {
                            (status==='processing' || status==='delivered')
                            &&
                            <Box sx={style.statusItemCompletedIcon}>
                                <CheckIcon sx={{ fontSize: '1rem' }}/>
                            </Box>
                        }
                    </Box>
                    <Box 
                        sx={style.statusItemLine}
                        style={status==='delivered' ? { backgroundColor: theme.palette.bg.azureBlue } : null}
                    ></Box>
                    <Box sx={{ position: 'relative' }}>
                        <Box 
                            sx={style.statusItem}
                            style={status==='delivered' ? { backgroundColor: theme.palette.bg.azureBlue } : null}
                        >
                            <LocalShippingIcon 
                                sx={style.statusItemIcon}
                                style={status==='delivered' ? { color: 'rgb(246, 249, 252)' } : null}
                            />
                        </Box>
                        {
                            (status==='delivered')
                            &&
                            <Box sx={style.statusItemCompletedIcon}>
                                <CheckIcon sx={{ fontSize: '1rem' }}/>
                            </Box>
                        }
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Typography variant='body1' sx={style.expectedDelivery}
                    >Estimated Delivery Date <b>4th October</b></Typography>
                </Box>
            </Box>

            <Box 
                sx={style.orderedItems}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <Box sx={style.ordersHeading}>
                    <Box sx={style.ordersHeadingItem}>
                        <Typography variant='body1' sx={{ ...style.simpleText, color: 'text.light', mr: '4px' }}>Order ID:</Typography>
                        <Typography variant='body1' sx={style.simpleText}>87654321345678976543322</Typography>
                    </Box>
                    <Box sx={style.ordersHeadingItem}>
                        <Typography variant='body1' sx={{ ...style.simpleText, color: 'text.light', mr: '4px' }}>Placed On:</Typography>
                        <Typography variant='body1' sx={style.simpleText}>27 September, 2022</Typography>
                    </Box>
                    <Box sx={style.ordersHeadingItem}>
                        <Typography variant='body1' sx={{ ...style.simpleText, color: 'text.light', mr: '4px' }}>Delivered On:</Typography>
                        <Typography variant='body1' sx={style.simpleText}>4th October, 2022</Typography>
                    </Box>
                </Box>
                <Box sx={{ p: '8px 0px' }}>
                    <Box sx={style.orderedItem}>
                        <Box sx={style.orderedItemImageContainer}>
                            <Image
                                src='/images/oppo-reno-6-a.jpg'
                                alt='productImage'
                                layout='fill'
                                placeholder="blur"
                                blurDataURL="/images/oppo-reno-6-a.jpg"
                            />
                        </Box>
                        <Box sx={{ ml: '20px' }}>
                            <Typography variant='h6' sx={{ ...style.simpleText, fontWeight: 600, lineHeight: 1.5 }}>Oppo Reno 6</Typography>
                            <Typography variant='body1' sx={{ ...style.simpleText, color: 'text.light' }}>$250 x 1</Typography>
                        </Box>
                    </Box>
                    <Box sx={style.orderedItem}>
                        <Box sx={style.orderedItemImageContainer}>
                            <Image
                                src='/images/oppo-reno-6-a.jpg'
                                alt='productImage'
                                layout='fill'
                                placeholder="blur"
                                blurDataURL="/images/oppo-reno-6-a.jpg"
                            />
                        </Box>
                        <Box sx={{ ml: '20px' }}>
                            <Typography variant='h6' sx={{ ...style.simpleText, fontWeight: 600, lineHeight: 1.5 }}>Oppo Reno 6</Typography>
                            <Typography variant='body1' sx={{ ...style.simpleText, color: 'text.light' }}>$250 x 1</Typography>
                        </Box>
                    </Box>
                    <Box sx={style.orderedItem}>
                        <Box sx={style.orderedItemImageContainer}>
                            <Image
                                src='/images/oppo-reno-6-a.jpg'
                                alt='productImage'
                                layout='fill'
                                placeholder="blur"
                                blurDataURL="/images/oppo-reno-6-a.jpg"
                            />
                        </Box>
                        <Box sx={{ ml: '20px' }}>
                            <Typography variant='h6' sx={{ ...style.simpleText, fontWeight: 600, lineHeight: 1.5 }}>Oppo Reno 6</Typography>
                            <Typography variant='body1' sx={{ ...style.simpleText, color: 'text.light' }}>$250 x 1</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Grid 
                container
                gap={3}
                justifyContent='space-between'
                sx={{ width: { lg: '1200px', xs: '90%' }, margin: 'auto' }}
            >
                <Grid item xm={5.8} xs={12}>
                    <Box 
                        sx={style.addressAndAmountCard}
                        style={{ boxShadow: theme.palette.boxShadow.card }}
                    >
                        <Typography variant='h5' sx={{ ...style.simpleText, fontSize: '16px', fontWeight: 600, mb: '16px' }}>Shipping Address</Typography>
                        <Typography variant='body1' sx={style.simpleText}>Near jamia masjid sadar gogera, okara</Typography>
                    </Box>
                </Grid>
                <Grid item xm={5.8} xs={12}>
                    <Box
                        sx={style.addressAndAmountCard}
                        style={{ boxShadow: theme.palette.boxShadow.card }}
                    >
                        <Typography variant='h5' sx={{ ...style.simpleText, fontSize: '16px', fontWeight: 600, mb: '16px' }}>Total Summary</Typography>
                        <Grid 
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            mb='8px'
                        >
                            <Grid item>
                                <Typography variant='body1' sx={{ ...style.simpleText, color: 'text.light' }}>Subtotal:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h3' sx={{ ...style.simpleText, fontWeight: 600 }}>$335</Typography>
                            </Grid>
                        </Grid>
                        <Grid 
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            mb='8px'
                        >
                            <Grid item>
                                <Typography variant='body1' sx={{ ...style.simpleText, color: 'text.light' }}>Shipping fee:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h3' sx={{ ...style.simpleText, fontWeight: 600 }}>$10</Typography>
                            </Grid>
                        </Grid>
                        <Grid 
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            mb='8px'
                        >
                            <Grid item>
                                <Typography variant='body1' sx={{ ...style.simpleText, color: 'text.light' }}>Discount:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h3' sx={{ ...style.simpleText, fontWeight: 600 }}>-$30</Typography>
                            </Grid>
                        </Grid>

                        <Divider light sx={{ marginBottom: '8px'}}/>
                        <Grid 
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            mb='16px'
                        >
                            <Grid item>
                                <Typography variant='body1' sx={{ ...style.simpleText, fontWeight: 600 }}>Total</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h3' sx={{ ...style.simpleText, fontWeight: 600 }}>$315</Typography>
                            </Grid>
                        </Grid>
                        <Typography variant='body1' sx={style.simpleText}>Paid by Credit/Debit Card</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OrderDetails;