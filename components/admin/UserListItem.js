import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toggleUserRole, deleteUser } from 'redux/productSlice';
import { useTheme, Typography, TableRow, TableCell, Box, Switch, IconButton, CircularProgress } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const UserListItem = ( { user } ) => {

    const [showSwitchLoader, setShowSwitchLoader] = useState(false);
    const [showDeleteLoader, setShowDeleteLoader] = useState(false);
    const router = useRouter();
    const { page:pageCount } = router.query;
    const dispatch = useDispatch();
    const theme = useTheme();



    const handleSwitchChange = ()=>{
        setShowSwitchLoader(true);
        const updatedValue = { role: user.role==='admin' ? 'user' : 'admin' };
        dispatch(toggleUserRole(updatedValue, user._id, setShowSwitchLoader));
    }

    const handleDelete = ()=>{
        setShowDeleteLoader(true);
        dispatch(deleteUser(user._id, setShowDeleteLoader, pageCount, router));
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
                        src={user.avatar ? user.avatar : '/images/man.svg'}
                        alt='userImage'
                        height='100%'
                        width='100%'
                        placeholder="blur"
                        blurDataURL={user.avatar ? user.avatar : '/images/man.svg'}
                    />
                </Box>
                <Box>
                    <Typography 
                        variant='body1'
                        sx={theme.adminTableCellText}
                        style={{ lineHeight: 1.75, fontWeight: 600 }}
                    >{user.name}</Typography>
                    <Typography
                        variant='body2'
                        sx={{ color: 'text.light', fontSize: '12px', fontWeight: 600 }}
                    >{user._id}</Typography>
                </Box>
            </TableCell>
            <TableCell 
                sx={theme.adminTableCellText}
                style={{ minWidth: '200px' }}
            >{user.email}</TableCell>
            <TableCell 
                align='center'
                sx={theme.adminTableCellText}
                style={{ minWidth: '130px' }}
            >05</TableCell>
            <TableCell align='center'>
                <Box   
                    sx={user.role==='admin' ? { backgroundColor: 'bg.green', color: 'text.green' } : { backgroundColor: 'bg.silver', color: 'text.primary' }}
                    style={theme.statusAndCategoryBtn}
                >{user.role}</Box>
            </TableCell>
            <TableCell align='center'>
                {
                    showSwitchLoader
                    ?
                    <CircularProgress size={23} sx={{ color: theme.palette.bg.azureBlue, mt:1 }}/>
                    :
                    <Switch 
                        checked={user.role==='admin' ? true : false}
                        onChange={handleSwitchChange}
                    />
                }
            </TableCell>
            <TableCell align='center'>
                {
                    showDeleteLoader
                    ?
                    <CircularProgress size={23} sx={{ color: theme.palette.bg.azureBlue, mt:1 }}/>
                    :
                    <IconButton sx={theme.actionBtn} onClick={handleDelete}>
                        <DeleteIcon sx={theme.actionBtnIcon}/>
                    </IconButton>
                }
            </TableCell>
        </TableRow>
    )
}

export default UserListItem;