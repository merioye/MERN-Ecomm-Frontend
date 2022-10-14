import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { updateBrand, deleteBrand, updateCategory, deleteCategory } from 'redux/productSlice';
import { useTheme, TableRow, TableCell, Box, Switch, Stack, IconButton, CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const CategoryAndBrandListItem = ( { item, index, name } ) => {

    const [showDeleteLoader, setShowDeleteLoader] = useState(false);
    const [showSwitchLoader, setShowSwitchLoader] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { page: pageCount } = router.query;
    const theme = useTheme();


    const handleSwitchChange = ()=>{
        setShowSwitchLoader(true);
        if(name==='Brand'){
            const updatedValues = { isFeatured: !item.isFeatured };
            dispatch(updateBrand(updatedValues, item, setShowSwitchLoader));
        }else{
            const updatedValues = { isPublished: !item.isPublished };
            dispatch(updateCategory(updatedValues, item, setShowSwitchLoader));
        }
    }

    const handleDelete = ()=>{ 
        setShowDeleteLoader(true);
        if(name==='Brand'){
            dispatch(deleteBrand(item._id, setShowDeleteLoader, pageCount, router));
        }else{
            dispatch(deleteCategory(item._id, setShowDeleteLoader, pageCount, router));
        }
    }

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell
                sx={theme.adminTableCellText} 
                style={{ minWidth: '300px' }}
            > { item._id } </TableCell>
            <TableCell
                align='center'
                sx={theme.adminTableCellText} 
            > { index+1 } </TableCell>
            <TableCell 
                align='center'
                sx={theme.adminTableCellText}
                style={{ width: 'auto'}}
            > { item.name } </TableCell>
            <TableCell 
                align='center'
                sx={theme.adminTableCellText}
            >
                <Box
                    style={{ margin: 'auto' }}
                    sx={theme.adminTableImageContainer}
                >
                    <Image
                        src={item.logoUrl}
                        alt={`${name}Image`}
                        height='100%'
                        width='100%'
                        placeholder="blur"
                        blurDataURL={item.logoUrl}
                    />
                </Box>
            </TableCell>
            <TableCell align='center'>
                {
                    showSwitchLoader
                    ?
                    <CircularProgress size={23} sx={{ color: theme.palette.bg.azureBlue, mt:1 }}/>
                    :
                    <Switch 
                        checked={name==='Brand' ? item.isFeatured : item.isPublished} 
                        onChange={handleSwitchChange}
                    />
                }
            </TableCell>
            <TableCell align='center' width='100px'>
                <Stack direction='row'>
                    <IconButton 
                        sx={theme.actionBtn}
                        onClick={()=>router.push(`/admin/${name==='Brand'?'brands':'categories'}/${item._id}?page=${pageCount ? pageCount : 1}`)}
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

export default CategoryAndBrandListItem;