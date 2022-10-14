import { createSlice } from "@reduxjs/toolkit";
import { showErrorAlert, showSuccessAlert } from 'redux/alertSlice';
import axiosInstance from "config/axios";



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        setUser(state, action){
            state.user = action.payload;
        }
    }
});


export const {
    setUser,
} = authSlice.actions;

export default authSlice.reducer;


// Thunks
export function registerUser(user, setShowCreateAccountLoader, router){
    return async function registerUserThunk(dispatch){
        try{
            await axiosInstance.post('/api/register', user);
            setShowCreateAccountLoader(false);
            router.push('/login');
        }catch(e){
            console.log(e);
            setShowCreateAccountLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    }
}




export function login(values, setShowLoginLoader, router){ 
    return async function loginThunk(dispatch){
        try{
            const res = await axiosInstance.post('/api/login', values);
            dispatch(setUser(res.data.user));
            setShowLoginLoader(false);
            router.push('/');
        }catch(e){
            console.log(e);
            setShowLoginLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    }
}



export function getResetPasswordLink(values, setShowResetLoader){
    return async function getResetPasswordLinkThunk(dispatch){
        try{
            const res = await axiosInstance.post('/api/forgotPassword', values);
            setShowResetLoader(false);
            dispatch(showSuccessAlert(res.data.message));
        }catch(e){
            console.log(e);
            setShowResetLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    }
}


export function resetPassword(values, setShowResetLoader, query, router){
    return async function resetPasswordThunk(dispatch){
        try{
            const res = await axiosInstance.post(`/api/resetPassword/${query.resetPasswordToken}/${query.userId}`, values);
            setShowResetLoader(false);
            dispatch(showSuccessAlert(res.data.message));
            setTimeout(()=>{
                router.push('/login');
            }, 2000)
        }catch(e){
            console.log(e);
            setShowResetLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    }
}



export function getUser(){
    return async function getUserThunk(dispatch){
        try{
            const res = await axiosInstance.get('/api/user');
            dispatch(setUser(res.data.user));
        }catch(e){
            console.log(e);
        }
    }
}
