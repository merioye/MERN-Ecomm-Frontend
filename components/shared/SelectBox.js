import { useState } from "react";
import { useTheme, TextField } from "@mui/material";

const SelectBox = ({
    children,
    label,
    name,
    errorMessage,
    values,
    setValues,
    fromAdmin,
}) => {
    const [isError, setIsError] = useState(false);
    const theme = useTheme();

    return (
        <TextField
            select
            size={fromAdmin ? "medium" : "small"}
            label={label}
            sx={{ width: "100%" }}
            SelectProps={{
                style: fromAdmin
                    ? { ...theme.adminInput }
                    : { ...theme.userInput },
                required: true,
            }}
            value={values[name]}
            onChange={(e) => setValues({ ...values, [name]: e.target.value })}
            helperText={
                isError ? (values[name].trim().length ? "" : errorMessage) : ""
            }
            error={
                isError ? (!values[name].trim().length ? true : false) : false
            }
            onBlur={() => setIsError(true)}
        >
            {children}
        </TextField>
    );
};

export default SelectBox;
