import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme, Box, Grid, Typography, IconButton } from "@mui/material";
import { useDeviceSize } from 'hooks/useDeviceSize';
import CustomPagination from 'components/shared/CustomPagination';
import UserDashboardSidebar from 'components/shared/UserDashboardSidebar';
import EastIcon from '@mui/icons-material/East';
import PageHeading from 'components/cart/PageHeading';


const style = {
    container: {
        backgroundColor: 'bg.primary',
        paddingTop: '40px',
        width: '100%'
    },
    ordersCards: {
        width: { lg: '1200px', xs: '90%' },
        margin: 'auto',
        overflow: 'auto'
    },
    orderCard: {
        backgroundColor: 'bg.secondary',
        padding: '6px 18px',
        marginTop: '1rem',
        marginBottom: '5px',
        borderRadius: '10px',
        color: 'text.primary'
    },
    orderId: {
        fontSize: '16px',
        fontWeight: 600,
        margin: '6px'
    }
}

const OrderCard = ()=>{

    const { width } = useDeviceSize();
    const theme = useTheme();

    return (
        <Link href='#'>
            <a>
                <Grid 
                    container
                    alignItems='center'
                    justifyContent='space-between'
                    flexWrap='wrap'
                    gap={1.7}
                    sx={style.orderCard}
                    style={{ boxShadow: theme.palette.boxShadow.card }}
                >
                    <Grid item>
                        <Typography 
                            variant='h6'
                            sx={style.orderId}
                        >abcdefghi</Typography>              {/*backend se jo mongodb ki id aaey gi use 9 characters tk trim kr k show krwana ha */}
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{ backgroundColor: 'bg.silver', color: 'text.primary' }}
                            style={theme.statusAndCategoryBtn}
                        >Processing</Box>
                    </Grid>
                    <Grid item>
                        <Typography 
                            variant='body1'
                            fontSize='14px'
                            pl='5px'
                        >Sep 25, 2022</Typography>
                    </Grid>
                    <Grid item>
                        <Typography 
                            variant='body1'
                            fontSize='14px'
                            sx={{ width: '80px', textAlign: 'center'}}
                        >$350.00</Typography>
                    </Grid>
                    {
                        width>=725
                        &&
                        <Grid item>
                            <Link href='#'>
                                <a>
                                    <IconButton>
                                        <EastIcon sx={{ color: 'text.light' }}/>
                                    </IconButton>
                                </a>
                            </Link>
                        </Grid>
                    }
                </Grid>
            </a>
        </Link>
    )
}
const Orders = () => {

    const [page, setPage] = useState(1);
    const router = useRouter();
    const theme = useTheme();

    return (
        <Box sx={style.container}>
            <PageHeading heading='My Orders'/>
            <UserDashboardSidebar/>

            <Box sx={style.ordersCards}>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
            </Box>
            <Box sx={theme.adminTablePaginationContainer}>   
                <CustomPagination 
                    totalCount={3} 
                    page={page} 
                    setPage={setPage} 
                    router={router} 
                />
            </Box>
        </Box>
    )
}

export default Orders;