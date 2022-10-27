import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { showErrorAlert } from "redux/alertSlice";
import { getResetPasswordLink } from "redux/authSlice";
import AuthInputBox from "components/shared/AuthInputBox";
import regex from "regexUtils/regex";
import checkIsValid from "regexUtils/checkIsValid";

const ForgotPassword = () => {
    const [values, setValues] = useState({ email: "" });
    const [showResetLoader, setShowResetLoader] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleGetResetPasswordLink = () => {
        if (!values.email.trim()) {
            dispatch(showErrorAlert("Email is required"));
            return;
        }
        if (!checkIsValid(values.email, regex.email)) {
            dispatch(showErrorAlert("Please enter a valid email"));
            return;
        }
        setShowResetLoader(true);
        dispatch(getResetPasswordLink(values, setShowResetLoader));
    };

    return (
        <Box sx={{ ...theme.authPageContainer, py: "50px" }}>
            <Box
                sx={theme.authFormContainer}
                style={{ boxShadow: theme.palette.boxShadow.modal }}
            >
                <Typography variant="h5" sx={theme.authFormTitle}>
                    Forgot Your Password?
                </Typography>
                <Typography variant="h6" sx={theme.authFormInfo}>
                    Get reset password link on your registered email
                </Typography>
                <AuthInputBox
                    label="Email"
                    placeholder="example@mail.com"
                    name="email"
                    type="email"
                    values={values}
                    setValues={setValues}
                />
                <Button
                    variant="contained"
                    disabled={showResetLoader}
                    style={theme.authBtnStyle}
                    sx={{
                        backgroundColor: "pink.dark",
                        mt: 3,
                        "&:hover": { backgroundColor: "pink.darkHover" },
                    }}
                    onClick={handleGetResetPasswordLink}
                >
                    {showResetLoader ? (
                        <CircularProgress
                            sx={{ color: theme.palette.pink.dark }}
                            size={25}
                        />
                    ) : (
                        <>get reset password link</>
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
                    Remember your password?
                    <Link href="/login">
                        <a
                            style={{
                                ...theme.authFormLink,
                                borderBottom: `1px solid ${theme.palette.text.primary}`,
                            }}
                        >
                            Login Here
                        </a>
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default ForgotPassword;

ForgotPassword.getLayout = (page) => {
    return <>{page}</>;
};
