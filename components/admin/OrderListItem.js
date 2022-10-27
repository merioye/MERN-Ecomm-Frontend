import { useMemo } from "react";
import { useTheme, TableRow, TableCell, Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";
import Currency from "react-currency-formatter";

const OrderListItem = ({ order }) => {
    const router = useRouter();
    const theme = useTheme();

    const totalQuantity = useMemo(() => {
        return order.items.reduce((acc, item) => acc + item.quantity, 0);
    }, []);
    return (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell
                sx={theme.adminTableCellText}
                style={{ minWidth: "300px" }}
            >
                {order._id}
            </TableCell>
            <TableCell align="center" sx={theme.adminTableCellText}>
                {totalQuantity}
            </TableCell>
            <TableCell
                align="center"
                sx={theme.adminTableCellText}
                style={{ minWidth: "170px" }}
            >
                {order.user.name}
            </TableCell>
            <TableCell align="center" sx={theme.adminTableCellText}>
                <Currency quantity={order.amountToCharge} currency="usd" />
            </TableCell>
            <TableCell align="center">
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
            </TableCell>
            <TableCell align="center" width="100px">
                <IconButton
                    sx={theme.actionBtn}
                    onClick={() => router.push(`/admin/orders/${order._id}`)}
                >
                    <VisibilityIcon sx={theme.actionBtnIcon} />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default OrderListItem;
