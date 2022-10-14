import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme, Box, Grid, Typography, FormControl, Divider, Button, IconButton, CircularProgress } from '@mui/material';
import InputBox from 'components/shared/InputBox';
import { showErrorAlert } from 'redux/alertSlice';
import { createBrand, updateBrand, createCategory, updateCategory } from 'redux/productSlice';
import CloseIcon from '@mui/icons-material/Close';
import style from 'components/admin/CreatePageStyle';
import withImage from 'hocs/withImage';



const CreateORUpdateCategoryAndBrand = ( 
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

    const [values, setValues] = useState({ name: data ? data.name : '' });
    const [showLoader, setShowLoader] = useState(false);
    const router = useRouter();
    const { pageName, id, page:pageCount } = router.query;
    const theme = useTheme();




    const handleFormSubmit = (e)=>{
        e.preventDefault();
        if(id){

            if(values.name===data.name && !selectedImages.length){
                dispatch(showErrorAlert('Please make any changes to save'));
                return;
            }

            const formData = new FormData();
            (values.name!==data.name) && formData.append('name', values.name);
            (selectedImages.length) && formData.append('image', selectedImages[0].image);

            setShowLoader(true);

            if(pageName==='brands'){
                dispatch(updateBrand(formData, data, setShowLoader, router, Number(pageCount)));
            }else{
                dispatch(updateCategory(formData, data, setShowLoader, router, Number(pageCount)));
            }

        }else{

            if(!selectedImages.length){
                dispatch(showErrorAlert('Image is required'));
                return;
            }
            
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('image', selectedImages[0].image);

            setShowLoader(true);

            if(pageName==='brands'){
                dispatch(createBrand(formData, setShowLoader, router));
            }else{
                dispatch(createCategory(formData, setShowLoader, router));
            }

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
            
                        <Box>
                            <InputBox
                                label='Name'
                                type='text'
                                name='name'
                                pattern='.{3,}$'
                                errorMessage='Name must be minimum of 3 characters'
                                values={values}
                                setValues={setValues}
                                fromAdmin={true}
                                multiline={false}
                                readOnly={false}
                            />  
                        </Box>

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
                                    <>Drop image here...</>
                                    :
                                    <>Drag & drop image here</>
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
                            >Upload 280*280 image</Typography>
                    
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
                                        src={imagesPreviews[0] ? imagesPreviews[0].url : data.logoUrl}
                                        height='80px'
                                        width='80px'
                                        alt={`${heading}Image`}
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
                                    heading.endsWith('Brand')
                                    ?
                                    <>
                                    save brand
                                    </>
                                    :
                                    <>
                                    save category
                                    </>
                            }
                        </Button>

                    </form>

                </FormControl>
            </Box>
        </Box>
    )
}

export default withImage(CreateORUpdateCategoryAndBrand, 280, 280);