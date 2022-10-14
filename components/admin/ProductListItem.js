import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct, deleteProduct } from 'redux/productSlice';
import { useTheme, TableRow, TableCell, Box, Typography, Switch, IconButton, Stack, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { useRouter } from 'next/router';


const ProductListItem = ( { fromDashboard, product } ) => {

    const [showFeaturedSwitchLoader, setShowFeaturedSwitchLoader] = useState(false);
    const [showSaleSwitchLoader, setShowSaleSwitchLoader] = useState(false);
    const [showDeleteLoader, setShowDeleteLoader] = useState(false);
    const router = useRouter();
    const { page: pageCount } = router.query;
    const dispatch = useDispatch();
    const theme = useTheme();


    const handleFeaturedSwitchChange = ()=>{
        setShowFeaturedSwitchLoader(true);
        const updatedValues = { isFeatured: !product.isFeatured };
        dispatch(updateProduct(updatedValues, product, setShowFeaturedSwitchLoader));
    }

    const handleSaleSwitchChange = ()=>{
        setShowSaleSwitchLoader(true);
        const updatedValues = { isOnSale: !product.isOnSale };
        dispatch(updateProduct(updatedValues, product, setShowSaleSwitchLoader));
    }

    const handleDelete = ()=>{ 
        setShowDeleteLoader(true);
        dispatch(deleteProduct(product._id, setShowDeleteLoader, pageCount, router));
    }

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell sx={theme.adminTableBodyFirstCell}>
                <Box
                    sx={theme.adminTableImageContainer}
                >
                    <Image
                        src={product.images[0].imageUrl}
                        alt='productImage'
                        height='100%'
                        width='100%'
                        placeholder="blur"
                        blurDataURL={product.images[0].imageUrl}
                    />
                </Box>
                <Box>
                    <Typography 
                        variant='body1'
                        sx={theme.adminTableCellText}
                        style={{ lineHeight: 1.75, fontWeight: 600 }}
                    >{product.name}</Typography>
                    <Typography
                        variant='body2'
                        sx={{ color: 'text.light', fontSize: '12px', fontWeight: 600 }}
                    >{product._id}</Typography>
                </Box>
            </TableCell>
            <TableCell align='center'>
                <Box   
                    sx={{ backgroundColor: 'bg.aliceBlue', color: 'text.primary' }}
                    style={theme.statusAndCategoryBtn}
                >{product.category}</Box>
            </TableCell>
            <TableCell 
                align='center'
                sx={theme.adminTableCellText}
                style={ fromDashboard ? { color: theme.palette.pink.dark, fontWeight: 600 } : null }
            >{product.stock}</TableCell>
            <TableCell 
                align='center'
                sx={theme.adminTableCellText}
            >$ {product.isOnSale ? product.salePrice : product.regularPrice}</TableCell>
            <TableCell align='center'>
                {
                    showFeaturedSwitchLoader
                    ?
                    <CircularProgress size={23} sx={{ color: theme.palette.bg.azureBlue, mt:1 }}/>
                    :
                    <Switch checked={product.isFeatured} onChange={handleFeaturedSwitchChange}/>
                }
            </TableCell>
            <TableCell align='center'>
                {
                    showSaleSwitchLoader
                    ?
                    <CircularProgress size={23} sx={{ color: theme.palette.bg.azureBlue, mt:1 }}/>
                    :
                    <Switch checked={product.isOnSale} onChange={handleSaleSwitchChange}/>
                }
            </TableCell>
            <TableCell align='center' width='100px'>
                <Stack direction='row'>
                    <IconButton 
                        sx={theme.actionBtn}
                        onClick={()=>router.push(`/admin/products/${product._id}?page=${pageCount ? pageCount : 1}`)}
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

export default ProductListItem;