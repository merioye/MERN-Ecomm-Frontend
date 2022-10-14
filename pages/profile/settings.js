import { useState } from 'react';
import Image from 'next/image';
import { useTheme, Box, IconButton, TextField, Grid, Button, Autocomplete, Typography } from "@mui/material";
import { Country, State, City } from 'country-state-city';
import { useImagePreview } from 'hooks/useImagePreview';
import PageHeading from "components/cart/PageHeading";
import UserDashboardSidebar from "components/shared/UserDashboardSidebar";
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';


const style = {
    container: {
        padding: '40px 0px',
        width: '100%'
    },
    formContainer:{
        width: { lg: '1200px', xs: '90%' },
        margin: 'auto',
        marginTop: '24px',
        backgroundColor: 'bg.secondary',
        borderRadius: '8px',
        padding: '1.5rem 1.75rem'
    },
    profileImageContainer: {
        position: 'relative',
        borderRadius: '50%',
        overflow: 'hidden',
        height: '64px',
        width: '64px'
    },
    cameraIconContainer: {
        position: 'absolute',
        top: '25px',
        left: '40px',
        backgroundColor: 'rgb(227, 233, 239)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '60%',
        cursor: 'pointer',
        padding: '8px'
    }
}
const Settings = () => {

    const [userData, setUserData] = useState({ name: 'Faheem Hassan', email: 'faheem@abc.com', phone: '', password: '', country: '', state: '', city: '', zipCode: '', address1: '', address2: '' });
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const [selectedStateCode, setSelectedStateCode] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const { imagesPreviews } = useImagePreview(selectedImages);
    const theme = useTheme();


    const handleProfileImageChange = (e)=>{
        if(!e.target.files.length) return;

        const file = e.target.files[0];
        const img = { id: `${file.name}-${Date.now()}`, image: file };
        setSelectedImages([img]);
    }

    return (
        <Box sx={style.container}>
            <PageHeading heading='Edit Profile'/>
            <UserDashboardSidebar/>
            <Box 
                sx={style.formContainer}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <form encType='multipart/form-data'>
                    <Box sx={{ mb: '24px', position: 'relative' }}>
                        <Box sx={style.profileImageContainer}>
                            <Image
                                src={(imagesPreviews && imagesPreviews[0]) ? imagesPreviews[0].url : '/images/man.svg'}
                                alt='profileImage'
                                layout='fill'
                                placeholder="blur"
                                blurDataURL={(imagesPreviews && imagesPreviews[0]) ? imagesPreviews[0].url : '/images/man.svg'}
                            />
                        </Box>
                        <IconButton sx={style.cameraIconContainer} component='label'>
                            <input hidden accept="image/*" type="file" onChange={handleProfileImageChange}/>
                            <CameraEnhanceIcon sx={{ color: 'text.primary', fontSize: '20px' }}/>
                        </IconButton>
                    </Box>
                    <Grid 
                        container
                        justifyContent='space-between'
                        gap={3}
                        mb='24px'
                    >
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label='Full Name' 
                                type='text'
                                size='small'
                                placeholder='Full Name'
                                sx={{ width: '100%' }}
                                variant="outlined"
                                autoComplete='off'
                                InputProps={
                                    { style: theme.userInput }
                                }
                                value={userData.name}
                                onChange={(e)=> setUserData({...userData, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label='Email' 
                                type='email'
                                size='small'
                                placeholder='Email'
                                sx={{ width: '100%' }}
                                variant="outlined"
                                autoComplete='off'
                                InputProps={
                                    { style: theme.userInput }
                                }
                                value={userData.email}
                                onChange={(e)=> setUserData({...userData, email: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Grid 
                        container
                        justifyContent='space-between'
                        gap={3}
                        mb='24px'
                    >
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label='Phone' 
                                type='text'
                                size='small'
                                placeholder='Phone'
                                sx={{ width: '100%' }}
                                variant="outlined"
                                autoComplete='off'
                                InputProps={
                                    { style: theme.userInput }
                                }
                                value={userData.phone}
                                onChange={(e)=> setUserData({...userData, phone: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label='Password' 
                                type='password'
                                size='small'
                                placeholder='Password'
                                sx={{ width: '100%' }}
                                variant="outlined"
                                autoComplete='off'
                                InputProps={
                                    { style: theme.userInput }
                                }
                                value={userData.password}
                                onChange={(e)=> setUserData({...userData, password: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Grid 
                        container 
                        justifyContent='space-between' 
                        gap={3}
                        mb='24px'
                    >
                        <Grid item xs={12} md={5.5}>
                            <Autocomplete
                                disablePortal
                                options={Country.getAllCountries()}
                                sx={{ width: '100%' }}
                                size='small'
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option)=> <Typography {...props} variant='body1' sx={theme.userInput}>{option.name}</Typography>}
                                inputValue={userData.country}
                                onInputChange={(event, newInputValue) => {
                                    setUserData({...userData, country: newInputValue });
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
                        <Grid item xs={12} md={5.5}>
                            <Autocomplete
                                disablePortal
                                options={selectedCountryCode ? State.getStatesOfCountry(selectedCountryCode) : []}
                                sx={{ width: '100%' }}
                                size='small'
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option)=> <Typography {...props} variant='body1' sx={theme.userInput}>{option.name}</Typography>}
                                inputValue={userData.state}
                                onInputChange={(event, newInputValue) => {
                                    setUserData({...userData, state: newInputValue });
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
                    <Grid 
                        container 
                        justifyContent='space-between' 
                        gap={3}
                        mb='24px'
                    >
                        <Grid item xs={12} md={5.5}>
                            <Autocomplete
                                disablePortal
                                options={(selectedCountryCode && selectedStateCode) ? City.getCitiesOfState(selectedCountryCode, selectedStateCode) : []}
                                sx={{ width: '100%' }}
                                size='small'
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option)=> <Typography {...props} variant='body1' sx={theme.userInput}>{option.name}</Typography>}
                                inputValue={userData.city}
                                onInputChange={(event, newInputValue) => {
                                    setUserData({...userData, city: newInputValue });
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
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label='Zip Code'
                                type='number'
                                size='small'
                                placeholder='Zip Code'
                                sx={{ width: '100%' }}
                                variant="outlined"
                                autoComplete='off'
                                InputProps={
                                    { style: theme.userInput }
                                }
                                value={userData.zipCode}
                                onChange={(e)=> setUserData({...userData, zipCode: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Grid 
                        container 
                        justifyContent='space-between'
                        gap={3}
                        mb='56px'
                    >
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label='Address 1' 
                                type='text'
                                size='small'
                                placeholder='Address 1'
                                sx={{ width: '100%' }}
                                variant="outlined"
                                autoComplete='off'
                                InputProps={
                                    { style: theme.userInput }
                                }
                                value={userData.address1}
                                onChange={(e)=> setUserData({...userData, address1: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={5.5}>
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
                                value={userData.address2}
                                onChange={(e)=> setUserData({...userData, address2: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant='contained'
                        sx={theme.containedBtn}
                    >save changes</Button>
                </form>
            </Box>
        </Box>
    )
}

export default Settings;