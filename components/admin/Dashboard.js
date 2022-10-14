import { useTheme, Box, Typography, Grid } from '@mui/material';
import DashboardOrderAmount from 'components/admin/DashboardOrderAmount';
import DashboardOrderStatusCount from 'components/admin/DashboardOrderStatusCount';
import Charts from 'components/admin/Charts';
import ProductList from 'components/admin/ProductList';
import OrderList from 'components/admin/OrderList';



const Dashboard = ( ) => {

    const theme = useTheme();


    return (
        <Box sx={theme.adminTableMainContainer}>

            <Typography variant="h3" sx={theme.adminTableCaption} style={{ marginBottom: '30px' }}>
                Dashboard Overview
            </Typography>

            <Grid container spacing={2} mb={4}>
                <DashboardOrderAmount
                    bgColor='pink.dark'
                    title="Today's Orders"
                    amount='$200'
                />
                <DashboardOrderAmount
                    bgColor='bg.blue'
                    title="This Month"
                    amount='$5000'
                />
                <DashboardOrderAmount
                    bgColor='#0e9f6e'
                    title="Total Orders"
                    amount='$95000'
                />
            </Grid>

            <Grid container spacing={2} mb={4}>
                <DashboardOrderStatusCount
                    iconBgColor='#fcd9bd'
                    iconTextColor='pink.dark'
                    title='Total Orders'
                    amount={186}
                />
                <DashboardOrderStatusCount
                    iconBgColor='#c3ddfd'
                    iconTextColor='bg.blue'
                    title='Orders Pending'
                    amount={38}
                />
                <DashboardOrderStatusCount
                    iconBgColor='bg.silver'
                    iconTextColor='text.primary'
                    title='Orders Processing'
                    amount={65}
                />
                <DashboardOrderStatusCount
                    iconBgColor='bg.green'
                    iconTextColor='#0e9f6e'
                    title='Orders Delivered'
                    amount={67}
                />
            </Grid>

            <Charts/>

            <ProductList fromDashboard={true} heading='Stock Out Products'/>

            <OrderList fromDashboard={true} heading='Recent Orders'/>

        </Box>
    )
}

export default Dashboard;