import { useEffect, useState, useRef, useMemo } from "react";
import { useTheme, Grid, Box, Typography, Divider } from "@mui/material";
import ApplyVoucher from "components/cart/ApplyVoucher";


const style = {
    amountSection: {
        backgroundColor: 'bg.secondary',
        color: 'text.primary',
        padding: '24px',
        borderRadius: '8px'
    },
}
const AmountSummary = ( { fromDetails, cartItems, voucher } ) => {

    const [discountPercentage, setDiscountPercentage] = useState(voucher.percentage);
    const shippingPrice = useRef(5);
    const theme = useTheme();


    const memoizedSubTotal = useMemo(()=>{
        return cartItems.reduce((acc, item)=>acc+((item.product.isOnSale ? item.product.salePrice : item.product.regularPrice)*item.quantity), 0); 
    }, []);
    const [discountAmount, setDiscountAmount] = useState(()=>{
        return discountPercentage===0 ? 0 : memoizedSubTotal * (discountPercentage/100);
    });
    const [total, setTotal] = useState(()=>{
        return memoizedSubTotal+shippingPrice.current-discountAmount;
    });




    useEffect(()=>{

        if(discountPercentage===voucher.percentage) return;

        const newDiscountAmount = discountPercentage===0 ? 0 : memoizedSubTotal * (discountPercentage/100);
        const newTotal = memoizedSubTotal+shippingPrice.current-newDiscountAmount;
        setDiscountAmount(newDiscountAmount);
        setTotal(newTotal);

    }, [discountPercentage])

    return (
        <Box 
            sx={style.amountSection}
            style={{ boxShadow: theme.palette.boxShadow.card }}
        >
            <Grid 
                container
                justifyContent='space-between'
                alignItems='center'
                mb='16px'
            >
                <Grid item>
                    <Typography variant='body1' sx={{ fontSize: '14px', color: 'text.light' }}>Subtotal:</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h3' sx={{ fontSize: '18px', fontWeight: 600 }}>${memoizedSubTotal}.00</Typography>
                </Grid>
            </Grid>  
            <Grid 
                container
                justifyContent='space-between'
                alignItems='center'
                mb='16px'
            >
                <Grid item>
                    <Typography variant='body1' sx={{ fontSize: '14px', color: 'text.light' }}>Shipping:</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h3' sx={{ fontSize: '18px', fontWeight: 600 }}>${shippingPrice.current}.00</Typography>
                </Grid>
            </Grid>
            <Grid 
                container
                justifyContent='space-between'
                alignItems='center'
                mb='16px'
            >
                <Grid item>
                    <Typography variant='body1' sx={{ fontSize: '14px', color: 'text.light' }}>Discount:</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h3' sx={{ fontSize: '18px', fontWeight: 600 }}>{discountAmount===0 ? '-' : `$${discountAmount}.00`}</Typography>
                </Grid>
            </Grid>

            <Divider light sx={{ marginBottom: '16px'}}/>

            <Grid 
                container
                justifyContent='space-between'
                alignItems='center'
                style={fromDetails ? { marginBottom: '16px' } : null}
            >
                <Grid item>
                </Grid>
                <Grid item>
                    <Typography variant='h3' sx={{ fontSize: '22px', fontWeight: 600 }}>${total}.00</Typography>
                </Grid>
            </Grid>

            {
                fromDetails
                &&
                <ApplyVoucher voucher={voucher} setDiscountPercentage={setDiscountPercentage} purchaseAmount={memoizedSubTotal}/>
            }
        </Box>
    )
}

export default AmountSummary;