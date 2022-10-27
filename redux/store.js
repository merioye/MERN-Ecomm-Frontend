import { configureStore } from "@reduxjs/toolkit";
import authReducer from "redux/authSlice";
import alertReducer from "redux/alertSlice";
import productReducer from "redux/productSlice";
import cartReducer from "redux/cartSlice";
import orderReducer from "redux/orderSlice";
import socketReducer from "redux/socketSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        alert: alertReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        socket: socketReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
