import { useSelector } from "react-redux";
import { useTheme, Box, Typography, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Pagination } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AdminSearchBox from "components/shared/AdminSearchBox";
import ProductListItem from "components/admin/ProductListItem";
import CustomPagination from "components/shared/CustomPagination";
import debounce from "utils/debounce";
import withPageInfo from "hocs/withPageInfo";



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
const ProductList = ( 
    { 
        fromDashboard, 
        heading, 
        data, 
        totalCount, 
        page, 
        setPage, 
        router, 
        pageName,
        search, 
        appendSearchQuery 
    }
)  => {

    const { products } = useSelector((state)=>state.product); 
    const theme = useTheme();

    return (
        <Box 
            sx={theme.adminTableMainContainer}
            style={ fromDashboard ? { marginTop: '30px', padding: '0px' } : null }
        >

            {
                !fromDashboard &&
                <>
                <Typography variant="h3" sx={theme.adminTableCaption}>
                    { heading }
                </Typography>

                <Grid container gap='16px' justifyContent='space-between' mb='16px'>
                    <Grid item sx={theme.adminSearchBoxContainer}>  
                        <AdminSearchBox
                            placeholder='Search Product...'
                            handleSearch={debounce(appendSearchQuery, 500)}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant='contained' 
                            startIcon={<AddIcon/>}
                            sx={theme.containedBtn}
                            style={theme.btnPx16}
                            onClick={()=> router.push('/admin/products/create')}
                        >add product</Button>
                    </Grid>
                </Grid>
                </>
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
                                <TableCell sx={theme.adminTableColumnHeading}>Name</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Category</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Stock</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Price</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Featured</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Sale</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                products.status
                                ?
                                    products.all.length
                                    ?
                                    products.all.map((product)=>(
                                        <ProductListItem key={product._id} fromDashboard={fromDashboard} product={product}/>
                                    ))
                                    :
                                    null
                                :
                                    data.length
                                    ?
                                    data.map((product)=>(
                                        <ProductListItem key={product._id} fromDashboard={fromDashboard} product={product}/>
                                    ))
                                    :
                                    null
                            }
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
    )
}

export default withPageInfo(ProductList);