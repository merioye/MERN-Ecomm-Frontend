import { useState } from "react";
import { Box, InputLabel, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const style = {
  container: {
    width: "100%",
    height: "auto",
    marginBottom: "12px",
    position: "relative",
  },
  label: {
    fontSize: "12px",
    color: "text.secondary2",
    marginBottom: "8px",
    fontWeight: 600,
    lineHeight: 1.5,
    display: "block",
  },
  input: {
    width: "100%",
    height: "44px",
    padding: "8.5px 14px",
    paddingTop: "8px",
    borderRadius: "4px",
    fontSize: "15px",
  },
  visibilityToggleBtn: {
    position: "absolute",
    right: "12px",
    top: "30px",
  },
};
const AuthInputBox = ({
  label,
  placeholder,
  type,
  name,
  values,
  setValues,
  fromLoginPage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState("false");
  const regex = {
    name: "^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$",
    email: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
    password:
      "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
    retypePassword: values.password,
  };
  const errorMessages = {
    name: "Name should be minimum 3 characters and should not include whitespace at the end",
    email: "Email is invalid",
    password:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    retypePassword: "Passwords must match",
  };

  return (
    <Box sx={style.container}>
      <InputLabel htmlFor={label} sx={style.label}>
        {label}
      </InputLabel>
      <input
        id={`${label}`}
        style={
          type === "password"
            ? { ...style.input, paddingRight: "50px" }
            : style.input
        }
        className="inputBox"
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        autoComplete="off"
        value={values[name]}
        onChange={(e) => {
          setValues({ ...values, [name]: e.target.value });
        }}
        onBlur={() => setIsInputFocused("true")}
        onFocus={() =>
          name === "retypePassword" ? setIsInputFocused("true") : null
        }
        pattern={fromLoginPage && type === "password" ? null : regex[name]}
        required
        focused={isInputFocused} // eslint-disable-line
      />
      {fromLoginPage && type === "password" ? (
        <span>Password is required</span>
      ) : (
        <span>{errorMessages[name]}</span>
      )}
      {type === "password" ? (
        showPassword ? (
          <IconButton
            sx={style.visibilityToggleBtn}
            onClick={() => setShowPassword(false)}
          >
            <Visibility sx={{ fontSize: "22px" }} />
          </IconButton>
        ) : (
          <IconButton
            sx={style.visibilityToggleBtn}
            onClick={() => setShowPassword(true)}
          >
            <VisibilityOff
              sx={{ fontSize: "22px", color: "text.fadedSilver" }}
            />
          </IconButton>
        )
      ) : null}
    </Box>
  );
};

export default AuthInputBox;
