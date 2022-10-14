import { useTheme, Box, Typography, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AdminSearchBox from "components/shared/AdminSearchBox";
import CustomPagination from "components/shared/CustomPagination";
import CategoryAndBrandListItem from "components/admin/CategoryAndBrandListItem";
import { useSelector } from "react-redux"; 
import debounce from "utils/debounce";
import withPageInfo from "hocs/withPageInfo";



const CategoryAndBrandList = ( 
    { 
        name, 
        data, 
        totalCount,
        page, 
        setPage, 
        router, 
        pageName,
        search, 
        appendSearchQuery  
    } 
) => {

    const { brands, categories } = useSelector((state)=>state.product);
    const theme = useTheme();

    
    return (
        <Box sx={theme.adminTableMainContainer}>

            <Typography variant="h3" sx={theme.adminTableCaption}>
                { name } List
            </Typography>

            <Grid container gap='16px' justifyContent='space-between' mb='16px'>
                <Grid item sx={theme.adminSearchBoxContainer}>  
                    <AdminSearchBox
                        placeholder={`Search ${name}...`}
                        handleSearch={debounce(appendSearchQuery, 500)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        startIcon={<AddIcon/>}
                        sx={theme.containedBtn}
                        style={theme.btnPx16}
                        onClick={()=> router.push(`/admin/${name==='Brand'?'brands':'categories'}/create`)}
                    >add { name }</Button>
                </Grid>
            </Grid>

            <Box sx={theme.adminTableContainer} style={{ boxShadow: theme.palette.boxShadow.card }}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'bg.aliceBlue' }}>
                                <TableCell sx={theme.adminTableColumnHeading}>{ name } Id</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>No</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Name</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>{name==='Brand'?'Logo':'Icon'}</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>{name==='Brand'?'Featured':'Published'}</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                (name==='Brand' ? brands.status : categories.status)
                                ?
                                    name==='Brand'
                                    ?
                                        brands.brandsList.length 
                                        ?
                                        brands.brandsList.map((item, index)=>(
                                            <CategoryAndBrandListItem key={item._id} item={item} index={index} name={name}/>
                                        ))
                                        :
                                        null
                                    :
                                        categories.categoriesList.length 
                                        ?
                                        categories.categoriesList.map((item, index)=>(
                                            <CategoryAndBrandListItem key={item._id} item={item} index={index} name={name}/>
                                        ))
                                        :
                                        null

                                :
                                    data.length 
                                    ?
                                    data.map((item, index)=>(
                                        <CategoryAndBrandListItem key={item._id} item={item} index={index} name={name}/>
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

export default withPageInfo(CategoryAndBrandList);