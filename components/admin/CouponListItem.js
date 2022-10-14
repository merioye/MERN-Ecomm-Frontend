import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteCoupon } from "redux/productSlice";
import { useTheme, TableRow, TableCell, Box, Stack, IconButton, CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const CouponListItem = ( { coupon } ) => {

    const [showDeleteLoader, setShowDeleteLoader] = useState(false);
    const router = useRouter();
    const { page: pageCount } = router.query;
    const dispatch = useDispatch();
    const theme = useTheme();


    const handleDelete = ()=>{ 
        setShowDeleteLoader(true);
        dispatch(deleteCoupon(coupon._id, setShowDeleteLoader, pageCount, router));
    }

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >   
            <TableCell 
                align='center'
                sx={theme.adminTableCellText}
                style={{ minWidth: '120px' }}
            >{new Date(coupon.createdAt).toDateString().slice(4)}</TableCell>
            <TableCell 
                align='center'
                sx={theme.adminTableCellText}
                style={{ minWidth: '120px' }}
            >{new Date(coupon.validity).toDateString().slice(4)}</TableCell>
            <TableCell 
                align='center'
                sx={theme.adminTableCellText}
                style={{ minWidth: '200px' }}
            >{coupon.name}</TableCell>
            <TableCell 
                align='center'
                sx={theme.adminTableCellText}
                style={{ minWidth: '140px' }}
            >{coupon.couponCode}</TableCell>
            <TableCell 
                align='center'
                sx={theme.adminTableCellText}
            >{coupon.discountPercentage}%</TableCell>
            <TableCell 
                align='center'
                sx={theme.adminTableCellText}
            >
                <Box   
                    sx={new Date(coupon.createdAt).getTime() >= new Date(coupon.validity).getTime() ? { backgroundColor: 'pink.light', color: 'pink.dark' } : { backgroundColor: 'bg.green', color: 'text.green' }}
                    style={theme.statusAndCategoryBtn}
                >
                    {
                        new Date(coupon.createdAt).getTime() >= new Date(coupon.validity).getTime()
                        ?
                        <>expired</>
                        :
                        <>valid</>
                    }
                </Box>
            </TableCell>
            <TableCell align='center' width='100px'>
                <Stack direction='row'>
                    <IconButton 
                        sx={theme.actionBtn}
                        onClick={()=>router.push(`/admin/coupons/${coupon._id}?page=${pageCount ? pageCount : 1}`)}
                    >
                        <EditIcon sx={theme.actionBtnIcon}/>
                    </IconButton>
                    {
                        showDeleteLoader
                        ?
                        <CircularProgress size={23} sx={{ color: theme.palette.bg.azureBlue, mt:1 }}/>
                        :
                        <IconButton sx={theme.actionBtn} onClick={handleDelete}>
                            <DeleteIcon sx={theme.actionBtnIcon}/>
                        </IconButton>
                    }
                </Stack>
            </TableCell>
        </TableRow>
    )
}

export default CouponListItem;