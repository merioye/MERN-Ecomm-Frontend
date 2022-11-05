import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme, Box, Grid, Typography, IconButton } from "@mui/material";
import { useDeviceSize } from "hooks/useDeviceSize";
import qs from "qs";
import CustomPagination from "components/shared/CustomPagination";
import UserDashboardSidebar from "components/shared/UserDashboardSidebar";
import EastIcon from "@mui/icons-material/East";
import PageHeading from "components/cart/PageHeading";
import ssrRequest from "utils/ssrRequest";
import Currency from "react-currency-formatter";
import { useSelector, useDispatch } from "react-redux";
import { setCustomerOrders } from "redux/orderSlice";

const style = {
    container: {
        backgroundColor: "bg.primary",
        paddingTop: "40px",
        width: "100%",
    },
    ordersCards: {
        width: { lg: "1200px", xs: "90%" },
        margin: "auto",
    },
    orderCard: {
        backgroundColor: "bg.secondary",
        padding: "6px 18px",
        marginTop: "1rem",
        marginBottom: "5px",
        borderRadius: "10px",
        color: "text.primary",
    },
    orderId: {
        fontSize: "16px",
        fontWeight: 600,
        margin: "6px",
    },
    emptyCartImageContainer: {
        position: "relative",
        height: { xs: "150px", m: "300px" },
        width: { xs: "200px", m: "400px" },
    },
};

const OrderCard = ({ order }) => {
    const { width } = useDeviceSize();
    const theme = useTheme();

    const memoizedDate = useMemo(() => {
        const date = new Date(order.createdAt)
            .toDateString()
            .slice(4)
            .split(" ");
        return `${date[1]} ${date[0]}, ${date[2]}`;
    }, []);

    return (
        <Link href={`/orders/${order._id}`}>
            <a>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap={1.7}
                    sx={style.orderCard}
                    style={{ boxShadow: theme.palette.boxShadow.card }}
                >
                    <Grid item>
                        <Typography variant="h6" sx={style.orderId}>
                            {order._id}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{
                                backgroundColor:
                                    order.status === "pending"
                                        ? "#c3ddfd"
                                        : order.status === "processing"
                                        ? "bg.silver"
                                        : order.status === "delivered"
                                        ? "bg.green"
                                        : theme.palette.pink.light,
                                color:
                                    order.status === "pending"
                                        ? "bg.royalBlue"
                                        : order.status === "processing"
                                        ? "text.primary"
                                        : order.status === "delivered"
                                        ? "text.green"
                                        : theme.palette.pink.dark,
                            }}
                            style={theme.statusAndCategoryBtn}
                        >
                            {order.status}
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" fontSize="14px" pl="5px">
                            {memoizedDate}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="body1"
                            fontSize="14px"
                            sx={{ width: "80px", textAlign: "center" }}
                        >
                            <Currency
                                quantity={order.amountToCharge}
                                currency="usd"
                            />
                        </Typography>
                    </Grid>
                    {width >= 725 && (
                        <Grid item>
                            <Link href={`/orders/${order._id}`}>
                                <IconButton>
                                    <EastIcon sx={{ color: "text.light" }} />
                                </IconButton>
                            </Link>
                        </Grid>
                    )}
                </Grid>
            </a>
        </Link>
    );
};
const Orders = ({ orders, totalCount }) => {
    const { status, ordersList } = useSelector(
        (state) => state.order.customerOrders
    );
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();

    const queryOptions = qs.parse(router.asPath.split("?")[1]);

    useEffect(() => {
        dispatch(setCustomerOrders(orders));
    }, []);

    return (
        <Box sx={style.container}>
            <PageHeading heading="My Orders" />
            <UserDashboardSidebar />

            {orders.length ? (
                <>
                    <Box sx={style.ordersCards}>
                        {status
                            ? ordersList.map((order) => {
                                  return (
                                      <OrderCard
                                          key={order._id}
                                          order={order}
                                      />
                                  );
                              })
                            : orders.map((order) => {
                                  return (
                                      <OrderCard
                                          key={order._id}
                                          order={order}
                                      />
                                  );
                              })}
                    </Box>
                    <Box sx={theme.adminTablePaginationContainer}>
                        <CustomPagination
                            totalCount={totalCount}
                            page={page}
                            setPage={setPage}
                            router={router}
                            pageName="orders"
                            search={null}
                            fromAdmin={false}
                            queryOptions={queryOptions}
                        />
                    </Box>
                </>
            ) : (
                <Grid
                    container
                    flexDirection="column"
                    alignItems="center"
                    gap={3}
                    sx={style.ordersCards}
                    style={{ marginTop: "30px", marginBottom: "40px" }}
                >
                    <Grid item>
                        <Box sx={style.emptyCartImageContainer}>
                            <Image
                                src="/images/empty-cart.png"
                                alt="emptyCartImage"
                                layout="fill"
                                placeholder="blur"
                                blurDataURL="/images/empty-cart.png"
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: "20px",
                                color: "text.primary",
                                fontWeight: 600,
                            }}
                        >
                            Your Orders list is empty ):
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default Orders;

export async function getServerSideProps({ req, res, query }) {
    let options = { ...query };
    if (!options.page) options.page = 1;

    const queryString = qs.stringify(options);

    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/orders?${queryString}`;
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
            orders: data.orders,
            totalCount: data.totalCount,
        },
    };
}
