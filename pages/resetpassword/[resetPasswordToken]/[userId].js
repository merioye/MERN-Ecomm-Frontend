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
import { resetPassword } from "redux/authSlice";
import AuthInputBox from "components/shared/AuthInputBox";
import CustomAlert from "components/shared/CustomAlert";
import regex from "regexUtils/regex";
import checkIsValid from "regexUtils/checkIsValid";

const ResetPassword = () => {
  const { alert } = useSelector((state) => state.alert);
  const { user } = useSelector((state) => state.auth);
  const [values, setValues] = useState({ password: "", retypePassword: "" });
  const [showResetLoader, setShowResetLoader] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleResetPassword = () => {
    if (
      !checkIsValid(values.password, regex.password) ||
      values.password !== values.retypePassword
    ) {
      dispatch(showErrorAlert("Please fill the fields data correctly"));
      return;
    }
    setShowResetLoader(true);
    dispatch(resetPassword(values, setShowResetLoader, query, router));
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
            Reset Your Paassword
          </Typography>
          <Typography variant="h6" sx={theme.authFormInfo}>
            Enter your new password
          </Typography>
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
            variant="contained"
            disabled={showResetLoader}
            style={theme.authBtnStyle}
            sx={{
              backgroundColor: "pink.dark",
              mt: 3,
              "&:hover": { backgroundColor: "pink.darkHover" },
            }}
            onClick={handleResetPassword}
          >
            {showResetLoader ? (
              <CircularProgress
                sx={{ color: theme.palette.pink.dark }}
                size={25}
              />
            ) : (
              <>reset password</>
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
          <Typography
            sx={{
              ...theme.authFormOtherPageLinkText,
              backgroundColor: "bg.aliceBlue",
              padding: "20px",
              borderRadius: "4px",
            }}
          >
            Didn&apos;t got reset password link?
            <Link href="/forgotpassword">
              <a
                style={{
                  ...theme.authFormLink,
                  borderBottom: `1px solid ${theme.palette.text.primary}`,
                }}
              >
                Request Another One
              </a>
            </Link>
          </Typography>
        </Box>
      </Box>
      {alert.showAlert && <CustomAlert />}
    </>
  );
};

export default ResetPassword;

ResetPassword.getLayout = (page) => {
  return <>{page}</>;
};
