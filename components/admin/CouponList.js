import {
    useTheme,
    Box,
    Typography,
    Grid,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import AdminSearchBox from "components/shared/AdminSearchBox";
import CouponListItem from "components/admin/CouponListItem";
import CustomPagination from "components/shared/CustomPagination";
import debounce from "utils/debounce";
import withPageInfo from "hocs/withPageInfo";

const CouponList = ({
    data,
    totalCount,
    page,
    setPage,
    router,
    pageName,
    search,
    appendSearchQuery,
}) => {
    const { coupons } = useSelector((state) => state.product);
    const theme = useTheme();

    return (
        <Box sx={theme.adminTableMainContainer}>
            <Typography variant="h3" sx={theme.adminTableCaption}>
                Coupon List
            </Typography>

            <Grid container gap="16px" justifyContent="space-between" mb="16px">
                <Grid item sx={theme.adminSearchBoxContainer}>
                    <AdminSearchBox
                        placeholder="Search Coupon..."
                        handleSearch={debounce(appendSearchQuery, 500)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        startIcon={<AddIcon />}
                        sx={theme.containedBtn}
                        style={theme.btnPx16}
                        onClick={() => router.push("/admin/coupons/create")}
                    >
                        add coupon
                    </Button>
                </Grid>
            </Grid>

            <Box
                sx={theme.adminTableContainer}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "bg.aliceBlue" }}>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    Start Date
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    End Date
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    Campaigns Name
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    Code
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    Percentage
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
                            {coupons.status
                                ? coupons.couponsList.length
                                    ? coupons.couponsList.map((coupon) => (
                                          <CouponListItem
                                              key={coupon._id}
                                              coupon={coupon}
                                          />
                                      ))
                                    : null
                                : data.length
                                ? data.map((coupon) => (
                                      <CouponListItem
                                          key={coupon._id}
                                          coupon={coupon}
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

export default withPageInfo(CouponList);
