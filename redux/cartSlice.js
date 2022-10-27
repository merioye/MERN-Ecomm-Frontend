import { createSlice } from "@reduxjs/toolkit";
import { showErrorAlert, showSuccessAlert } from "redux/alertSlice";
import { getUser } from "redux/authSlice";
import axiosInstance from "config/axios";

const updateCartItems = (cartItems, product, type, dispatch) => {
    if (type === "inc") {
        let isItemAlreadyPresent = false;
        const updatedItems = [];

        for (let item of cartItems) {
            if (item.product._id === product._id) {
                // if available stock is less or equal to the quantity of item added to cart then do not increase quantity(update cartItems) and return same cartItems value
                if (product.stock <= item.quantity) {
                    dispatch(
                        showErrorAlert(
                            `Only ${product.stock} quantity available`
                        )
                    );
                    return { isUpdated: false, updatedCartItems: cartItems };
                }

                updatedItems.push({ ...item, quantity: item.quantity + 1 });
                isItemAlreadyPresent = true;
            } else {
                updatedItems.push(item);
            }
        }
        if (!isItemAlreadyPresent)
            updatedItems.unshift({ quantity: 1, product: product });
        return { isUpdated: true, updatedCartItems: updatedItems };
    } else if (type === "dec") {
        const updatedItems = [];

        for (let item of cartItems) {
            if (item.product._id === product._id) {
                // if cart item's qunatity is one then simply skip that product to push in updatedItems
                if (item.quantity == 1) {
                    continue;
                }
                updatedItems.push({ ...item, quantity: item.quantity - 1 });
            } else {
                updatedItems.push(item);
            }
        }
        return { isUpdated: true, updatedCartItems: updatedItems };
    } else if (type == "remove") {
        const updatedItems = cartItems.filter(
            (item) => item.product._id !== product._id
        );
        return { isUpdated: true, updatedCartItems: updatedItems };
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        note: "",
        voucher: null,
        isCartItemsFetched: false,
    },
    reducers: {
        setCartItems(state, action) {
            state.cartItems = action.payload;
            state.isCartItemsFetched = true;
        },
        setNoteValue(state, action) {
            state.note = action.payload;
        },
        setVoucher(state, action) {
            state.voucher = action.payload;
        },
        emptyMyCart(state, action) {
            state.cartItems = [];
            state.note = "";
            state.voucher = null;
            state.isCartItemsFetched = false;
        },
    },
});

export const { setCartItems, setNoteValue, setVoucher, emptyMyCart } =
    cartSlice.actions;
export default cartSlice.reducer;

// Thunks
export function getCartItems() {
    return async function getCartItemsThunk(dispatch) {
        try {
            const res = await axiosInstance.get("/api/carts/cart");
            const { products } = res.data.cart;
            dispatch(setCartItems(products));
            dispatch(getUser());
        } catch (e) {
            console.log(e);
        }
    };
}

export function updateCart(count, setCount, product, type, setIsBtnDisabled) {
    return async function updateCartThunk(dispatch, getState) {
        const { cartItems } = getState().cart;
        try {
            const { isUpdated, updatedCartItems } = updateCartItems(
                cartItems,
                product,
                type,
                dispatch
            );
            if (!isUpdated) {
                setIsBtnDisabled(false);
                return;
            }

            let orderTotalAmount = 0;
            const dataToUpdateInBackend = updatedCartItems.map((p) => {
                orderTotalAmount =
                    orderTotalAmount +
                    (p.product.isOnSale
                        ? p.product.salePrice
                        : p.product.regularPrice) *
                        p.quantity;
                return { quantity: p.quantity, product: p.product._id };
            });

            const res = await axiosInstance.put("/api/carts/cart", {
                updatedProducts: dataToUpdateInBackend,
                orderTotalAmount,
            });

            if (setCount) {
                const newCount = type === "inc" ? count + 1 : count - 1;
                setCount(newCount);
            }

            dispatch(setCartItems(updatedCartItems));
            setIsBtnDisabled(false);

            if (Boolean(res.data.isVoucherRemoved)) {
                dispatch(setVoucher({ code: "", percentage: 0 }));
                dispatch(
                    showErrorAlert(
                        `Voucher has been removed because minimum ${res.data.minimumAmountForVoucher} is required to avail this voucher`
                    )
                );
            }
        } catch (e) {
            console.log(e);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function applyVoucher(
    values,
    setShowLoader,
    setVoucherStatus,
    setDiscountPercentage
) {
    return async function applyVoucherThunk(dispatch) {
        try {
            const res = await axiosInstance.patch("/api/carts/cart", values);
            setShowLoader(false);
            setVoucherStatus("valid");
            setDiscountPercentage(res.data.voucher.percentage);
            dispatch(showSuccessAlert(res.data.message));
            dispatch(
                setVoucher({
                    code: res.data.voucher.code,
                    percentage: res.data.voucher.percentage,
                })
            );
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            setVoucherStatus("invalid");
            dispatch(showErrorAlert(e.response.data.message));
            setTimeout(() => {
                setVoucherStatus("");
            }, 2000);
        }
    };
}
