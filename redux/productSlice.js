import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "config/axios";
import { showErrorAlert, showSuccessAlert } from "redux/alertSlice";

const productSlice = createSlice({
    name: "product",
    initialState: {
        showFiltersSidebar: false,
        showUserDashboardSidebar: false,
        showSidebarOnMobile: false,
        brands: {
            // It contains paginated brands
            status: false, // status represents whether data is fetched from api or not
            brandsList: [],
        },
        allBrands: [], // It contains all the the brands available in db
        categories: {
            status: false,
            categoriesList: [],
        },
        allCategories: [],
        users: {
            status: false,
            usersList: [],
        },
        products: {
            status: false,
            all: [],
        },
        coupons: {
            status: false,
            couponsList: [],
        },
        reviews: {
            status: false,
            reviewsList: [],
        },
    },
    reducers: {
        toggleFiltersVisibility(state, action) {
            state.showFiltersSidebar = action.payload;
        },
        toggleUserDashboardVisibility(state, action) {
            state.showUserDashboardSidebar = action.payload;
        },
        toggleMobileSidebar(state, action) {
            state.showSidebarOnMobile = action.payload;
        },
        setBrands(state, action) {
            state.brands = { status: true, brandsList: action.payload };
        },
        resetBrandsStatus(state, action) {
            state.brands = {
                status: false,
                brandsList: state.brands.brandsList,
            };
        },
        setAllBrands(state, action) {
            state.allBrands = action.payload;
        },
        setCategories(state, action) {
            state.categories = { status: true, categoriesList: action.payload };
        },
        resetCategoriesStatus(state, action) {
            state.categories = {
                status: false,
                categoriesList: state.categories.categoriesList,
            };
        },
        setAllCategories(state, action) {
            state.allCategories = action.payload;
        },
        setUsers(state, action) {
            state.users = { status: true, usersList: action.payload };
        },
        resetUsersStatus(state, action) {
            state.users = { status: false, usersList: state.users.usersList };
        },
        setProducts(state, action) {
            state.products = {
                ...state.products,
                status: true,
                [action.payload.productType]: action.payload.products,
            };
        },
        resetProductsStatus(state, action) {
            state.products = { ...state.products, status: false };
        },
        setCoupons(state, action) {
            state.coupons = { status: true, couponsList: action.payload };
        },
        resetCouponsStatus(state, action) {
            state.coupons = {
                status: false,
                couponsList: state.coupons.couponsList,
            };
        },
        setReviews(state, action) {
            state.reviews = { status: true, reviewsList: action.payload };
        },
        resetReviewsStatus(state, action) {
            state.reviews = {
                status: false,
                reviewsList: state.reviews.reviewsList,
            };
        },
    },
});

export const {
    toggleFiltersVisibility,
    toggleUserDashboardVisibility,
    toggleMobileSidebar,
    setBrands,
    resetBrandsStatus,
    setAllBrands,
    setCategories,
    resetCategoriesStatus,
    setAllCategories,
    setUsers,
    resetUsersStatus,
    setProducts,
    resetProductsStatus,
    setCoupons,
    resetCouponsStatus,
    setReviews,
    resetReviewsStatus,
} = productSlice.actions;

export default productSlice.reducer;

