import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "config/axios";
import { showErrorAlert, showSuccessAlert } from "./alertSlice";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlistProducts: { status: false, wishlistProductsList: [] },
    },
    reducers: {
        setWishlistProducts(state, action) {
            state.wishlistProducts = {
                status: true,
                wishlistProductsList: action.payload,
            };
        },
        removeWishlistProduct(state, action) {
            if (!state.wishlistProducts.status) return;

            const filteredProducts =
                state.wishlistProducts.wishlistProductsList.filter((p) => {
                    return p._id !== action.payload;
                });
            state.wishlistProducts = {
                ...state.wishlistProducts,
                wishlistProductsList: filteredProducts,
            };
        },
    },
});

export default wishlistSlice.reducer;
export const { setWishlistProducts, removeWishlistProduct } =
    wishlistSlice.actions;

// Thunks
export function addProductToWishlist(
    productId,
    setIsWishlistChecked,
    setIsWishlistCheckDisabled
) {
    return async function addProductToWishlistThunk(dispatch) {
        try {
            const res = await axiosInstance.post("/api/wishlists", {
                productId,
            });
            dispatch(showSuccessAlert(res.data.message));
            setIsWishlistChecked(true);
            setIsWishlistCheckDisabled(false);
        } catch (e) {
            console.log(e);
            setIsWishlistCheckDisabled(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function removeProductFromWishlist(
    productId,
    setIsWishlistChecked,
    setIsWishlistCheckDisabled
) {
    return async function removeProductFromWishlistThunk(dispatch) {
        try {
            const res = await axiosInstance.patch("/api/wishlists/wishlist", {
                productId,
            });
            dispatch(removeWishlistProduct(productId));
            dispatch(showSuccessAlert(res.data.message));
            setIsWishlistChecked(false);
            setIsWishlistCheckDisabled(false);
        } catch (e) {
            console.log(e);
            setIsWishlistCheckDisabled(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}
