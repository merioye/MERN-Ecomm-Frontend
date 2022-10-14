import { useState } from "react";
import { useTheme, TextField } from "@mui/material";
import checkIsValid from 'regexUtils/checkIsValid';



const InputBox = ( { label, type, name, pattern, errorMessage, values, setValues, fromAdmin, multiline, readOnly, placeholder } ) => {

    const [isError, setIsError] = useState(false);
    const theme = useTheme();

    const inputStyle = fromAdmin ? {...theme.adminInput } : {...theme.userInput }


    return (
        <TextField
            label={label} 
            type={type}
            size={fromAdmin ? 'medium' : 'small'}
            placeholder={placeholder ? placeholder : label}
            sx={{ width: '100%' }}
            variant="outlined"
            autoComplete='off'
            InputProps={
                multiline ? { style: {...inputStyle, height: '150px', alignItems: 'flex-start' }, readOnly: Boolean(readOnly), required: true } : { style: {...inputStyle }, readOnly: Boolean(readOnly), required: true }
            }
            inputProps={{ pattern }}
            value={values[name]}
            onChange={(e)=> setValues({...values, [name]: e.target.value })}
            helperText={isError ? checkIsValid(values[name], pattern) ? '' : errorMessage : ''}
            error={isError ? !checkIsValid(values[name], pattern) ? true : false : false}
            onBlur={()=>setIsError(true)}
            multiline={multiline}
            maxRows={multiline ? 6 : 0}
        />
    )
}

export default InputBox;