// Thunks
export function getAllBrands() {
    return async function getAllBrandsThunk(dispatch) {
        try {
            const res = await axiosInstance.get("/api/brands");
            dispatch(setAllBrands(res.data.result));
        } catch (e) {
            console.log(e);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function createBrand(values, setShowLoader, router) {
    return async function createBrandThunk(dispatch) {
        try {
            await axiosInstance.post("/api/admin/brands", values);
            router.push("/admin/brands");
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function updateBrand(values, item, setShowLoader, router, pageCount) {
    return async function updateBrandThunk(dispatch, getState) {
        const { brandsList } = getState().product.brands;
        try {
            const res = await axiosInstance.put(
                `/api/admin/brands/${item._id}`,
                values
            );
            const { updatedBrand } = res.data;

            const updatedBrands = brandsList.map((brand) =>
                brand._id === updatedBrand._id ? updatedBrand : brand
            );
            dispatch(setBrands(updatedBrands));
            setShowLoader(false);

            if (router) {
                if (pageCount === 1) {
                    router.push("/admin/brands");
                } else {
                    router.push(`/admin/brands?page=${pageCount}`);
                }
            }
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function deleteBrand(brandId, setShowLoader, pageCount, router) {
    return async function deleteBrandThunk(dispatch, getState) {
        const { brandsList } = getState().product.brands;
        try {
            await axiosInstance.delete(`/api/admin/brands/${brandId}`);
            const updatedBrands = brandsList.filter(
                (brand) => brand._id !== brandId
            );
            dispatch(setBrands(updatedBrands));

            if (pageCount) {
                if (brandsList.length) {
                    dispatch(resetBrandsStatus());
                    router.push(`/admin/brands?page=${pageCount}`);
                } else {
                    const newPageCount = Number(pageCount) - 1;
                    if (newPageCount === 1) {
                        router.push("/admin/brands");
                    } else {
                        router.push(`/admin/brands?page=${newPageCount}`);
                    }
                }
            } else {
                router.push("/admin/brands");
            }
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function getAllCategories() {
    return async function getAllCategoriesThunk(dispatch) {
        try {
            const res = await axiosInstance.get("/api/categories");
            dispatch(setAllCategories(res.data.result));
        } catch (e) {
            console.log(e);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function createCategory(values, setShowLoader, router) {
    return async function createCategoryThunk(dispatch) {
        try {
            await axiosInstance.post("/api/admin/categories", values);
            router.push("/admin/categories");
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function updateCategory(values, item, setShowLoader, router, pageCount) {
    return async function updateCategoryThunk(dispatch, getState) {
        const { categoriesList } = getState().product.categories;
        try {
            const res = await axiosInstance.put(
                `/api/admin/categories/${item._id}`,
                values
            );
            const { updatedCategory } = res.data;

            const updatedCategories = categoriesList.map((category) =>
                category._id === updatedCategory._id
                    ? updatedCategory
                    : category
            );
            dispatch(setCategories(updatedCategories));
            setShowLoader(false);

            if (router) {
                if (pageCount === 1) {
                    router.push("/admin/categories");
                } else {
                    router.push(`/admin/categories?page=${pageCount}`);
                }
            }
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function deleteCategory(categoryId, setShowLoader, pageCount, router) {
    return async function deleteCategoryThunk(dispatch, getState) {
        const { categoriesList } = getState().product.categories;
        try {
            await axiosInstance.delete(`/api/admin/categories/${categoryId}`);
            const updatedCategories = categoriesList.filter(
                (category) => category._id !== categoryId
            );
            dispatch(setCategories(updatedCategories));

            if (pageCount) {
                if (categoriesList.length) {
                    dispatch(resetCategoriesStatus());
                    router.push(`/admin/categories?page=${pageCount}`);
                } else {
                    const newPageCount = Number(pageCount) - 1;
                    if (newPageCount === 1) {
                        router.push("/admin/categories");
                    } else {
                        router.push(`/admin/categories?page=${newPageCount}`);
                    }
                }
            } else {
                router.push("/admin/categories");
            }
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function toggleUserRole(value, userId, setShowLoader) {
    return async function toggleUserRoleThunk(dispatch, getState) {
        const { usersList } = getState().product.users;
        try {
            const res = await axiosInstance.patch(
                `/api/admin/users/${userId}`,
                value
            );
            const { updatedUser } = res.data;

            const updatedUsers = usersList.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
            );
            dispatch(setUsers(updatedUsers));
            setShowLoader(false);
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function deleteUser(userId, setShowLoader, pageCount, router) {
    return async function deleteUserThunk(dispatch, getState) {
        const { usersList } = getState().product.users;
        try {
            await axiosInstance.delete(`/api/admin/users/${userId}`);
            const updatedUsers = usersList.filter(
                (user) => user._id !== userId
            );
            dispatch(setUsers(updatedUsers));

            if (pageCount) {
                if (usersList.length) {
                    dispatch(resetUsersStatus());
                    router.push(`/admin/users?page=${pageCount}`);
                } else {
                    const newPageCount = Number(pageCount) - 1;
                    if (newPageCount === 1) {
                        router.push("/admin/users");
                    } else {
                        router.push(`/admin/users?page=${newPageCount}`);
                    }
                }
            } else {
                router.push("/admin/users");
            }
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function createProduct(values, setShowLoader, router) {
    return async function createProductThunk(dispatch) {
        try {
            await axiosInstance.post("/api/admin/products", values);
            router.push("/admin/products");
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function updateProduct(values, item, setShowLoader, router, pageCount) {
    return async function updateProductThunk(dispatch, getState) {
        const { all } = getState().product.products;
        try {
            const res = await axiosInstance.put(
                `/api/admin/products/${item._id}`,
                values
            );
            const { updatedProduct } = res.data;

            const updatedProducts = all.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
            );
            dispatch(
                setProducts({ productType: "all", products: updatedProducts })
            );
            setShowLoader(false);

            if (router) {
                if (pageCount === 1) {
                    router.push("/admin/products");
                } else {
                    router.push(`/admin/products?page=${pageCount}`);
                }
            }
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function deleteProduct(productId, setShowLoader, pageCount, router) {
    return async function deleteProductThunk(dispatch, getState) {
        const { all } = getState().product.products;
        try {
            await axiosInstance.delete(`/api/admin/products/${productId}`);

            const updatedProducts = all.filter(
                (product) => product._id !== productId
            );
            dispatch(
                setProducts({ productType: "all", products: updatedProducts })
            );

            if (pageCount) {
                if (all.length) {
                    dispatch(resetProductsStatus());
                    router.push(`/admin/products?page=${pageCount}`);
                } else {
                    const newPageCount = Number(pageCount) - 1;
                    if (newPageCount === 1) {
                        router.push("/admin/products");
                    } else {
                        router.push(`/admin/products?page=${newPageCount}`);
                    }
                }
            } else {
                router.push("/admin/products");
            }
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function createCoupon(values, setShowLoader, router) {
    return async function createCouponThunk(dispatch) {
        try {
            await axiosInstance.post("/api/admin/coupons", values);
            router.push("/admin/coupons");
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function updateCoupon(values, item, setShowLoader, router, pageCount) {
    return async function updateCouponThunk(dispatch, getState) {
        const { couponsList } = getState().product.coupons;
        try {
            const res = await axiosInstance.put(
                `/api/admin/coupons/${item._id}`,
                values
            );
            const { updatedCoupon } = res.data;

            const updatedCoupons = couponsList.map((coupon) =>
                coupon._id === updatedCoupon._id ? updatedCoupon : coupon
            );
            dispatch(setCoupons(updatedCoupons));
            setShowLoader(false);

            if (pageCount === 1) {
                router.push("/admin/coupons");
            } else {
                router.push(`/admin/coupons?page=${pageCount}`);
            }
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function deleteCoupon(couponId, setShowLoader, pageCount, router) {
    return async function deleteCouponThunk(dispatch, getState) {
        const { couponsList } = getState().product.coupons;
        try {
            await axiosInstance.delete(`/api/admin/coupons/${couponId}`);

            const updatedCoupons = couponsList.filter(
                (coupon) => coupon._id !== couponId
            );
            dispatch(setCoupons(updatedCoupons));

            if (pageCount) {
                if (couponsList.length) {
                    dispatch(resetCouponsStatus());
                    router.push(`/admin/coupons?page=${pageCount}`);
                } else {
                    const newPageCount = Number(pageCount) - 1;
                    if (newPageCount === 1) {
                        router.push("/admin/coupons");
                    } else {
                        router.push(`/admin/coupons?page=${newPageCount}`);
                    }
                }
            } else {
                router.push("/admin/coupons");
            }
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function addReview(
    values,
    reviews,
    setReviews,
    setUserRating,
    setValues,
    setShowLoader
) {
    return async function addReviewThunk(dispatch) {
        try {
            const res = await axiosInstance.post("/api/reviews", values);

            const filteredReviews = reviews.filter(
                (r) => r._id !== res.data.review._id
            );
            setReviews([res.data.review, ...filteredReviews]);
            setUserRating(0);
            setValues({ review: " " });
            setShowLoader(false);
            dispatch(showSuccessAlert(res.data.message));
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}

export function deleteReview(reviewId, setShowLoader, pageCount, router) {
    return async function deleteReviewThunk(dispatch, getState) {
        const { reviewsList } = getState().product.reviews;
        try {
            await axiosInstance.delete(`/api/admin/reviews/${reviewId}`);
            const updatedReviews = reviewsList.filter(
                (review) => review._id !== reviewId
            );
            dispatch(setReviews(updatedReviews));

            if (pageCount) {
                if (reviewsList.length) {
                    dispatch(resetReviewsStatus());
                    router.push(`/admin/products/reviews?page=${pageCount}`);
                } else {
                    const newPageCount = Number(pageCount) - 1;
                    if (newPageCount === 1) {
                        router.push("/admin/products/reviews");
                    } else {
                        router.push(
                            `/admin/products/reviews?page=${newPageCount}`
                        );
                    }
                }
            } else {
                router.push("/admin/products/reviews");
            }
        } catch (e) {
            console.log(e);
            setShowLoader(false);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };
}
