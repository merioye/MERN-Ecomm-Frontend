import { useState } from "react";
import { useTheme, Box, Typography, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Stack, Pagination } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import AdminSearchBox from "components/shared/AdminSearchBox";



const style = {
    heading: {
        fontSize: '20px',
        fontWeight: 600,
        color: 'text.primary',
        padding: '20px 24px',
        borderRadius: '8px',
        fontSize: '16px'
    }
}
const OrderList = ( { fromDashboard, heading } ) => {

    const [orderSearchString, setOrderSearchString] = useState('');
    const router = useRouter();
    const theme = useTheme();

    return (
        <Box 
            sx={theme.adminTableMainContainer} 
            style={ fromDashboard ? { marginTop: '30px', padding: '0px' } : null }
        >

            {
                !fromDashboard &&
                <Grid container gap='16px' justifyContent='space-between' mb='16px'>
                    <Grid item>
                        <Typography variant="h3" sx={theme.adminTableCaption} style={{ marginBottom: '0px' }}>
                            { heading }
                        </Typography>
                    </Grid>
                    <Grid item sx={theme.adminSearchBoxContainer}>  
                        <AdminSearchBox
                            placeholder='Search Order...'
                            value={orderSearchString}
                            setValue={setOrderSearchString}
                        />
                    </Grid>
                </Grid>
            }

            <Box sx={theme.adminTableContainer} style={{ boxShadow: theme.palette.boxShadow.card }}>
                {
                    fromDashboard &&
                    <Typography variant='h6' sx={style.heading}>
                        { heading }
                    </Typography>
                }
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'bg.aliceBlue' }}>
                                <TableCell sx={theme.adminTableColumnHeading}>Order ID</TableCell>
                                <TableCell align='center' sx={theme.adminTableColumnHeading}>Qty</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Customer</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Amount</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Status</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell 
                                    sx={theme.adminTableCellText} 
                                    style={{ minWidth: '300px' }}
                                >kdlklklkllksdflsjfllksjldjkflsk</TableCell>
                                <TableCell 
                                    align='center'
                                    sx={theme.adminTableCellText} 
                                >5</TableCell>
                                <TableCell 
                                    align='center'
                                    sx={theme.adminTableCellText}
                                    style={{ minWidth: '170px' }}
                                >Faheem Hassan</TableCell>
                                <TableCell 
                                    align='center'
                                    sx={theme.adminTableCellText}
                                >$250</TableCell>
                                <TableCell align='center'>
                                    <Box   
                                        sx={{ backgroundColor: 'bg.green', color: 'text.green' }}
                                        style={theme.statusAndCategoryBtn}
                                    >delivered</Box>
                                </TableCell>
                                <TableCell align='center' width='100px'>
                                    <Stack direction='row'>
                                        <IconButton 
                                            sx={theme.actionBtn}
                                            onClick={()=>router.push('/admin/orders/123')}
                                        >
                                            <VisibilityIcon sx={theme.actionBtnIcon}/>
                                        </IconButton>
                                        <IconButton sx={theme.actionBtn}>
                                            <DeleteIcon sx={theme.actionBtnIcon}/>
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={theme.adminTablePaginationContainer}>   
                    <Pagination count={10} variant="outlined" color="primary"/>
                </Box>
            </Box>
        </Box>
    )
}

export default OrderList;