import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme, Box, Grid, Typography, FormControl, MenuItem, Divider, Button, IconButton, CircularProgress } from '@mui/material';
import InputBox from 'components/shared/InputBox';
import SelectBox from 'components/shared/SelectBox';
import CloseIcon from '@mui/icons-material/Close';
import style from 'components/admin/CreatePageStyle';
import withImage from 'hocs/withImage';
import { useSelector } from 'react-redux';
import { showErrorAlert } from 'redux/alertSlice';
import { getAllBrands, getAllCategories, createProduct, updateProduct } from 'redux/productSlice';



const CreateORUpdateProduct = ( 
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

    const { allBrands, allCategories } = useSelector((state)=>state.product);
    const [values, setValues] = useState({ name: data ? data.name : '', category: data ? data.category : '', desc: data ? data.desc : '', stock: data ? data.stock : '', brand: data ? data.brand : '', regularPrice: data ? data.regularPrice : '', salePrice: data ? data.salePrice : '' });
    const [showLoader, setShowLoader] = useState(false);
    const router = useRouter();
    const { id, page:pageCount } = router.query;
    const theme = useTheme();


    useEffect(()=>{
        dispatch(getAllBrands());
        dispatch(getAllCategories()); 
    }, [])



    const handleFormSubmit = (e)=>{ 
        e.preventDefault();
        if(id){

            if(values.name===data.name && values.category===data.category && values.desc===data.desc && values.stock===data.stock && values.brand===data.brand && values.regularPrice===data.regularPrice && values.salePrice===data.salePrice && !selectedImages.length){
                dispatch(showErrorAlert('Please make any changes to save'));
                return;
            }

            const formData = new FormData();
            (values.name!==data.name) && formData.append('name', values.name);
            (values.category!==data.category) && formData.append('category', values.category);
            (values.desc!==data.desc) && formData.append('desc', values.desc);
            (values.stock!==data.stock) && formData.append('stock', values.stock);
            (values.brand!==data.brand) && formData.append('brand', values.brand);
            (values.regularPrice!==data.regularPrice) && formData.append('regularPrice', values.regularPrice);
            (values.salePrice!==data.salePrice) && formData.append('salePrice', values.salePrice);
            if(selectedImages.length){
                for(let selectedImage of selectedImages){
                    formData.append('image', selectedImage.image);
                }
            }

            setShowLoader(true);
            dispatch(updateProduct(formData, data, setShowLoader, router, Number(pageCount)));
            
        }else{

            if(!selectedImages.length){
                dispatch(showErrorAlert('Please select atleast one Product Image'));
                return;
            }

            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('category', values.category);
            formData.append('desc', values.desc);
            formData.append('stock', values.stock);
            formData.append('brand', values.brand);
            formData.append('regularPrice', values.regularPrice);
            formData.append('salePrice', values.salePrice);
            for(let selectedImage of selectedImages){
                formData.append('image', selectedImage.image);
            }

            setShowLoader(true);
            dispatch(createProduct(formData, setShowLoader, router));
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
                            <Grid item sx={style.inputContainer}>
                                <InputBox
                                    label='Name'
                                    type='text'
                                    name='name'
                                    pattern='^.{3,}$'
                                    errorMessage='Name must be minimum of 3 characters'
                                    values={values}
                                    setValues={setValues}
                                    fromAdmin={true}
                                />
                            </Grid>
                            <Grid item sx={style.inputContainer}>
                                <SelectBox
                                    label='Select Category'
                                    name='category'
                                    errorMessage='Category is required'
                                    values={values}
                                    setValues={setValues}
                                    fromAdmin={true}
                                >
                                    {
                                        allCategories.length
                                        ?
                                        allCategories.map((category)=>(
                                            <MenuItem 
                                                key={category._id}
                                                value={category.name} 
                                                sx={theme.adminSelectMenuItem}
                                            >{category.name}</MenuItem>
                                        ))
                                    
                                        :
                                        <MenuItem></MenuItem>
                                    }
                                </SelectBox>
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
                                multiple 
                                type="file" 
                                onChange={(e)=>onFilesChange(e.target.files)}
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
                                    <>Drop images here...</>
                                    :
                                    <>Drag & drop product images here</>
                                } 
                            </Typography>

                            <Divider sx={style.divider}>OR</Divider>

                            <Button sx={style.selectFilesBtn}>
                                select files
                                <input 
                                    style={style.fileInput} 
                                    accept="image/*" 
                                    multiple 
                                    type="file" 
                                    onChange={(e)=>onFilesChange(e.target.files)}
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
                                {
                                    imagesPreviews.length
                                    ?
                                    imagesPreviews.map(({ id, url })=>{
                                        return <Grid  
                                            item 
                                            key={id}
                                            style={{ marginTop: '32px', position: 'relative' }}
                                        >
                                            <img
                                                src={url}
                                                height='80px'
                                                width='80px'
                                                alt='productImage'
                                            />
                                            <IconButton 
                                                sx={style.removeImageBtn}
                                                onClick={()=>handleRemoveImage(id)}
                                            >
                                                <CloseIcon sx={style.removeImageIcon}/>
                                            </IconButton>
                                        </Grid>
                                    })
                                    :
                                    data.images.map(({ cloudinaryId, imageUrl })=>{
                                        return <Grid  
                                            item 
                                            key={cloudinaryId}
                                        >
                                            <img
                                                src={imageUrl}
                                                height='80px'
                                                width='80px'
                                                alt='productImage'
                                            />
                                        </Grid>
                                    })
                                }
                            </Grid>
                            :
                            null
                        }

                        <Box mb='24px'>
                            <InputBox
                                label='Description'
                                type='text'
                                name='desc'
                                pattern='^.{3,}$'
                                errorMessage='Description must be of minimum 3 characters'
                                values={values}
                                setValues={setValues}
                                fromAdmin={true}
                                multiline={true}
                            />
                        </Box>

                        <Grid 
                            container 
                            justifyContent='space-between'
                            mb='24px'
                        >
                            <Grid item sx={style.inputContainer}>
                                <InputBox
                                    label='Stock'
                                    type='number'
                                    name='stock'
                                    pattern='^.{1,}$'
                                    errorMessage='Stock is required'
                                    values={values}
                                    setValues={setValues}
                                    fromAdmin={true}
                                />
                            </Grid>
                            <Grid item sx={style.inputContainer}>
                                <SelectBox
                                    label='Select Brand'
                                    name='brand'
                                    errorMessage='Brand is required'
                                    values={values}
                                    setValues={setValues}
                                    fromAdmin={true}
                                >
                                    {
                                        allBrands.length
                                        ?
                                        allBrands.map((brand)=>(
                                            <MenuItem 
                                                key={brand._id}
                                                value={brand.name} 
                                                sx={theme.adminSelectMenuItem}
                                            >{brand.name}</MenuItem>
                                        ))
                                        :
                                        <MenuItem></MenuItem>
                                    }
                                </SelectBox>
                            </Grid>
                        </Grid>

                        <Grid 
                            container 
                            justifyContent='space-between'
                            mb='24px'
                        >
                            <Grid item sx={style.inputContainer}>
                                <InputBox
                                    label='Regular Price'
                                    type='number'
                                    name='regularPrice'
                                    pattern='^.{1,}$'
                                    errorMessage='Regular Price is required'
                                    values={values}
                                    setValues={setValues}
                                    fromAdmin={true}
                                />
                            </Grid>
                            <Grid item sx={style.inputContainer}>
                                <InputBox
                                    label='Sale Price'
                                    type='number'
                                    name='salePrice'
                                    pattern='^.{1,}$'
                                    errorMessage='Sale Price is reqired'
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
                                save product
                                </>
                            }
                        </Button>
                    </form>
                </FormControl>
            </Box>
        </Box>
    )
}

export default withImage(CreateORUpdateProduct, 280, 280, 'product');