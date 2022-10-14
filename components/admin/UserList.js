import { useSelector } from "react-redux";
import { useTheme, Box, Typography, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AdminSearchBox from "components/shared/AdminSearchBox";
import UserListItem from "components/admin/UserListItem";
import CustomPagination from "components/shared/CustomPagination";
import debounce from "utils/debounce";
import withPageInfo from "hocs/withPageInfo";



const UserList = ( 
    { 
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

    const { users } = useSelector((state)=>state.product);    
    const theme = useTheme();


    return (
        <Box sx={theme.adminTableMainContainer}>

            <Grid container gap='16px' justifyContent='space-between' alignItems='center' mb='16px'>
                <Grid item>
                    <Typography variant="h3" sx={theme.adminTableCaption} style={{ marginBottom: '0px' }}>
                        User List
                    </Typography>
                </Grid>
                <Grid item sx={theme.adminSearchBoxContainer}>  
                    <AdminSearchBox
                        placeholder='Search User...'
                        handleSearch={debounce(appendSearchQuery, 500)}
                    />
                </Grid>
            </Grid>

            <Box sx={theme.adminTableContainer} style={{ boxShadow: theme.palette.boxShadow.card }}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'bg.aliceBlue' }}>
                                <TableCell sx={theme.adminTableColumnHeading}>Name</TableCell>
                                <TableCell sx={theme.adminTableColumnHeading}>Email</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>No Of Orders</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Role</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Admin</TableCell>
                                <TableCell align="center" sx={theme.adminTableColumnHeading}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.status
                                ?
                                    users.usersList.length
                                    ?
                                    users.usersList.map((user)=>(
                                        <UserListItem user={user} key={user._id}/>
                                    ))
                                    :
                                    null
                                :
                                    data.length
                                    ?
                                    data.map((user)=>(
                                        <UserListItem user={user} key={user._id}/>
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

export default withPageInfo(UserList);