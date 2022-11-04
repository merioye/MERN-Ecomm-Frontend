import {
    useTheme,
    Box,
    Typography,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { useSelector } from "react-redux";
import AdminSearchBox from "components/shared/AdminSearchBox";
import ReviewListItem from "components/admin/ReviewListItem";
import CustomPagination from "components/shared/CustomPagination";
import debounce from "utils/debounce";
import withPageInfo from "hocs/withPageInfo";

const ReviewList = ({
    data,
    totalCount,
    page,
    setPage,
    router,
    search,
    appendSearchQuery,
}) => {
    const { reviews } = useSelector((state) => state.product);
    const theme = useTheme();

    return (
        <Box sx={theme.adminTableMainContainer}>
            <Grid
                container
                gap="16px"
                justifyContent="space-between"
                alignItems="center"
                mb="16px"
            >
                <Grid item>
                    <Typography
                        variant="h3"
                        sx={theme.adminTableCaption}
                        style={{ marginBottom: "0px" }}
                    >
                        Product Reviews
                    </Typography>
                </Grid>
                <Grid item sx={theme.adminSearchBoxContainer}>
                    <AdminSearchBox
                        placeholder="Search Product..."
                        handleSearch={debounce(appendSearchQuery, 500)}
                    />
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
                                <TableCell sx={theme.adminTableColumnHeading}>
                                    Name
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    Customer
                                </TableCell>
                                <TableCell sx={theme.adminTableColumnHeading}>
                                    Comment
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={theme.adminTableColumnHeading}
                                >
                                    Rating
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
                            {reviews.status
                                ? reviews.reviewsList.length
                                    ? reviews.reviewsList.map((review) => (
                                          <ReviewListItem
                                              review={review}
                                              key={review._id}
                                          />
                                      ))
                                    : null
                                : data.length
                                ? data.map((review) => (
                                      <ReviewListItem
                                          review={review}
                                          key={review._id}
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
                        pageName="reviews"
                        search={search}
                        fromAdmin={true}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default withPageInfo(ReviewList);
