import { configureStore } from "@reduxjs/toolkit";
import authReducer from 'redux/authSlice';
import alertReducer from 'redux/alertSlice';
import productReducer from 'redux/productSlice';
import cartReducer from 'redux/cartSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        alert: alertReducer,
        product: productReducer,
        cart: cartReducer,
    }
});

export default store;