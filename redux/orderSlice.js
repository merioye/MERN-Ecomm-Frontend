import { createSlice } from "@reduxjs/toolkit";
import { showErrorAlert, showSuccessAlert } from "redux/alertSlice";
import { emptyMyCart } from "redux/cartSlice";
import axiosInstance from "config/axios";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: {
            // These orders will be rendered in admin pannel
            status: false,
            ordersList: [],
        },
        customerOrders: {
            // These orders will be rendered in customer orders page
            status: false,
            ordersList: [],
        },
        customerSingleOrder: {
            status: false,
            customerOrder: null,
        },
    },
    reducers: {
        setOrders(state, action) {
            state.orders = { status: true, ordersList: action.payload };
        },
        addNewOrder(state, action) {
            state.orders = {
                ...state.orders,
                ordersList: [action.payload, ...state.orders.ordersList],
            };
        },
        resetOrdersStatus(state, action) {
            state.orders = {
                status: false,
                ordersList: state.orders.ordersList,
            };
        },
        setCustomerOrders(state, action) {
            state.customerOrders = {
                status: true,
                ordersList: action.payload,
            };
        },
        updateCustomerOrder(state, action) {
            if (state.customerOrders.ordersList.length) {
                const updatedOrders = state.customerOrders.ordersList.map(
                    (order) => {
                        return order._id === action.payload._id
                            ? action.payload
                            : order;
                    }
                );
                state.customerOrders = {
                    ...state.customerOrders,
                    ordersList: updatedOrders,
                };
            }
            if (
                state.customerSingleOrder.customerOrder &&
                state.customerSingleOrder.customerOrder._id ===
                    action.payload._id
            ) {
                state.customerSingleOrder = {
                    ...state.customerSingleOrder,
                    customerOrder: action.payload,
                };
            }
        },
        setCustomerSingleOrder(state, action) {
            state.customerSingleOrder = {
                status: true,
                customerOrder: action.payload,
            };
        },
    },
});

export default orderSlice.reducer;
export const {
    setOrders,
    addNewOrder,
    resetOrdersStatus,
    setCustomerOrders,
    updateCustomerOrder,
    setCustomerSingleOrder,
} = orderSlice.actions;

export function placeOrder(values, setShowLoader, router) {
    return async function placeOrderThunk(dispatch, getState) {
        const { socket } = getState().socket;
        try {
            const res = await axiosInstance.post(`/api/orders`, values);

            setShowLoader(false);
            dispatch(emptyMyCart());
            dispatch(showSuccessAlert(res.data.message));
            socket.emit("newOrderNotification", {
                newOrder: res.data.newOrder,
                notification: res.data.orderNotification,
                userId: "admin",
            });
            router.push("/orders");
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function updateOrderStatus(values, orderId, userId, setShowLoader) {
    return async function updateOrderStatusThunk(dispatch, getState) {
        const { socket } = getState().socket;
        try {
            const res = await axiosInstance.patch(
                `/api/admin/orders/${orderId}`,
                values
            );
            setShowLoader(false);
            dispatch(
                showSuccessAlert("Order status has been updated successfully")
            );
            socket.emit("orderStatusUpdate", {
                updatedOrder: res.data.updatedOrder,
                userId,
            });
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}
