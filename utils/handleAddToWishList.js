import {
    addProductToWishlist,
    removeProductFromWishlist,
} from "redux/wishlistSlice";

const handleAddToWishList = (
    value,
    productId,
    setIsWishlistChecked,
    setIsWishlistCheckDisabled,
    dispatch
) => {
    setIsWishlistCheckDisabled(true);
    if (value === true) {
        dispatch(
            addProductToWishlist(
                productId,
                setIsWishlistChecked,
                setIsWishlistCheckDisabled
            )
        );
    } else {
        dispatch(
            removeProductFromWishlist(
                productId,
                setIsWishlistChecked,
                setIsWishlistCheckDisabled
            )
        );
    }
};

export default handleAddToWishList;
