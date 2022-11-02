import { useTheme, Grid, Typography, Box } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

const style = {
    container: {
        borderRadius: "8px",
        padding: "16px",
        color: "text.primary",
        backgroundColor: "bg.secondary",
    },
    iconContainer: {
        marginRight: "1rem",
        width: "3.2rem",
        height: "3.2rem",
        borderRadius: "50%",
        padding: "0.75rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: "14px",
        color: "text.primary",
    },
    amount: {
        color: "text.primary",
        fontSize: "24px",
        fontWeight: 600,
    },
};
const DashboardOrderStatusCount = ({
    iconBgColor,
    iconTextColor,
    title,
    amount,
}) => {
    const theme = useTheme();

    return (
        <Grid item xs={3}>
            <Box
                sx={style.container}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <Grid container alignItems="center">
                    <Grid
                        item
                        sx={{
                            ...style.iconContainer,
                            backgroundColor: iconBgColor,
                            color: iconTextColor,
                        }}
                    >
                        {title === "Total Orders" && (
                            <ShoppingCartOutlinedIcon />
                        )}
                        {title === "Orders Pending" && <CachedOutlinedIcon />}
                        {title === "Orders Processing" && (
                            <LocalShippingOutlinedIcon />
                        )}
                        {title === "Orders Delivered" && (
                            <TaskAltOutlinedIcon />
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" sx={style.title}>
                            {title}
                        </Typography>
                        <Typography variant="h6" sx={style.amount}>
                            {amount}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
};

export default DashboardOrderStatusCount;
