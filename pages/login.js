import { useState, useEffect } from "react";
import {
    useTheme,
    Box,
    Typography,
    Button,
    Divider,
    Avatar,
    CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { showErrorAlert } from "redux/alertSlice";
import { login } from "redux/authSlice";
import AuthInputBox from "components/shared/AuthInputBox";
import CustomAlert from "components/shared/CustomAlert";

const Login = () => {
    const { alert } = useSelector((state) => state.alert);
    const [values, setValues] = useState({ email: "", password: "" });
    const [showLoginLoader, setShowLoginLoader] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();
    const router = useRouter();
    const { error } = router.query;

    useEffect(() => {
        if (error) {
            dispatch(showErrorAlert(error));
            router.replace("/login", undefined, { shallow: true });
            document.title = "Login";
        }
    }, [error]);

    const handleLogin = () => {
        if (!values.email.trim().length || !values.password.trim().length) {
            dispatch(showErrorAlert("All fields are required"));
            return;
        }
        setShowLoginLoader(true);
        dispatch(login(values, setShowLoginLoader, router));
    };

    return (
        <>
            <Box
                sx={{
                    ...theme.authPageContainer,
                    py: { xs: "0px", md: "50px" },
                }}
            >
                <Box
                    sx={theme.authFormContainer}
                    style={{ boxShadow: theme.palette.boxShadow.modal }}
                >
                    <Typography variant="h5" sx={theme.authFormTitle}>
                        Welcome To TeleCart
                    </Typography>
                    <Typography variant="h6" sx={theme.authFormInfo}>
                        Log in with email & password
                    </Typography>
                    <AuthInputBox
                        label="Email"
                        placeholder="example@mail.com"
                        name="email"
                        type="email"
                        values={values}
                        setValues={setValues}
                    />
                    <AuthInputBox
                        label="Password"
                        placeholder="********"
                        type="password"
                        name="password"
                        values={values}
                        setValues={setValues}
                        fromLoginPage={true}
                    />
                    <Button
                        variant="contained"
                        disabled={showLoginLoader}
                        style={theme.authBtnStyle}
                        sx={{
                            backgroundColor: "pink.dark",
                            mt: 3,
                            "&:hover": { backgroundColor: "pink.darkHover" },
                        }}
                        onClick={handleLogin}
                    >
                        {showLoginLoader ? (
                            <CircularProgress
                                sx={{ color: theme.palette.pink.dark }}
                                size={25}
                            />
                        ) : (
                            <>Login</>
                        )}
                    </Button>
                    <Divider sx={{ mt: 3, color: "text.light" }}>or</Divider>
                    <Button
                        variant="contained"
                        style={theme.authBtnStyle}
                        sx={{
                            backgroundColor: "bg.navy",
                            fontSize: "12px",
                            mt: 3,
                            "&:hover": { backgroundColor: "bg.navy" },
                        }}
                        onClick={() =>
                            window.open(
                                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/login/facebook`,
                                "_self"
                            )
                        }
                    >
                        <Avatar
                            src="/images/facebook-logo.jpg"
                            alt="logo"
                            sx={theme.authFormSocialLogo}
                        />
                        continue with facebook
                    </Button>
                    <Button
                        variant="contained"
                        style={theme.authBtnStyle}
                        sx={{
                            backgroundColor: "bg.blue",
                            fontSize: "12px",
                            mt: 1.5,
                            "&:hover": { backgroundColor: "bg.blue" },
                        }}
                        onClick={() =>
                            window.open(
                                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/login/google`,
                                "_self"
                            )
                        }
                    >
                        <Avatar
                            src="/images/google-logo.jpg"
                            alt="logo"
                            sx={theme.authFormSocialLogo}
                        />
                        continue with google
                    </Button>
                    <Typography sx={{ ...theme.authFormOtherPageLinkText }}>
                        Don't have account?
                        <Link href="/register">
                            <a
                                style={{
                                    ...theme.authFormLink,
                                    borderBottom: `1px solid ${theme.palette.text.primary}`,
                                }}
                            >
                                Sign Up
                            </a>
                        </Link>
                    </Typography>
                    <Typography
                        sx={{
                            ...theme.authFormOtherPageLinkText,
                            backgroundColor: "bg.aliceBlue",
                            padding: "20px",
                            borderRadius: "4px",
                        }}
                    >
                        Forgot your password?
                        <Link href="/forgotpassword">
                            <a
                                style={{
                                    ...theme.authFormLink,
                                    borderBottom: `1px solid ${theme.palette.text.primary}`,
                                }}
                            >
                                Reset It
                            </a>
                        </Link>
                    </Typography>
                </Box>
            </Box>
            {alert.showAlert && <CustomAlert />}
        </>
    );
};

export default Login;

Login.getLayout = (page) => {
    return <>{page}</>;
};
