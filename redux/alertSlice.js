import { createSlice } from "@reduxjs/toolkit";


const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        alert: {
            showAlert: false,
            severity: '',
            message: ''
        }
    },
    reducers: {
        showErrorAlert(state, action){
            state.alert = { showAlert: true, severity: 'error', message: action.payload};
        },
        showSuccessAlert(state, action){
            state.alert = { showAlert: true, severity: 'success', message: action.payload };
        },
        resetAlert(state, action){
            state.alert = { showAlert: false, severity: '', message: '' }
        }
    }
});

export const {
    showErrorAlert,
    showSuccessAlert,
    resetAlert
} = alertSlice.actions;

export default alertSlice.reducer;