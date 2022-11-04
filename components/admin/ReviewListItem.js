import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "redux/productSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import {
    useTheme,
    TableRow,
    TableCell,
    Box,
    Typography,
    Rating,
    IconButton,
    CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ReviewListItem = ({ review }) => {
    const [showDeleteLoader, setShowDeleteLoader] = useState(false);
    const router = useRouter();
    const { page: pageCount } = router.query;
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleDelete = () => {
        setShowDeleteLoader(true);
        dispatch(
            deleteReview(review._id, setShowDeleteLoader, pageCount, router)
        );
    };
    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": {
                    border: 0,
                },
            }}
        >
            <TableCell sx={theme.adminTableBodyFirstCell}>
                <Box sx={theme.adminTableImageContainer}>
                    <Image
                        src={review.product.images[0].imageUrl}
                        alt="productImage"
                        height="100%"
                        width="100%"
                        placeholder="blur"
                        blurDataURL={review.product.images[0].imageUrl}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        sx={theme.adminTableCellText}
                        style={{
                            lineHeight: 1.75,
                            fontWeight: 600,
                        }}
                    >
                        {review.product.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.light",
                            fontSize: "12px",
                            fontWeight: 600,
                        }}
                    >
                        {review._id}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell
                align="center"
                sx={theme.adminTableCellText}
                style={{ minWidth: "150px" }}
            >
                {review.reviewAuthor.name}
            </TableCell>
            <TableCell
                sx={{
                    color: "text.primary",
                    fontSize: "12px",
                    fontWeight: 600,
                    minWidth: "300px",
                }}
            >
                <q>{review.text}</q>
            </TableCell>
            <TableCell align="center">
                <Rating precision={0.5} value={review.rating} readOnly />
            </TableCell>
            <TableCell align="center">
                {showDeleteLoader ? (
                    <CircularProgress
                        size={23}
                        sx={{ color: theme.palette.bg.azureBlue, mt: 1 }}
                    />
                ) : (
                    <IconButton sx={theme.actionBtn} onClick={handleDelete}>
                        <DeleteIcon sx={theme.actionBtnIcon} />
                    </IconButton>
                )}
            </TableCell>
        </TableRow>
    );
};

export default ReviewListItem;
