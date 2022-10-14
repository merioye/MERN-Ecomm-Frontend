import { useState } from 'react';
import { useTheme, Box, Typography, Grid, MenuItem, IconButton, Divider, Button } from '@mui/material';
import InputBox from 'components/shared/InputBox';
import SelectBox from 'components/shared/SelectBox';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';



const style = {
    orderDetails: {
        backgroundColor: 'bg.secondary',
        borderRadius: '8px',
        width: '100%',
        padding: '24px',
        overflow: 'hidden',
        color: 'text.primary'
    },
    text: {
        fontSize: '14px',
        fontWeight: 400
    },
    inputContainer: {
        width: '48%'
    },
    orderItemImage: {
        height: '64px',
        width: '64px',
        borderRadius: '8px',
        border: '1px solid #E8E8EE',
        padding: '5px',
        marginRight: '10px'
    },
    saveBtn: {
        backgroundColor: 'bg.azureBlue',
        color: 'text.white',
        borderRadius: '8px',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: 'bg.royalBlue'
        }
    }
}
const OrderDetails = () => {

    const [values, setValues] = useState({ name: 'Faheem', status: 'processing', shippingAddress: 'Kelly Williams 777 Brockton Avenue, Abington MA 2351', note:'Please deliver ASAP.'})

    const theme = useTheme();

    return (
        <Box sx={theme.adminTableMainContainer}>

            <Typography variant="h3" sx={theme.adminTableCaption}>
                Order Details
            </Typography>

            <Box
                sx={style.orderDetails}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <Grid container gap='32px'>
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.light', mr:0.5 }}
                                >Order ID:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.primary'}}
                                >9001997718074513</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.light', mr:0.5 }}
                                >Placed on:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.primary'}}
                                >01 Jan, 2021</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid 
                    container 
                    justifyContent='space-between'
                    mt='24px'
                    mb='24px'
                >
                    <Grid item sx={style.inputContainer}>
                        <InputBox
                            label='Name'
                            type='text'
                            name='name'
                            pattern='^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$'
                            errorMessage='Name must be minimum of 3 characters and should not contain number/special characters'
                            values={values}
                            setValues={setValues}
                            fromAdmin={true}
                            multiline={false}
                            readOnly={true}
                        />
                    </Grid>
                    <Grid item sx={style.inputContainer}>
                        <SelectBox
                            label='Order Status'
                            name='status'
                            errorMessage='Order Status is required'
                            values={values}
                            setValues={setValues}
                            fromAdmin={true}
                        >
                            <MenuItem 
                                value='processing' 
                                sx={theme.adminSelectMenuItem}
                            >Processing</MenuItem>
                            <MenuItem 
                                value='pending'
                                sx={theme.adminSelectMenuItem}
                            >Pending</MenuItem>
                            <MenuItem 
                                value='delivered'
                                sx={theme.adminSelectMenuItem}
                            >Delivered</MenuItem>
                        </SelectBox>
                    </Grid>
                </Grid>

                <Grid 
                    container 
                    justifyContent='space-between' 
                    alignItems='center'
                    mb='16px' 
                    mt='16px'
                >
                    <Grid item>
                        <Grid container alignItems='center'>
                            <Grid item sx={style.orderItemImage}>
                                <Image
                                    src='/images/logo.png'
                                    alt='productImage'
                                    height='100%'
                                    width='100%'
                                    placeholder='blur'
                                    blurDataURL='/images/logo.png'
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant='body1'
                                    sx={{ ...style.text, fontWeight: 600, color: 'text.primary' }}
                                >Samsung Galaxy-M1</Typography>
                                <Typography
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.light' }}
                                >$250 x 3</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton sx={theme.actionBtn}>
                            <DeleteIcon sx={theme.actionBtnIcon}/>
                        </IconButton>
                    </Grid>
                </Grid>

            </Box>

            <Grid
                container
                spacing={2.4}
                mb='20px'
                mt='0px' 
            >
                <Grid item xs={6}>
                    <Box
                        sx={style.orderDetails}
                        style={{ boxShadow: theme.palette.boxShadow.card }}
                    >
                        <Box mb='28px'>
                            <InputBox
                                label='Shipping Address'
                                type='text'
                                name='shippingAddress'
                                pattern='.{3,}$'
                                errorMessage='Shipping Address must be minimum of 3 characters'
                                values={values}
                                setValues={setValues}
                                fromAdmin={true}
                                multiline={true}
                                readOnly={true}
                            />
                        </Box>
                        <Box>
                            <InputBox
                                label="Customer's note"
                                type='text'
                                name='note'
                                pattern='.{3,}$'
                                errorMessage="Customer's note must be minimum of 3 characters"
                                values={values}
                                setValues={setValues}
                                fromAdmin={true}
                                multiline={true}
                                readOnly={true}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={style.orderDetails}
                        style={{ boxShadow: theme.palette.boxShadow.card }}
                    >
                        <Typography 
                            variant='body1'
                            sx={{ ...style.text, fontSize: '16px', fontWeight: 600, color: 'text.primary', mb:'17px' }}
                        >Total Summary</Typography>
                        <Grid
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            mb='17px'
                        >
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.light' }}
                                >Subtotal:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.primary', fontWeight: 600 }}
                                >$335</Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            mb='17px'
                        >
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.light' }}
                                >Shipping fee:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.primary', fontWeight: 600 }}
                                >$10</Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            mb='17px'
                        >
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.light' }}
                                >Discount:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.primary', fontWeight: 600 }}
                                >$20</Typography>
                            </Grid>
                        </Grid>

                        <Divider light />

                        <Grid
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            mb='17px'
                            mt='17px'
                        >
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.primary', fontWeight:600 }}
                                >Total payable</Typography>
                            </Grid>
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.primary', fontWeight: 600 }}
                                >$315</Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            mb='17px'
                        >
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.primary', fontWeight:600 }}
                                >Amount received</Typography>
                            </Grid>
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.primary', fontWeight: 600 }}
                                >$315</Typography>
                            </Grid>
                        </Grid>
                        
                        <Divider light />

                        <Grid
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            mb='17px'
                            mt='17px'
                        >
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.primary', fontWeight:600 }}
                                >Remaining Amount</Typography>
                            </Grid>
                            <Grid item>
                                <Typography 
                                    variant='body1'
                                    sx={{ ...style.text, color: 'text.primary', fontWeight: 600 }}
                                >$0</Typography>
                            </Grid>
                        </Grid>
                        
                        <Typography
                            variant='body1'
                            sx={{ ...style.text, color: 'text.primary' }}
                        >Paid by Credit/Debit Card</Typography>

                    </Box>
                </Grid>
            </Grid>

            <Button
                variant='contained'
                sx={theme.containedBtn}
                style={theme.btnPy10}
            >save changes</Button>

        </Box>
    )
}

export default OrderDetails;