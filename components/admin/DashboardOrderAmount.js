import { Grid, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';



const style = {
    orderAmount: {
        borderRadius: '8px',
        padding: '24px',
        color: 'white'
    }
}
const DashboardOrderAmount = ( { bgColor, title, amount } ) => {

    return (
        <Grid item xs={4}>
            <Grid 
                container 
                flexDirection='column' 
                alignItems='center' 
                sx={{ backgroundColor: bgColor }} 
                style={style.orderAmount}
            >
                <Grid item>
                    { title==="Today's Orders" && <LayersOutlinedIcon sx={{ fontSize: '35px' }}/> }
                    { title==="This Month" && <ShoppingCartOutlinedIcon sx={{ fontSize: '35px' }}/> }
                    { title==="Total Orders" && <CreditCardOutlinedIcon sx={{ fontSize: '35px' }}/> }
                </Grid>
                <Grid item>
                    <Typography variant='body1' mb='12px'>{ title }</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h5' fontWeight={650}>{ amount }</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DashboardOrderAmount;