import { useState } from "react";
import {
    Box,
    useTheme,
    Typography,
    Button,
    Divider,
    Avatar,
    CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showErrorAlert } from "redux/alertSlice";
import { registerUser } from "redux/authSlice";
import AuthInputBox from "components/shared/AuthInputBox";
import regex from "regexUtils/regex";
import checkIsValid from "regexUtils/checkIsValid";

const Register = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        retypePassword: "",
    });
    const [showCreateAccountLoader, setShowCreateAccountLoader] =
        useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();
    const router = useRouter();

    const handleCreateAccount = () => {
        if (
            !checkIsValid(values.name, regex.name) ||
            !checkIsValid(values.email, regex.email) ||
            !checkIsValid(values.password, regex.password) ||
            values.password !== values.retypePassword
        ) {
            dispatch(showErrorAlert("Please fill the fields data correctly"));
            return;
        }
        setShowCreateAccountLoader(true);
        dispatch(registerUser(values, setShowCreateAccountLoader, router));
    };
    return (
        <Box sx={{ ...theme.authPageContainer, py: "50px" }}>
            <Box
                sx={theme.authFormContainer}
                style={{ boxShadow: theme.palette.boxShadow.modal }}
            >
                <Typography variant="h5" sx={theme.authFormTitle}>
                    Create Your Account
                </Typography>
                <Typography variant="h6" sx={theme.authFormInfo}>
                    Please fill all fields to continue
                </Typography>
                <AuthInputBox
                    label="Full Name"
                    placeholder="Farrukh Mushtaq"
                    type="text"
                    name="name"
                    values={values}
                    setValues={setValues}
                />
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
                />
                <AuthInputBox
                    label="Retype Password"
                    placeholder="********"
                    type="password"
                    name="retypePassword"
                    values={values}
                    setValues={setValues}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={showCreateAccountLoader}
                    style={theme.authBtnStyle}
                    sx={{
                        backgroundColor: "pink.dark",
                        mt: 3,
                        "&:hover": { backgroundColor: "pink.darkHover" },
                    }}
                    onClick={handleCreateAccount}
                >
                    {showCreateAccountLoader ? (
                        <CircularProgress
                            sx={{ color: theme.palette.pink.dark }}
                            size={25}
                        />
                    ) : (
                        <>Create Account</>
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
                    Already have an account?
                    <Link href="/login">
                        <a
                            style={{
                                ...theme.authFormLink,
                                borderBottom: `1px solid ${theme.palette.text.primary}`,
                            }}
                        >
                            Login
                        </a>
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Register;

Register.getLayout = (page) => {
    return <>{page}</>;
};
