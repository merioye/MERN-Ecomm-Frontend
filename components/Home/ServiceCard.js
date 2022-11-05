import { useTheme, Box, Typography, Grid } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import PaidIcon from "@mui/icons-material/Paid";
import GppGoodIcon from "@mui/icons-material/GppGood";

const style = {
    container: {
        padding: "16px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "bg.secondary",
        minWidth: "250px",
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
    heading: {
        fontSize: "16px",
        color: "text.primary",
        fontWeight: 700,
        lineHeight: 1.5,
    },
    body: {
        fontSize: "14px",
        color: "text.light",
    },
};
const ServiceCard = ({ columns, iconBgColor, iconTextColor, title, body }) => {
    const theme = useTheme();

    return (
        <Grid
            item
            xs={columns}
            sx={style.container}
            style={{ boxShadow: theme.palette.boxShadow.card }}
        >
            <Box
                sx={{
                    ...style.iconContainer,
                    backgroundColor: iconBgColor,
                    color: iconTextColor,
                }}
            >
                {title === "Fast Delivery" && (
                    <LocalShippingOutlinedIcon sx={{ fontSize: "30px" }} />
                )}
                {title === "Money Guarantee" && (
                    <PaidIcon sx={{ fontSize: "35px" }} />
                )}
                {title === "365 days" && (
                    <TimelapseIcon sx={{ fontSize: "35px" }} />
                )}
                {title === "Payment" && (
                    <GppGoodIcon sx={{ fontSize: "35px" }} />
                )}
            </Box>
            <Box>
                <Typography variant="h4" sx={style.heading}>
                    {" "}
                    {title}{" "}
                </Typography>
                <Typography variant="body1" sx={style.body}>
                    {" "}
                    {body}{" "}
                </Typography>
            </Box>
        </Grid>
    );
};

export default ServiceCard;
