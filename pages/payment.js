import { useState } from "react";
import Link from 'next/link';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useTheme, Box, FormControl, Grid, RadioGroup, Radio, FormControlLabel, Divider, Typography, TextField, Button } from "@mui/material";
import Steps from "components/cart/Steps";
import AmountSummary from "components/cart/AmountSummary";


const style = {
    container: {
        backgroundColor: 'bg.primary',
        padding: '40px',
        width: '100%'
    },
    itemsContainer: {
        width: '1200px',
        margin: 'auto'
    },
    paymentContainer: {
        padding: '24px 28px',
        backgroundColor: 'bg.secondary',
        color: 'text.primary',
        borderRadius: '8px',
        marginBottom: '32px'
    },
    amountSection: {
        backgroundColor: 'bg.secondary',
        color: 'text.primary',
        padding: '24px',
        borderRadius: '8px'
    },
}
const PaymentPage = () => {

    const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', name: '', cvc: '' });
    const [focusedField, setFocusedField] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const theme = useTheme();


    const handleInputFocus = (name)=>{
        setFocusedField(name);
    }

    const handleChange = (e, name )=>{
        if(name!=='number'){
            setCardInfo({...cardInfo, [name]: e.target.value.trim() });
        }
        else{
            // formatting the value of Card Number Input field
            if(e.target.value.trim().length<cardInfo[name].length){
                setCardInfo({...cardInfo, [name]: e.target.value.trim() });
            }
            else{
                if([4, 9, 14].includes(e.target.value.trim().length)){
                    setCardInfo({...cardInfo, [name]: e.target.value+' ' });
                }
                else{
                    setCardInfo({...cardInfo, [name]: e.target.value });
                }
            }
        }
    }

    const makeOrder = (e)=>{
        e.preventDefault();
    }

    return (
        <Box sx={style.container}>
            <Steps/>
            <Grid
                container
                gap={3}
                sx={style.itemsContainer}
            >
                <Grid item xs={8}>
                    <FormControl fullWidth>
                        <form onSubmit={makeOrder}>
                            <Grid container sx={{ width: '100%' }}>
                                <Grid item xs={12}>
                                    <Box 
                                        sx={style.paymentContainer}
                                        style={{ boxShadow: theme.palette.boxShadow.card }}
                                    >
                                        <RadioGroup
                                            value={paymentMethod}
                                            onChange={(e)=> setPaymentMethod(e.target.value)}
                                        >
                                            <FormControlLabel value="card" control={<Radio size='small' />} label={<Typography sx={{...theme.userInput, fontWeight: 600 }}>Pay with credit card</Typography>} />
                                            
                                            {
                                                paymentMethod==='card'
                                                &&
                                                <>
                                                <Grid 
                                                    container 
                                                    justifyContent='space-between' 
                                                    mb='16px'
                                                    mt='20px'
                                                >
                                                    <Grid item xs={5.5}>
                                                        <TextField
                                                            label='Card Number' 
                                                            type='tel'
                                                            size='small'
                                                            placeholder='e.g 1234 1234 1234 1234'
                                                            sx={{ width: '100%' }}
                                                            variant="outlined"
                                                            autoComplete='off'
                                                            InputProps={
                                                                { style: theme.userInput, required: true }
                                                            }
                                                            inputProps={{ maxLength: 19 }}
                                                            value={cardInfo.number}
                                                            onChange={(e)=> handleChange(e, 'number')}
                                                            onFocus={()=> handleInputFocus('number')}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5.5}>
                                                        <TextField
                                                            label='Expiry Date' 
                                                            type='text'
                                                            size='small'
                                                            placeholder='e.g 06/22'
                                                            sx={{ width: '100%' }}
                                                            variant="outlined"
                                                            autoComplete='off'
                                                            InputProps={
                                                                { style: theme.userInput, required: true }
                                                            }
                                                            value={cardInfo.expiry}
                                                            onChange={(e)=> handleChange(e, 'expiry')}
                                                            onFocus={()=> handleInputFocus('expiry')}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid 
                                                    container 
                                                    justifyContent='space-between' 
                                                    mb='16px'
                                                >
                                                    <Grid item xs={5.5}>
                                                        <TextField
                                                            label='CVC' 
                                                            type='text'
                                                            size='small'
                                                            placeholder='e.g 123'
                                                            sx={{ width: '100%' }}
                                                            variant="outlined"
                                                            autoComplete='off'
                                                            InputProps={
                                                                { style: theme.userInput, required: true }
                                                            }
                                                            value={cardInfo.cvc}
                                                            onChange={(e)=> handleChange(e, 'cvc')}
                                                            onFocus={()=> handleInputFocus('cvc')}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5.5}>
                                                        <TextField
                                                            label='Name on Card' 
                                                            type='text'
                                                            size='small'
                                                            placeholder='e.g John'
                                                            sx={{ width: '100%' }}
                                                            variant="outlined"
                                                            autoComplete='off'
                                                            InputProps={
                                                                { style: theme.userInput, required: true }
                                                            }
                                                            value={cardInfo.name}
                                                            onChange={(e)=> handleChange(e, 'name')}
                                                            onFocus={()=> handleInputFocus('name')}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Cards
                                                    cvc={cardInfo.cvc}
                                                    expiry={cardInfo.expiry}
                                                    focused={focusedField}
                                                    name={cardInfo.name}
                                                    number={cardInfo.number}
                                                />
                                                </>
                                            }

                                            <Divider light sx={{ margin: '26px 0px'}}/>

                                            <FormControlLabel value="cash" control={<Radio size='small' />} label={<Typography sx={{...theme.userInput, fontWeight: 600 }}>Cash On Delivery</Typography>} />
                                        </RadioGroup>
                                    </Box>
                                </Grid>
                                <Grid item sx={{ width: '100%' }}>
                                    <Grid container justifyContent='space-between'>
                                        <Grid item xs={5.5}>
                                            <Link href='/checkout'>
                                                <a>
                                                    <Button
                                                        variant='outlined'
                                                        sx={{...theme.outlinedBtn, ...theme.btnPy5 }}
                                                    >back to checkout details</Button>  
                                                </a>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={5.5}>
                                            <Button
                                                variant='contained'
                                                type='submit'
                                                sx={{...theme.containedBtn, ...theme.btnPy5 }}
                                            >pay RS. 500</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </FormControl>
                </Grid>
                <Grid item xs={3.75}>
                    <AmountSummary fromDetails={false}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PaymentPage;