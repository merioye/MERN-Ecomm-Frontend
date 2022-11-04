import Image from "next/image";
import { useTheme, Box, Grid, Typography } from "@mui/material";
import PageHeading from "components/cart/PageHeading";
import UserDashboardSidebar from "components/shared/UserDashboardSidebar";
import ssrRequest from "utils/ssrRequest";

const style = {
    container: {
        padding: "40px 0px",
        width: "100%",
    },
    userInfo1Container: {
        width: { lg: "1200px", xs: "90%" },
        margin: "auto",
        marginTop: "24px",
        marginBottom: "24px",
    },
    userStatusCard: {
        backgroundColor: "bg.secondary",
        color: "text.primary",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        padding: "14px 32px",
    },
    profileImageContainer: {
        position: "relative",
        borderRadius: "50%",
        overflow: "hidden",
        height: "64px",
        width: "64px",
    },
    lightText: {
        fontSize: "12px",
        color: "text.light",
        fontWeight: 400,
    },
    darkText: {
        fontSize: "14px",
        color: "text.primary",
        fontWeight: 400,
    },
    orderInfoCard: {
        backgroundColor: "bg.secondary",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem 1.25rem",
    },
    orderInfoCardCount: {
        color: "bg.azureBlue",
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: 1.5,
    },
    userInfo2Container: {
        width: { lg: "1200px", xs: "90%" },
        margin: "auto",
        backgroundColor: "bg.secondary",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        flexWrap: "wrap",
        alignItems: { xs: "flex-start", md: "center" },
        borderRadius: "8px",
        padding: "0.75rem 1.5rem",
    },
    userAttribute: {
        display: "flex",
        flexDirection: "column",
        flex: "1 1 0px",
        padding: "8px",
    },
};
const Profile = ({
    user,
    totalOrdersCount,
    awaitingPaymentCount,
    deliveredCount,
    awaitingDeliveryCount,
}) => {
    const theme = useTheme();

    return (
        <Box sx={style.container}>
            <PageHeading heading="My Profile" />
            <UserDashboardSidebar />
            <Grid
                container
                gap={3}
                flexDirection="column"
                sx={style.userInfo1Container}
            >
                <Grid item xs={12}>
                    <Box
                        sx={style.userStatusCard}
                        style={{ boxShadow: theme.palette.boxShadow.card }}
                    >
                        <Box sx={style.profileImageContainer}>
                            <Image
                                src={
                                    user.avatar
                                        ? user.avatar
                                        : "/images/man.svg"
                                }
                                alt="profileImage"
                                layout="fill"
                                placeholder="blur"
                                blurDataURL={
                                    user.avatar
                                        ? user.avatar
                                        : "/images/man.svg"
                                }
                            />
                        </Box>
                        <Box sx={{ flex: "1 1 0px", ml: "12px" }}>
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        ...style.darkText,
                                        fontSize: "16px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...style.lightText,
                                        fontSize: "14px",
                                        letterSpacing: "0.2em",
                                    }}
                                >
                                    SILVER USER
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" gap={3}>
                        <Grid item xs={5.5} lg={2.8}>
                            <Box
                                sx={style.orderInfoCard}
                                style={{
                                    boxShadow: theme.palette.boxShadow.card,
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={style.orderInfoCardCount}
                                >
                                    {totalOrdersCount < 10
                                        ? `0${totalOrdersCount}`
                                        : totalOrdersCount}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        ...style.lightText,
                                        textAlign: "center",
                                    }}
                                >
                                    All Orders
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={5.5} lg={2.8}>
                            <Box
                                sx={style.orderInfoCard}
                                style={{
                                    boxShadow: theme.palette.boxShadow.card,
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={style.orderInfoCardCount}
                                >
                                    {awaitingPaymentCount < 10
                                        ? `0${awaitingPaymentCount}`
                                        : awaitingPaymentCount}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        ...style.lightText,
                                        textAlign: "center",
                                    }}
                                >
                                    Awaiting Payments
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={5.5} lg={2.8}>
                            <Box
                                sx={style.orderInfoCard}
                                style={{
                                    boxShadow: theme.palette.boxShadow.card,
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={style.orderInfoCardCount}
                                >
                                    {deliveredCount < 10
                                        ? `0${deliveredCount}`
                                        : deliveredCount}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        ...style.lightText,
                                        textAlign: "center",
                                    }}
                                >
                                    Already Delivered
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={5.5} lg={2.8}>
                            <Box
                                sx={style.orderInfoCard}
                                style={{
                                    boxShadow: theme.palette.boxShadow.card,
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={style.orderInfoCardCount}
                                >
                                    {awaitingDeliveryCount < 10
                                        ? `0${awaitingDeliveryCount}`
                                        : awaitingDeliveryCount}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        ...style.lightText,
                                        textAlign: "center",
                                    }}
                                >
                                    Awaiting Delivery
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box
                sx={style.userInfo2Container}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <Box sx={style.userAttribute}>
                    <Typography
                        variant="body2"
                        sx={{ ...style.lightText, mb: "4px" }}
                    >
                        Full Name
                    </Typography>
                    <Typography variant="body1" sx={style.darkText}>
                        {user.name}
                    </Typography>
                </Box>
                <Box sx={style.userAttribute}>
                    <Typography
                        variant="body2"
                        sx={{ ...style.lightText, mb: "4px" }}
                    >
                        Email
                    </Typography>
                    <Typography variant="body1" sx={style.darkText}>
                        {user.email}
                    </Typography>
                </Box>
                <Box sx={style.userAttribute}>
                    <Typography
                        variant="body2"
                        sx={{ ...style.lightText, mb: "4px" }}
                    >
                        Phone
                    </Typography>
                    <Typography variant="body1" sx={style.darkText}>
                        {user.phone}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;

export const getServerSideProps = async ({ req, res }) => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/profiles/profile`;
    const [error, data] = await ssrRequest(req, res, url);
    if (!data) {
        return {
            redirect: {
                statusCode: 307,
                destination: "/",
            },
        };
    }
    return {
        props: {
            user: data.user,
            totalOrdersCount: data.totalOrdersCount,
            awaitingPaymentCount: data.awaitingPaymentCount,
            deliveredCount: data.deliveredCount,
            awaitingDeliveryCount: data.awaitingDeliveryCount,
        },
    };
};
