import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "config/axios";

const alertSlice = createSlice({
    name: "alert",
    initialState: {
        alert: {
            showAlert: false,
            severity: "",
            message: "",
        },
        orderNotifications: {
            orderNotificationsList: [],
            status: false,
        },
    },
    reducers: {
        showErrorAlert(state, action) {
            state.alert = {
                showAlert: true,
                severity: "error",
                message: action.payload,
            };
        },
        showInfoAlert(state, action) {
            state.alert = {
                showAlert: true,
                severity: "info",
                message: action.payload,
            };
        },
        showSuccessAlert(state, action) {
            state.alert = {
                showAlert: true,
                severity: "success",
                message: action.payload,
            };
        },
        resetAlert(state, action) {
            state.alert = { showAlert: false, severity: "", message: "" };
        },
        setOrderNotifications(state, action) {
            state.orderNotifications = {
                orderNotificationsList: action.payload,
                status: true,
            };
        },
        addNewOrderNotification(state, action) {
            state.orderNotifications = {
                orderNotificationsList: [
                    action.payload,
                    ...state.orderNotifications.orderNotificationsList,
                ],
                status: state.orderNotifications.status,
            };
        },
        removeOrderNotification(state, action) {
            const updatedOrderNotificationsList =
                state.orderNotifications.orderNotificationsList.filter(
                    (notification) => {
                        return notification._id !== action.payload;
                    }
                );
            state.orderNotifications = {
                orderNotificationsList: updatedOrderNotificationsList,
                status: state.orderNotifications.status,
            };
        },
    },
});

export const {
    showErrorAlert,
    showInfoAlert,
    showSuccessAlert,
    resetAlert,
    setOrderNotifications,
    addNewOrderNotification,
    removeOrderNotification,
} = alertSlice.actions;

export default alertSlice.reducer;

// Thunks
export function getOrderNotifications() {
    return async function getOrderNotificationsThunk(dispatch, getState) {
        const { status } = getState().alert.orderNotifications;
        try {
            if (status) return;
            const res = await axiosInstance.get(
                "/api/admin/orderNotifications"
            );
            dispatch(setOrderNotifications(res.data.orderNotifications));
        } catch (e) {
            console.log(e);
        }
    };
}
