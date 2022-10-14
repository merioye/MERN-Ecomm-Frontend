import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme, Box, Button, Grid } from "@mui/material";
import PageHeading from "components/cart/PageHeading";
import UserDashboardSidebar from "components/shared/UserDashboardSidebar";
import ProductCard from "components/shared/ProductCard";
import CustomPagination from "components/shared/CustomPagination";


const style = {
    container: {
        paddingTop: '40px',
        width: '100%'
    },
    addToCartBtn: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: { lg: '1200px', xs: '90%' },
        margin: 'auto',
        marginTop: '16px',
        marginBottom: '26px'
    },
    itemsContainer: {
        width: { lg: '1200px', xs: '90%' },
        margin: 'auto',
    }
}
const Wishlist = () => {

    const [page, setPage] = useState(1);
    const router = useRouter();
    const theme = useTheme();

    return (
        <Box sx={style.container}>
            <PageHeading heading='My Wish List'/>
            <UserDashboardSidebar/>
            <Box sx={style.addToCartBtn}>
                <Button 
                    variant='contained'
                    sx={{...theme.containedBtn, p: '6px 20px' }}
                >add all to cart</Button>
            </Box>
            <Grid 
                container
                gap={3}
                sx={style.itemsContainer}
            >
                <Grid item>
                    <ProductCard/>
                </Grid>
                <Grid item>
                    <ProductCard/>
                </Grid>
                <Grid item>
                    <ProductCard/>
                </Grid>
                <Grid item>
                    <ProductCard/>
                </Grid>
            </Grid>
            
            <Box sx={theme.adminTablePaginationContainer}>   
                <CustomPagination 
                    totalCount={3} 
                    page={page} 
                    setPage={setPage} 
                    router={router} 
                />
            </Box>
        </Box>
    )
}

export default Wishlist;