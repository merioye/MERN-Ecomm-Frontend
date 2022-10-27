import { useTheme, Box, Typography, Grid } from "@mui/material";
import DashboardOrderAmount from "components/admin/DashboardOrderAmount";
import DashboardOrderStatusCount from "components/admin/DashboardOrderStatusCount";
import Charts from "components/admin/Charts";

const Dashboard = ({ data }) => {
    const {
        todayOrdersAmount,
        monthOrdersAmount,
        totalOrdersAmount,
        totalOrdersCount,
        pendingOrdersCount,
        processingOrdersCount,
        deliveredOrdersCount,
        sales,
        topRevenueProducts,
    } = data;
    const theme = useTheme();

    return (
        <Box sx={theme.adminTableMainContainer}>
            <Typography
                variant="h3"
                sx={theme.adminTableCaption}
                style={{ marginBottom: "30px" }}
            >
                Dashboard Overview
            </Typography>

            <Grid container spacing={2} mb={4}>
                <DashboardOrderAmount
                    bgColor="pink.dark"
                    title="Today's Orders"
                    amount={todayOrdersAmount}
                />
                <DashboardOrderAmount
                    bgColor="bg.blue"
                    title="This Month"
                    amount={monthOrdersAmount}
                />
                <DashboardOrderAmount
                    bgColor="#0e9f6e"
                    title="Total Orders"
                    amount={totalOrdersAmount}
                />
            </Grid>

            <Grid container spacing={2} mb={4}>
                <DashboardOrderStatusCount
                    iconBgColor="#fcd9bd"
                    iconTextColor="pink.dark"
                    title="Total Orders"
                    amount={totalOrdersCount}
                />
                <DashboardOrderStatusCount
                    iconBgColor="#c3ddfd"
                    iconTextColor="bg.blue"
                    title="Orders Pending"
                    amount={pendingOrdersCount}
                />
                <DashboardOrderStatusCount
                    iconBgColor="bg.silver"
                    iconTextColor="text.primary"
                    title="Orders Processing"
                    amount={processingOrdersCount}
                />
                <DashboardOrderStatusCount
                    iconBgColor="bg.green"
                    iconTextColor="#0e9f6e"
                    title="Orders Delivered"
                    amount={deliveredOrdersCount}
                />
            </Grid>

            <Charts sales={sales} topRevenueProducts={topRevenueProducts} />
        </Box>
    );
};

export default Dashboard;
