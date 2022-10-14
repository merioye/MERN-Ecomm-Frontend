import { useRouter } from "next/router";
import qs from 'qs';
import { useSelector, useDispatch } from "react-redux";
import { toggleFiltersVisibility } from "redux/productSlice";
import { useTheme, Drawer, Box, Typography, Divider, Slider, FormGroup, FormControlLabel, Checkbox, Rating, Chip, Button } from "@mui/material";
import redirect from "utils/redirect";


const style = {
    mainContainer: {
        width: '280px',
        height: '100vh',
        overflow: 'auto',
        transition: 'all 0.2s ease 0s',
        zIndex: 2000
    },
    container: {
        backgroundColor: 'bg.secondary',
        padding: '18px 27px',
        color: 'text.primary',
        height: 'auto',
        width: 'auto'
    },
    heading: {
        fontSize: '14px',
        fontWeight: 600,
        marginBottom: '10px'
    },
    body: {
        fontSize: '14px',
        fontWeight: 400,
        padding: '6px 0px',
        cursor: 'pointer'
    },
    divider: {
        marginTop: '16px',
        marginBottom: '24px',
        borderColor: 'bg.aliceBlue'
    }
}
const FiltersContent = ( { categories, productsPriceRange, brands } )=>{
    
    const router = useRouter();
    const theme = useTheme();

    const queryOptions = qs.parse(router.asPath.split('?')[1]);


    return(
        <Box sx={style.container}>
            {
                categories.length
                ? 
                <Typography variant='h4' sx={style.heading}>Categories</Typography>
                :
                null
            }
            {
                categories.length
                ?
                categories.map((category)=>{
                    return(
                        queryOptions.category && queryOptions.category.includes(category.name)
                        ?
                        <Chip 
                            key={category._id}
                            label={category.name} 
                            sx={{ marginRight: '10px', marginTop: '10px' }} 
                            onDelete={()=> redirect(router, queryOptions, 'category', false, category.name)} 
                        />
                        :
                        <Typography 
                            key={category._id}
                            variant='body1' 
                            ml={1}
                            sx={style.body} 
                            style={{ color: theme.palette.text.light }}
                            onClick={()=> redirect(router, queryOptions, 'category', true, category.name)}
                        >{category.name}</Typography>
                    )
                })
                :
                null
            }
            {
                categories.length
                ?
                <Divider light={true} sx={style.divider}/>
                :
                null
            }

            <Typography variant='h4' sx={style.heading}>Price Range</Typography>
            <Slider
                min={productsPriceRange.min}
                max={productsPriceRange.max}
                value={queryOptions.price ? [Number(queryOptions.price.split('-')[0]), Number(queryOptions.price.split('-')[1])] : [productsPriceRange.min,productsPriceRange.max]}
                onChange={(e, newValue)=> {
                    redirect(router, queryOptions, 'price', newValue)
                }}
                valueLabelDisplay="auto"
            />

            <Divider light={true} sx={style.divider}/>

            {
                (brands && brands.length)
                ?
                <>
                <Typography variant='h4' sx={style.heading}>Brands</Typography>
                <FormGroup>
                    {
                        brands.map((brand)=>{
                            return <FormControlLabel key={brand} control={<Checkbox size='small' />} label={<Typography sx={style.body}>{brand}</Typography>} checked={Boolean(queryOptions.brand ? queryOptions.brand.includes(brand) : false)} onChange={(e)=> redirect(router, queryOptions, 'brand', e.target.checked, brand)}/>
                        })
                    }
                </FormGroup>
                
                <Divider light={true} sx={style.divider}/>
                </>
                :
                null
            }

            <FormGroup>
                <FormControlLabel control={<Checkbox size='small' />} label={<Typography sx={style.body}>On Sale</Typography>} checked={Boolean(queryOptions.onSale ? queryOptions.onSale : false)} onChange={(e)=> redirect(router, queryOptions, 'onSale', e.target.checked)}/>
                <FormControlLabel control={<Checkbox size='small' />} label={<Typography sx={style.body}>In Stock</Typography>} checked={Boolean(queryOptions.inStock ? queryOptions.inStock : false)} onChange={(e)=> redirect(router, queryOptions, 'inStock', e.target.checked)}/>
                <FormControlLabel control={<Checkbox size='small' />} label={<Typography sx={style.body}>Featured</Typography>} checked={Boolean(queryOptions.isFeatured ? queryOptions.isFeatured : false)} onChange={(e)=> redirect(router, queryOptions, 'isFeatured', e.target.checked)}/>
            </FormGroup>

            <Divider light={true} sx={style.divider}/>

            <Typography variant='h4' sx={style.heading}>Ratings</Typography>
            <FormControlLabel control={<Checkbox size='small' />} label={<Rating value={5} size='small' readOnly sx={{ marginTop: '6px'}}/>} checked={Boolean(queryOptions.rating ? queryOptions.rating.includes('5') : false)} onChange={(e)=> redirect(router, queryOptions, 'rating', e.target.checked, '5')}/>
            <FormControlLabel control={<Checkbox size='small' />} label={<Rating value={4} size='small' readOnly sx={{ marginTop: '6px'}}/>} checked={Boolean(queryOptions.rating ? queryOptions.rating.includes('4') : false)} onChange={(e)=> redirect(router, queryOptions, 'rating', e.target.checked, '4')}/>
            <FormControlLabel control={<Checkbox size='small' />} label={<Rating value={3} size='small' readOnly sx={{ marginTop: '6px'}}/>} checked={Boolean(queryOptions.rating ? queryOptions.rating.includes('3') : false)} onChange={(e)=> redirect(router, queryOptions, 'rating', e.target.checked, '3')}/>
            <FormControlLabel control={<Checkbox size='small' />} label={<Rating value={2} size='small' readOnly sx={{ marginTop: '6px'}}/>} checked={Boolean(queryOptions.rating ? queryOptions.rating.includes('2') : false)} onChange={(e)=> redirect(router, queryOptions, 'rating', e.target.checked, '2')}/>
            <FormControlLabel control={<Checkbox size='small' />} label={<Rating value={1} size='small' readOnly sx={{ marginTop: '6px'}}/>} checked={Boolean(queryOptions.rating ? queryOptions.rating.includes('1') : false)} onChange={(e)=> redirect(router, queryOptions, 'rating', e.target.checked, '1')}/>


            <Button 
                variant='contained'
                sx={theme.containedBtn}
                onClick={()=> router.push('/')}
                style={{ marginTop: '30px' }}
            >Clear Filters</Button>

        </Box>
    )
}


const Filters = ( { categories, productsPriceRange, brands } ) => {

    const { showFiltersSidebar } = useSelector((state)=>state.product);
    const dispatch = useDispatch();


    const handleToggleFiltersSidebar = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        dispatch(toggleFiltersVisibility(open));
    };


    return (
        <Drawer
            ModalProps={{ keepMounted: true }}
            open={showFiltersSidebar}
            onClose={handleToggleFiltersSidebar(false)}
        >
            <Box
                sx={style.mainContainer}
                role="presentation"
                onKeyDown={handleToggleFiltersSidebar(false)}
                >
                <FiltersContent categories={categories} productsPriceRange={productsPriceRange} brands={brands}/>
            </Box>
        </Drawer>
    )
}

export default Filters;