import { useSelector } from "react-redux";
import {
    useTheme,
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import OrderListItem from "components/admin/OrderListItem";
import CustomPagination from "components/shared/CustomPagination";
import withPageInfo from "hocs/withPageInfo";

const OrderList = ({
    heading,
    data,
    totalCount,
    page,
    setPage,
    router,
    pageName,
    search,
}) => {
    const { orders } = useSelector((state) => state.order);
    const theme = useTheme();

    return (
        <Box sx={theme.adminTableMainContainer}>
            <Typography
                variant="h3"
                sx={theme.adminTableCaption}
                style={{ marginBottom: "26px" }}
            >
                {heading}
            </Typography>

            <Box
                sx={theme.adminTableContainer}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "bg.aliceBlue" }}>
                                <TableCell sx={theme.adminTableColumnHeading}>
                                    Order ID
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    Qty
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    Customer
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    Amount
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.status
                                ? orders.ordersList.length
                                    ? orders.ordersList.map((order) => (
                                          <OrderListItem
                                              key={order._id}
                                              order={order}
                                          />
                                      ))
                                    : null
                                : data.length
                                ? data.map((order) => (
                                      <OrderListItem
                                          key={order._id}
                                          order={order}
                                      />
                                  ))
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={theme.adminTablePaginationContainer}>
                    <CustomPagination
                        totalCount={totalCount}
                        page={page}
                        setPage={setPage}
                        router={router}
                        pageName={pageName}
                        search={search}
                        fromAdmin={true}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default withPageInfo(OrderList);
