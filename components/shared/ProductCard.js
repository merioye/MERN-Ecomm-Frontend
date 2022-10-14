import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useTheme, Grid, Box, Typography, Rating, Button, Checkbox } from '@mui/material';
import Image from 'next/image';
import handleAddToCart from 'utils/handleAddToCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';


const style = {
    container: {
        backgroundColor: 'bg.secondary',
        color: 'text.primary',
        borderRadius: '8px'
    },
    productTop: {
        padding: '35px 0px',
        paddingBottom: '15px',
        position: 'relative'
    },
    imageContainer: {
        height: '230px',
        width: '230px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        margin: 'auto'
    },
    discountPer: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        height: '24px',
        borderRadius: '16px',
        backgroundColor: 'bg.azureBlue',
        color: 'text.white',
        padding: '0px 7px',
        fontSize: '10px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wishListBtn: {
        color: 'text.light',
        position: 'absolute',
        top: '7px',
        right: '15px',
        '&.Mui-checked': {
            color: 'pink.dark'
        }
    },
    productBottom: {
        width: '280px',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'flex-end'
    },
    productDetails: {
        width: 'calc(100% - 38px)',
        marginRight: '8px'
    },
    productTitle: {
        fontSize: '14px',
        fontWeight: 600,
        color: 'text.secondary',
        marginBottom: '8px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        lineHeight: 1.5
    },
    discountedPrice: {
        fontSize: '14px',
        fontWeight: 600,
        color: 'bg.azureBlue'
    },
    originalPrice: {
        fontSize: '14px',
        fontWeight: 600,
        color: 'text.light',
        textDecoration: 'line-through'
    },
    addToCartBtnContainer: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    cartBtns: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    addedItemsCount: {
        fontSize: '14px',
        fontWeight: 600,
        color: 'text.primary'
    }
}
const ProductCard = ( { fromCarousel, product } ) => {
    
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const theme = useTheme();


    const memoizedAverageRating = useMemo(()=>{
        return product.reviews.reduce((acc, review) => acc + review.rating, 0)/product.reviews.length;
    }, []);





    const handleCartBtnClick = (e, type)=>{
        e.preventDefault();
        handleAddToCart(type, product, count, setCount, dispatch)
    }

    return (
        <Grid  
            item
            sx={style.container}
            style={fromCarousel ? { boxShadow: theme.palette.boxShadow.card, margin: '2px 10px' } : { boxShadow: theme.palette.boxShadow.card }}
        >
            <Link href={`/product/${product._id}`}>
                <a>
                    <Grid container flexDirection='column'>
                        <Grid item sx={style.productTop}>
                            <Box sx={style.imageContainer}>
                                <Image
                                    src={product.images[0].imageUrl}
                                    alt='productImage'
                                    layout='fill'
                                    placeholder='blur'
                                    blurDataURL={product.images[0].imageUrl}
                                />
                            </Box>
                            <Checkbox size='small' icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={style.wishListBtn} />
                            {product.isOnSale && <Box sx={style.discountPer}>{Math.trunc(100*(product.regularPrice-product.salePrice)/product.regularPrice)}% off</Box>}

                        </Grid>
                        <Grid item sx={style.productBottom}>
                            <Box sx={style.productDetails}>
                                <Typography variant='h3' sx={style.productTitle}>{product.name}</Typography>
                                <Rating value={product.reviews.length ? memoizedAverageRating : null} size='small' readOnly/>
                                <Grid 
                                    container
                                    gap='8px'
                                    mt='4px'
                                >
                                    <Grid item>
                                        <Typography variant='body1' sx={style.discountedPrice}>${product.isOnSale ? product.salePrice : product.regularPrice}</Typography>
                                    </Grid>
                                    {
                                        product.isOnSale
                                        &&
                                        <Grid item>
                                            <Typography variant='body1' sx={style.originalPrice}>${product.regularPrice}</Typography>
                                        </Grid>
                                    }
                                </Grid>
                            </Box>
                            <Box sx={style.cartBtns}>
                                {
                                    count>0
                                    &&
                                    <>
                                    <Button 
                                        variant='outlined' 
                                        style={{ minWidth: '30px', padding: '3px 0px' }} 
                                        onClick={(e)=> handleCartBtnClick(e, 'dec')}
                                    ><RemoveIcon sx={{ fontSize: '20px' }}/></Button>

                                    <Typography variant='body1' sx={style.addedItemsCount}>{count}</Typography>
                                    </>
                                }
                                
                                <Button 
                                    variant='outlined' 
                                    style={{ minWidth: '30px', padding: '3px 0px' }} 
                                    onClick={(e)=> handleCartBtnClick(e, 'inc')}
                                ><AddIcon sx={{ fontSize: '20px' }}/></Button>
                            </Box>
                        </Grid>
                    </Grid>
                </a>
            </Link>
        </Grid>
    )
}

export default ProductCard;