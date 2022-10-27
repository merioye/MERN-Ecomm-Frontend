import { useState, useEffect } from "react";
import Image from "next/image";
import {
    useTheme,
    Box,
    IconButton,
    TextField,
    Grid,
    Button,
    Autocomplete,
    Typography,
    CircularProgress,
} from "@mui/material";
import { Country, State, City } from "country-state-city";
import { useImagePreview } from "hooks/useImagePreview";
import { useDispatch } from "react-redux";
import { showErrorAlert } from "redux/alertSlice";
import { setUser, updateUser } from "redux/authSlice";
import PageHeading from "components/cart/PageHeading";
import UserDashboardSidebar from "components/shared/UserDashboardSidebar";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import ssrRequest from "utils/ssrRequest";
import regex from "regexUtils/regex";
import checkIsValid from "regexUtils/checkIsValid";

const style = {
    container: {
        padding: "40px 0px",
        width: "100%",
    },
    formContainer: {
        width: { lg: "1200px", xs: "90%" },
        margin: "auto",
        marginTop: "24px",
        backgroundColor: "bg.secondary",
        borderRadius: "8px",
        padding: "1.5rem 1.75rem",
    },
    profileImageContainer: {
        position: "relative",
        borderRadius: "50%",
        overflow: "hidden",
        height: "64px",
        width: "64px",
    },
    cameraIconContainer: {
        position: "absolute",
        top: "25px",
        left: "40px",
        backgroundColor: "rgb(227, 233, 239)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "60%",
        cursor: "pointer",
        padding: "8px",
    },
};
const Settings = ({ user }) => {
    const { name, email, phone, address, avatar } = user;
    const [userData, setUserData] = useState({
        name: name,
        email: email,
        phone: phone,
        password: "",
        country: address?.country,
        state: address?.state,
        city: address?.city,
        zipCode: address?.zipCode,
        address1: address?.address1,
        address2: address?.address2,
    });

    const [selectedCountryCode, setSelectedCountryCode] = useState("");
    const [selectedStateCode, setSelectedStateCode] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const { imagesPreviews } = useImagePreview(selectedImages);
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        if (address.state) {
            const state = State.getAllStates().find(
                (state) => state.name === address.state
            );
            setSelectedCountryCode(state.countryCode);
            setSelectedStateCode(state.isoCode);
        }
    }, []);

    const handleProfileImageChange = (e) => {
        if (!e.target.files.length) return;

        const file = e.target.files[0];
        const img = { id: `${file.name}-${Date.now()}`, image: file };
        setSelectedImages([img]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !selectedImages.length &&
            name === userData.name &&
            email === userData.email &&
            phone === userData.phone &&
            !userData.password.trim().length &&
            address.country === userData.country &&
            address.state === userData.state &&
            address.city === userData.city &&
            address.zipCode === userData.zipCode &&
            address.address1 === userData.address1 &&
            address.address2 === userData.address2
        ) {
            dispatch(showErrorAlert("Please update any field to save changes"));
            return;
        }
        if (userData.name.trim().length < 3) {
            dispatch(
                showErrorAlert("Full Name must be minimum of 3 characters")
            );
            return;
        }
        if (!checkIsValid(userData.email, regex.email)) {
            dispatch(showErrorAlert("Please enter a valid email address"));
            return;
        }
        if (
            (phone.length || userData.phone.trim().length) &&
            userData.phone.trim().length !== 11
        ) {
            dispatch(showErrorAlert("Phone number must be of 11 digits"));
            return;
        }
        if (
            userData.password.trim().length &&
            !checkIsValid(userData.password, regex.password)
        ) {
            dispatch(
                showErrorAlert(
                    "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
                )
            );
            return;
        }
        const isAnyAddressFieldHasValue = Boolean(
            userData.country ||
                userData.state ||
                userData.city ||
                userData.zipCode ||
                userData.address1 ||
                userData.address2
        );
        if (
            isAnyAddressFieldHasValue &&
            !Boolean(
                userData.country &&
                    userData.state &&
                    userData.city &&
                    String(userData.zipCode) &&
                    userData.address1
            )
        ) {
            dispatch(showErrorAlert("Please fill all the address data"));
            return;
        }
        if (isAnyAddressFieldHasValue && userData.address1.length < 3) {
            dispatch(
                showErrorAlert("Address 1 must be minimum of 3 characters")
            );
            return;
        }

        setShowLoader(true);

        const formData = new FormData();
        if (name !== userData.name) formData.append("name", userData.name);
        if (email !== userData.email) formData.append("email", userData.email);
        if (phone !== userData.phone) formData.append("phone", userData.phone);
        if (userData.password.length)
            formData.append("password", userData.password);
        if (address.country !== userData.country)
            formData.append("country", userData.country);
        if (address.state !== userData.state)
            formData.append("state", userData.state);
        if (address.city !== userData.city)
            formData.append("city", userData.city);
        if (address.zipCode !== userData.zipCode)
            formData.append("zipCode", userData.zipCode);
        if (address.address1 !== userData.address1)
            formData.append("address1", userData.address1);
        if (address.address2 !== userData.address2)
            formData.append("address2", userData.address2);
        if (imagesPreviews && imagesPreviews[0])
            formData.append("image", selectedImages[0].image);

        dispatch(updateUser(formData, setShowLoader, userData, setUserData));
    };

    return (
        <Box sx={style.container}>
            <PageHeading heading="Edit Profile" />
            <UserDashboardSidebar />
            <Box
                sx={style.formContainer}
                style={{ boxShadow: theme.palette.boxShadow.card }}
            >
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <Box sx={{ mb: "24px", position: "relative" }}>
                        <Box sx={style.profileImageContainer}>
                            <Image
                                src={
                                    imagesPreviews && imagesPreviews[0]
                                        ? imagesPreviews[0].url
                                        : avatar
                                        ? avatar
                                        : "/images/man.svg"
                                }
                                alt="profileImage"
                                layout="fill"
                                placeholder="blur"
                                blurDataURL={
                                    imagesPreviews && imagesPreviews[0]
                                        ? imagesPreviews[0].url
                                        : avatar
                                        ? avatar
                                        : "/images/man.svg"
                                }
                            />
                        </Box>
                        <IconButton
                            sx={style.cameraIconContainer}
                            component="label"
                        >
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleProfileImageChange}
                            />
                            <CameraEnhanceIcon
                                sx={{ color: "text.primary", fontSize: "20px" }}
                            />
                        </IconButton>
                    </Box>
                    <Grid
                        container
                        justifyContent="space-between"
                        gap={3}
                        mb="24px"
                    >
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label="Full Name"
                                type="text"
                                size="small"
                                placeholder="Full Name"
                                sx={{ width: "100%" }}
                                variant="outlined"
                                autoComplete="off"
                                InputProps={{
                                    style: theme.userInput,
                                    required: Boolean(name),
                                }}
                                value={userData.name}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label="Email"
                                type="email"
                                size="small"
                                placeholder="Email"
                                sx={{ width: "100%" }}
                                variant="outlined"
                                autoComplete="off"
                                InputProps={{
                                    style: theme.userInput,
                                    required: Boolean(email),
                                }}
                                value={userData.email}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent="space-between"
                        gap={3}
                        mb="24px"
                    >
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label="Phone"
                                type="text"
                                size="small"
                                placeholder="Phone"
                                sx={{ width: "100%" }}
                                variant="outlined"
                                autoComplete="off"
                                InputProps={{
                                    style: theme.userInput,
                                    required: Boolean(phone),
                                }}
                                value={userData.phone}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label="Password"
                                type="password"
                                size="small"
                                placeholder="Password"
                                sx={{ width: "100%" }}
                                variant="outlined"
                                autoComplete="off"
                                InputProps={{ style: theme.userInput }}
                                value={userData.password}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent="space-between"
                        gap={3}
                        mb="24px"
                    >
                        <Grid item xs={12} md={5.5}>
                            <Autocomplete
                                disablePortal
                                options={Country.getAllCountries()}
                                sx={{ width: "100%" }}
                                size="small"
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <Typography
                                        {...props}
                                        variant="body1"
                                        sx={theme.userInput}
                                    >
                                        {option.name}
                                    </Typography>
                                )}
                                defaultValue={
                                    address.country
                                        ? Country.getAllCountries().find(
                                              (country) =>
                                                  country.name ===
                                                  address.country
                                          )
                                        : null
                                }
                                inputValue={userData.country}
                                onInputChange={(event, newInputValue) => {
                                    setUserData({
                                        ...userData,
                                        country: newInputValue,
                                    });
                                }}
                                onChange={(event, country) => {
                                    setSelectedCountryCode(
                                        country ? country.isoCode : ""
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Country"
                                        InputProps={{
                                            ...params.InputProps,
                                            style: theme.userInput,
                                            required: address.country
                                                ? true
                                                : false,
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={5.5}>
                            <Autocomplete
                                disablePortal
                                options={
                                    selectedCountryCode
                                        ? State.getStatesOfCountry(
                                              selectedCountryCode
                                          )
                                        : []
                                }
                                sx={{ width: "100%" }}
                                size="small"
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <Typography
                                        {...props}
                                        variant="body1"
                                        sx={theme.userInput}
                                    >
                                        {option.name}
                                    </Typography>
                                )}
                                defaultValue={
                                    address.state
                                        ? State.getAllStates().find(
                                              (state) =>
                                                  state.name === address.state
                                          )
                                        : null
                                }
                                inputValue={userData.state}
                                onInputChange={(event, newInputValue) => {
                                    setUserData({
                                        ...userData,
                                        state: newInputValue,
                                    });
                                }}
                                onChange={(event, state) => {
                                    setSelectedStateCode(
                                        state ? state.isoCode : ""
                                    );
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="State"
                                        InputProps={{
                                            ...params.InputProps,
                                            style: theme.userInput,
                                            required: address.state
                                                ? true
                                                : false,
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent="space-between"
                        gap={3}
                        mb="24px"
                    >
                        <Grid item xs={12} md={5.5}>
                            <Autocomplete
                                disablePortal
                                options={
                                    selectedCountryCode && selectedStateCode
                                        ? City.getCitiesOfState(
                                              selectedCountryCode,
                                              selectedStateCode
                                          )
                                        : []
                                }
                                sx={{ width: "100%" }}
                                size="small"
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <Typography
                                        {...props}
                                        variant="body1"
                                        sx={theme.userInput}
                                    >
                                        {option.name}
                                    </Typography>
                                )}
                                defaultValue={
                                    address.city
                                        ? City.getAllCities().find(
                                              (city) =>
                                                  city.name === address.city
                                          )
                                        : null
                                }
                                inputValue={
                                    userData.city ? userData.city : user.city
                                }
                                onInputChange={(event, newInputValue) => {
                                    setUserData({
                                        ...userData,
                                        city: newInputValue,
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="City"
                                        InputProps={{
                                            ...params.InputProps,
                                            style: theme.userInput,
                                            required: address.city
                                                ? true
                                                : false,
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label="Zip Code"
                                type="number"
                                size="small"
                                placeholder="Zip Code"
                                sx={{ width: "100%" }}
                                variant="outlined"
                                autoComplete="off"
                                InputProps={{
                                    style: theme.userInput,
                                    required: address.zipCode ? true : false,
                                }}
                                value={userData.zipCode}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        zipCode: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent="space-between"
                        gap={3}
                        mb="56px"
                    >
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label="Address 1"
                                type="text"
                                size="small"
                                placeholder="Address 1"
                                sx={{ width: "100%" }}
                                variant="outlined"
                                autoComplete="off"
                                InputProps={{ style: theme.userInput }}
                                value={userData.address1}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        address1: e.target.value,
                                        required: address.address1
                                            ? true
                                            : false,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={5.5}>
                            <TextField
                                label="Address 2"
                                type="text"
                                size="small"
                                placeholder="Address 2"
                                sx={{ width: "100%" }}
                                variant="outlined"
                                autoComplete="off"
                                InputProps={{ style: theme.userInput }}
                                value={userData.address2}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        address2: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={theme.containedBtn}
                        style={{ width: "130px" }}
                        disabled={showLoader}
                    >
                        {showLoader ? (
                            <CircularProgress
                                size={23}
                                sx={{ color: theme.palette.pink.dark }}
                            />
                        ) : (
                            <>save changes</>
                        )}
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default Settings;

export async function getServerSideProps({ req, res }) {
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/user`;
    const [error, data] = await ssrRequest(req, res, url);

    if (!data) {
        return {
            redirect: {
                statusCode: 307,
                destination: "/",
            },
        };
    }
    return {
        props: {
            user: data.user,
        },
    };
}
