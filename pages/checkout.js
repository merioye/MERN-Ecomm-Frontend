import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showErrorAlert } from "redux/alertSlice";
import { useTheme, Box, Grid, Typography, Autocomplete, TextField, Checkbox, FormControlLabel, Button, FormControl } from "@mui/material";
import { Country, State, City } from 'country-state-city';
import Steps from "components/cart/Steps";
import InputBox from "components/shared/InputBox";
import AmountSummary from "components/cart/AmountSummary";
import ssrRequest from "utils/ssrRequest";



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
    addressContainer: {
        padding: '24px 28px',
        backgroundColor: 'bg.secondary',
        color: 'text.primary',
        borderRadius: '8px',
        marginBottom: '32px'
    },
    addressTitle: {
        fontSize: '14px',
        fontWeight: 600,
        marginBottom: '16px'
    },
    amountSection: {
        backgroundColor: 'bg.secondary',
        color: 'text.primary',
        padding: '24px',
        borderRadius: '8px'
    },
}

const AddressDetails = ( { title, values, setValues, isSameAddress, setIsSameAddress } )=>{

    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const [selectedStateCode, setSelectedStateCode] = useState('');
    const theme = useTheme();


    return (
        <Box
            sx={style.addressContainer}
            style={{ boxShadow: theme.palette.boxShadow.card }}
        >
            <Typography variant="body1" sx={style.addressTitle} style={title==='Billing Address' ? { marginBottom: '10px' } : null}>{title}</Typography>
            {
                title==='Billing Address'
                &&
                <FormControlLabel control={<Checkbox size='small' />} label={<Typography sx={theme.userInput}>Same as shipping address</Typography>} checked={isSameAddress} onChange={()=>setIsSameAddress(!isSameAddress)} />
            }
            {
                (!isSameAddress || title==='Shipping Address')
                &&
                <>
                <Grid 
                    container 
                    justifyContent='space-between' 
                    mb='16px'
                    sx={title==='Billing Address' ? { marginTop: '16px' } : null}
                >
                    <Grid item xs={5.5}>
                        <InputBox
                            label='Full Name'
                            type='text'
                            name='name'
                            pattern='.{3,}$'
                            errorMessage='Full Name must be minimum of 3 characters'
                            values={values}
                            setValues={setValues}
                            fromAdmin={false}
                        />
                    </Grid>
                    <Grid item xs={5.5}>
                        <InputBox
                            label='Phone No'
                            type='number'
                            name='phone'
                            pattern='.{1,}$'
                            errorMessage='Phone Number is required'
                            values={values}
                            setValues={setValues}
                            fromAdmin={false}
                        />
                    </Grid>
                </Grid>
                <Grid container justifyContent='space-between' mb='16px'>
                    <Grid item xs={5.5}>
                        <Autocomplete
                            disablePortal
                            options={Country.getAllCountries()}
                            sx={{ width: '100%' }}
                            size='small'
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option)=> <Typography {...props} variant='body1' sx={theme.userInput}>{option.name}</Typography>}
                            inputValue={values.country}
                            onInputChange={(event, newInputValue) => {
                                setValues({...values, country: newInputValue });
                            }}
                            onChange={(event, country)=> {
                                setSelectedCountryCode(country ? country.isoCode : '');
                            }}
                            renderInput={(params) => 
                                <TextField 
                                    {...params} 
                                    label='Country'
                                    InputProps={{...params.InputProps, style: theme.userInput }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={5.5}>
                        <Autocomplete
                            disablePortal
                            options={selectedCountryCode ? State.getStatesOfCountry(selectedCountryCode) : []}
                            sx={{ width: '100%' }}
                            size='small'
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option)=> <Typography {...props} variant='body1' sx={theme.userInput}>{option.name}</Typography>}
                            inputValue={values.state}
                            onInputChange={(event, newInputValue) => {
                                setValues({...values, state: newInputValue });
                            }}
                            onChange={(event, state)=>{
                                setSelectedStateCode(state ? state.isoCode : '');
                            }}
                            renderInput={(params) => 
                                <TextField 
                                    {...params} 
                                    label='State'
                                    InputProps={{...params.InputProps, style: theme.userInput }}
                                />
                            }
                        />
                    </Grid>
                </Grid>
                <Grid container justifyContent='space-between' mb='16px'>
                    <Grid item xs={5.5}>
                        <Autocomplete
                            disablePortal
                            options={(selectedCountryCode && selectedStateCode) ? City.getCitiesOfState(selectedCountryCode, selectedStateCode) : []}
                            sx={{ width: '100%' }}
                            size='small'
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option)=> <Typography {...props} variant='body1' sx={theme.userInput}>{option.name}</Typography>}
                            inputValue={values.city}
                            onInputChange={(event, newInputValue) => {
                                setValues({...values, city: newInputValue });
                            }}
                            renderInput={(params) => 
                                <TextField 
                                    {...params} 
                                    label='City'
                                    InputProps={{...params.InputProps, style: theme.userInput }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={5.5}>
                        <InputBox
                            label='Zip Code'
                            type='number'
                            name='zipCode'
                            pattern='.{1,}$'
                            errorMessage='Zip code is required'
                            values={values}
                            setValues={setValues}
                            fromAdmin={false}
                        />
                    </Grid>
                </Grid>
                <Grid container justifyContent='space-between'>
                    <Grid item xs={5.5}>
                        <InputBox
                            label='Address 1'
                            type='text'
                            name='address1'
                            pattern='.{3,}$'
                            errorMessage='Address 1 must be minimum of 3 characters'
                            values={values}
                            setValues={setValues}
                            fromAdmin={false}
                        />
                    </Grid>
                    <Grid item xs={5.5}>
                        <TextField
                            label='Address 2' 
                            type='text'
                            size='small'
                            placeholder='Address 2'
                            sx={{ width: '100%' }}
                            variant="outlined"
                            autoComplete='off'
                            InputProps={
                                { style: theme.userInput }
                            }
                            value={values.address2}
                            onChange={(e)=> setValues({...values, address2: e.target.value })}
                        />
                    </Grid>
                </Grid>
                </>
            }
        </Box>
    )
}
const CheckoutPage = ( { cartItems, voucher } ) => {

    const [shippingAddress, setShippingAddress] = useState({ name: '', phone: '', country: '', state:'', city: '', zipCode: '', address1: '', address2: '' });
    const [billingAddress, setBillingAddress] = useState({ name: '', phone: '', country: '', state:'', city: '', zipCode: '', address1: '', address2: '' });
    const [isSameAddress, setIsSameAddress] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();


    const proceedToPayment = (e)=>{
        e.preventDefault();
        if(!shippingAddress.country){
            dispatch(showErrorAlert('Please choose Country in Shipping address'));
            return;
        }
        if(!shippingAddress.state){
            dispatch(showErrorAlert('Please choose State in Shipping address'));
            return;
        }
        if(!shippingAddress.city){
            dispatch(showErrorAlert('Please choose City in Shipping address'));
            return;
        }
        if((!isSameAddress && !billingAddress.country)){
            dispatch(showErrorAlert('Please choose country in Billing address'));
            return;
        }
        if(!isSameAddress && !billingAddress.state){
            dispatch(showErrorAlert('Please choose State in Billing address'));
            return;
        }
        if(!isSameAddress && !billingAddress.city){
            dispatch(showErrorAlert('Please choose City in Billing address'));
            return;
        }
        router.push('/payment');
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
                        <form onSubmit={proceedToPayment}>
                            <Grid 
                                container
                                sx={{ width: '100%' }}
                            >
                                <Grid item xs={12}>
                                    <AddressDetails 
                                        title='Shipping Address'
                                        values={shippingAddress}
                                        setValues={setShippingAddress}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <AddressDetails 
                                        title='Billing Address'
                                        values={billingAddress}
                                        setValues={setBillingAddress}
                                        isSameAddress={isSameAddress}
                                        setIsSameAddress={setIsSameAddress}
                                    />
                                </Grid>
                                <Grid item sx={{ width: '100%' }}>
                                    <Grid container justifyContent='space-between'>
                                        <Grid item xs={5.5}>
                                            <Link href='/cart'>
                                                <a>
                                                    <Button
                                                        variant='outlined'
                                                        sx={{...theme.outlinedBtn, ...theme.btnPy5 }}
                                                    >back to cart</Button>  
                                                </a>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={5.5}>
                                            <Button
                                                variant='contained'
                                                type='submit'
                                                sx={{...theme.containedBtn, ...theme.btnPy5 }}
                                            >proceed to payment</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </FormControl>
                </Grid>
                <Grid item xs={3.75}>
                    <AmountSummary fromDetails={true} cartItems={cartItems} voucher={voucher}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CheckoutPage;



export const getServerSideProps = async ( { req, res } )=>{

    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/carts/cart`;
    const [error, data] = await ssrRequest(req, res, url);
    
    if(!data){
        return {
            redirect: {
                statusCode: 307,
                destination: '/'
            }
        }
    }
    return {
        props: {
            cartItems: data.cart.products, 
            voucher: { 
                code: data.cart.couponCode, 
                percentage: data.cart.couponDiscountPercentage 
            }
        }
    }
}