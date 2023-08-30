import { createSlice } from "@reduxjs/toolkit";

import {
    getWishList,
    addToWishlist,
    removeFromWishlist,
} from "./wishListActions";
import { notify } from "@/shared/utils/notifyToast";

const localWishlist =
    typeof window !== "undefined"
        ? localStorage.getItem("wishList")
            ? JSON.parse(localStorage.getItem("wishList"))
            : []
        : [];

const initialState = {
    wishList: localWishlist,
    loading: false,
    error: null,
};

export const wishListSlice = createSlice({
    name: "wishListSlice",
    initialState,
    reducers: {
        addToWishlistLocal: (state, action) => {
            const productId = action.payload;
            const itemAlreadyExist = state.wishList.find(
                (item) => item._id === productId
            );
            if (!itemAlreadyExist) {
                const updatedList = state?.wishList
                    ? [...state.wishList, { productId }]
                    : [{ productId }];
                state.wishList = updatedList;
                localStorage.setItem("wishList", JSON.stringify(updatedList));
            }
        },
        removeFromWishlistLocal: (state, action) => {
            const productId = action.payload;
            const itemAlreadyExist = state.wishList.find(
                (item) => item._id === productId
            );
            if (itemAlreadyExist) {
                const updatedList = state.wishList.filter(
                    (item) => item._id !== productId
                );
                state.wishList = updatedList;
                localStorage.setItem("wishList", JSON.stringify(updatedList));
            }
        },
    },
    extraReducers: (builder) => {
        //Get Wishlist Products
        builder
            .addCase(getWishList.pending, (state, action) => {
                state.error = false;
                state.loading = true;
            })
            .addCase(getWishList.fulfilled, (state, action) => {
                state.wishList = action.payload.data;
                state.error = false;
                state.loading = false;
            })
            .addCase(getWishList.rejected, (state, action) => {
                state.error = true;
                notify.errorToast(action.payload);
                state.loading = false;
            });

        //Add Product To Wishlist
        builder
            .addCase(addToWishlist.pending, (state, action) => {
                state.error = false;
                state.loading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.error = false;
                notify.successToast(action.payload.message);
                state.loading = false;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.error = true;
                notify.errorToast(action.payload);
                state.loading = false;
            });

        2;
        builder
            .addCase(removeFromWishlist.pending, (state, action) => {
                state.error = false;
                state.loading = true;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.error = false;
                notify.successToast(action.payload.message);
                state.loading = false;
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.error = true;
                notify.errorToast(action.payload);
                state.loading = false;
            });
    },
});

export const { addToWishlistLocal, removeFromWishlistLocal } =
    wishListSlice.actions;

export default wishListSlice.reducer;
