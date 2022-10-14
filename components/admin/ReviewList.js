import { useState } from "react";
import { useTheme, Box, Typography, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Pagination, Rating } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import AdminSearchBox from "components/shared/AdminSearchBox";



const ReviewList = () => {

    const [productSearchString, setProductSearchString] = useState('');
    const theme = useTheme();

    return (
        <Box sx={theme.adminTableMainContainer}>

            <Grid container gap='16px' justifyContent='space-between' alignItems='center' mb='16px'>
                <Grid item>
                    <Typography variant="h3" sx={theme.adminTableCaption} style={{ marginBottom: '0px' }}>
                        Product Reviews
                    </Typography>
                </Grid>
                <Grid item sx={theme.adminSearchBoxContainer}>  
                    <AdminSearchBox
                        placeholder='Search Product...'
                        value={productSearchString}
                        setValue={setProductSearchString}
                    />
                </Grid>
            </Grid>

            <Box sx={theme.adminTableContainer} style={{ boxShadow: theme.palette.boxShadow.card }}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'bg.aliceBlue' }}>
                                <TableCell sx={theme.adminTableColumnHeading}>Name</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Customer</TableCell>
                                <TableCell sx={theme.adminTableColumnHeading}>Comment</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Rating</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={theme.adminTableBodyFirstCell}>
                                    <Box
                                        sx={theme.adminTableImageContainer}
                                    >
                                        <Image
                                            src='/images/logo.png'
                                            alt='productImage'
                                            height='100%'
                                            width='100%'
                                            placeholder="blur"
                                            blurDataURL="/images/logo.png"
                                        />
                                    </Box>
                                    <Box>
                                        <Typography 
                                            variant='body1'
                                            sx={theme.adminTableCellText}
                                            style={{ lineHeight: 1.75, fontWeight: 600 }}
                                        >Blue Premium T-shirt</Typography>
                                        <Typography
                                            variant='body2'
                                            sx={{ color: 'text.light', fontSize: '12px', fontWeight: 600 }}
                                        >#ldjfldjfljsldjf</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell 
                                    align='center'
                                    sx={theme.adminTableCellText}
                                    style={{ minWidth:'130px'}}
                                >Nathan Clark</TableCell>
                                <TableCell 
                                    sx={{ color: 'text.primary', fontSize: '12px', fontWeight: 600, minWidth:'400px' }}
                                >
                                    <q>But I must explain to you how all this of denouncing pleasure.</q>
                                </TableCell>
                                <TableCell align='center'>
                                    <Rating value={3} readOnly />
                                </TableCell>
                                <TableCell align='center'>
                                    <IconButton sx={theme.actionBtn}>
                                        <DeleteIcon sx={theme.actionBtnIcon}/>
                                    </IconButton>
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

export default ReviewList;