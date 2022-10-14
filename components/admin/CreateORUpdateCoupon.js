import { useState } from 'react';
import { useRouter } from 'next/router';
import { showErrorAlert } from 'redux/alertSlice';
import { createCoupon, updateCoupon } from 'redux/productSlice';
import { useTheme, Box, Grid, Typography, FormControl, Divider, Button, IconButton, CircularProgress } from '@mui/material';
import InputBox from 'components/shared/InputBox';
import CloseIcon from '@mui/icons-material/Close';
import style from 'components/admin/CreatePageStyle';
import withImage from 'hocs/withImage';


const CreateORUpdateCoupon = ( 
    { 
        heading,
        data,
        selectedImages, 
        imagesPreviews,  
        dispatch,
        getRootProps,
        getInputProps,
        isDragActive,
        onFilesChange,
        handleRemoveImage
    } 
) => {

    const [values, setValues] = useState({ name: data ? data.name : '', couponCode: data ? data.couponCode : '', validity: data ? new Date(data.validity).toISOString().split('T')[0] : '', discountPercentage: data ? data.discountPercentage : '', minimumAmount: data ? data.minimumAmount : '' });
    const [showLoader, setShowLoader] = useState(false);
    const router = useRouter();
    const { id, page:pageCount } = router.query;
    const theme = useTheme(); 


    const handleFormSubmit = (e)=>{
        e.preventDefault();
        if(id){

            if(values.name===data.name && values.couponCode===data.couponCode && values.validity===data.validity && values.discountPercentage===data.discountPercentage && values.minimumAmount===data.minimumAmount && !selectedImages.length){
                dispatch(showErrorAlert('Please make any changes to save'));
                return;
            }
            if(new Date(values.validity).getTime()<= new Date().getTime()){
                dispatch(showErrorAlert('Validity Date/Time must be greater than current Date/Time'));
                return;
            }
            if(values.discountPercentage<=0 || values.discountPercentage>100){
                dispatch(showErrorAlert('Please enter a valid discount percentage'));
                return;
            }
            if(values.minimumAmount<=0){
                dispatch(showErrorAlert('Minimum Purchase amount should be greater than 0'));
                return;
            }

            const formData = new FormData();
            (values.name!==data.name) && formData.append('name', values.name);
            (values.couponCode!==data.couponCode) && formData.append('couponCode', values.couponCode);
            (values.validity!==data.validity) && formData.append('validity', values.validity);
            (values.discountPercentage!==data.discountPercentage) && formData.append('discountPercentage', values.discountPercentage);
            (values.minimumAmount!==data.minimumAmount) && formData.append('minimumAmount', values.minimumAmount);
            (selectedImages.length) && formData.append('image', selectedImages[0].image);

            setShowLoader(true);
            dispatch(updateCoupon(formData, data, setShowLoader, router, Number(pageCount)));
        }
        else{

            if(!selectedImages.length){
                dispatch(showErrorAlert('Image is required'));
                return;
            }
            if(new Date(values.validity).getTime()<= new Date().getTime()){
                dispatch(showErrorAlert('Validity Date/Time must be greater than current Date/Time'));
                return;
            }
            if(values.discountPercentage<=0 || values.discountPercentage>100){
                dispatch(showErrorAlert('Please enter a valid discount percentage'));
                return;
            }
            if(values.minimumAmount<=0){
                dispatch(showErrorAlert('Minimum Purchase amount should be greater than 0'));
                return;
            }

            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('couponCode', values.couponCode);
            formData.append('validity', values.validity);
            formData.append('discountPercentage', values.discountPercentage);
            formData.append('minimumAmount', values.minimumAmount);
            formData.append('image', selectedImages[0].image);

            setShowLoader(true);
            dispatch(createCoupon(formData, setShowLoader, router));
        }
    }

    return (
        <Box sx={theme.adminTableMainContainer}>

            <Typography variant="h3" sx={theme.adminTableCaption}>
                { heading }
            </Typography>

            <Box 
                sx={style.formContainer} 
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <FormControl fullWidth>
                    <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                        <Grid 
                            container 
                            justifyContent='space-between'
                        >
                            <Grid item sx={style.inputContainer} style={{ width: '100%' }}>
                                <InputBox
                                    label='Campaign Title'
                                    type='text'
                                    name='name'
                                    pattern='.{3,}$'
                                    errorMessage='Compaign Title must be minimum of 3 characters'
                                    values={values}
                                    setValues={setValues}
                                    fromAdmin={true}
                                />
                            </Grid>
                        </Grid>

                        <Box 
                            sx={style.dragContainer} 
                            style={isDragActive ? { border: '2px dashed #4E97FD' } : null }
                            {...getRootProps()} 
                        >
                            
                            <input 
                                style={style.fileInput} 
                                accept="image/*" 
                                type="file" 
                                onChange={(e)=>onFilesChange(e.target.files[0])}
                                {...getInputProps()} 
                            />
                            
                            <Typography 
                                variant='body1'
                                sx={style.dragInstruction}
                                style={isDragActive ? { color: '#4E97FD' } : null }
                            >
                                {
                                    isDragActive
                                    ?
                                    <>Drop banner here...</>
                                    :
                                    <>Drag & drop coupon banner here</>
                                } 
                            </Typography>

                            <Divider sx={style.divider}>OR</Divider>

                            <Button sx={style.selectFilesBtn}>
                                select file
                                <input 
                                    style={style.fileInput} 
                                    accept="image/*" 
                                    type="file" 
                                    onChange={(e)=>onFilesChange(e.target.files[0])}
                                    {...getInputProps()} 
                                />
                            </Button>
                            
                            <Typography 
                                variant='body2'
                                sx={style.dragImageSizeText}
                            >Upload 970*250 banner</Typography>
                    
                        </Box>
                        {
                            imagesPreviews && imagesPreviews.length || data
                            ?
                            <Grid container gap={1} mb='24px'>
                                <Grid 
                                    item 
                                    sx={{ position: 'relative' }}
                                    style={imagesPreviews[0] ? { marginTop: '32px' } : null}
                                >
                                    <img
                                        src={imagesPreviews[0] ? imagesPreviews[0].url : data.bannerUrl}
                                        height='70px'
                                        width='250px'
                                        alt='couponBanner'
                                    />
                                    {
                                        imagesPreviews[0]
                                        &&
                                        <IconButton 
                                            sx={style.removeImageBtn}
                                            onClick={()=>handleRemoveImage(imagesPreviews[0].id)}
                                        >
                                            <CloseIcon sx={style.removeImageIcon}/>
                                        </IconButton>
                                    }
                                </Grid>
                            </Grid>
                            :
                            null
                        }


                        <Grid 
                            container 
                            justifyContent='space-between'
                            mb='24px'
                        >
                            <Grid item sx={style.inputContainer}>
                                <InputBox
                                    label='Coupon Code'
                                    type='text'
                                    name='couponCode'
                                    pattern='^.{1,}$'
                                    errorMessage='Coupon Code is required'
                                    values={values}
                                    setValues={setValues}
                                    fromAdmin={true}
                                />
                            </Grid>
                            <Grid item sx={style.inputContainer}>
                                <InputBox
                                    label=''
                                    type='date'
                                    name='validity'
                                    pattern='^.{1,}$'
                                    errorMessage='Coupon Validity Date is reqired'
                                    values={values}
                                    setValues={setValues}
                                    fromAdmin={true}
                                />
                            </Grid>
                        </Grid>

                        <Grid 
                            container 
                            justifyContent='space-between'
                            mb='24px'
                        >
                            <Grid item sx={style.inputContainer}>
                                <InputBox
                                    label='Discount Percentage'
                                    type='number'
                                    name='discountPercentage'
                                    pattern='^.{1,}$'
                                    errorMessage='Discount Percentage is required'
                                    values={values}
                                    setValues={setValues}
                                    fromAdmin={true}
                                />
                            </Grid>
                            <Grid item sx={style.inputContainer}>
                                <InputBox
                                    label='Minimum Amount'
                                    type='number'
                                    name='minimumAmount'
                                    pattern='^.{1,}$'
                                    errorMessage='Minimum Amount is reqired'
                                    values={values}
                                    setValues={setValues}
                                    fromAdmin={true}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            variant='contained'
                            sx={theme.containedBtn}
                            style={theme.btnPy10}
                            disabled={showLoader}
                            type='submit'
                        >
                            {
                                showLoader
                                ?
                                <CircularProgress size={25} sx={{ color: theme.palette.pink.dark }}/>
                                :
                                <>
                                save coupon
                                </>
                            }
                        </Button>
                    </form>
                </FormControl>
            </Box>
        </Box>
    )
}

export default withImage(CreateORUpdateCoupon, 250, 970);