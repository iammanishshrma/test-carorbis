import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints } from "@/shared/api/endpoints";

const getWishList = createAsyncThunk(
    "getWishList",
    async (payload, thunkApi) => {
        try {
            const response = await axiosInstance.get(
                catalogEndPoints.getWishList
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response.data.message;
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

const addToWishlist = createAsyncThunk(
    "addToWishlist",
    async ({ productid, sku, vendorId }, thunkApi) => {
        const payload = { productid, sku, vendorId };
        try {
            const response = await axiosInstance.post(
                catalogEndPoints.addToWishList,
                payload
            );
            thunkApi.dispatch(getWishList());
            return response.data;
        } catch (error) {
            const errorMessage = error.response.data.message;
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

const removeFromWishlist = createAsyncThunk(
    "removeFromWishlist",
    async (id, thunkApi) => {
        const payload = { wishListId: id };
        try {
            const response = await axiosInstance.post(
                catalogEndPoints.removeFromWishList,
                payload
            );

            thunkApi.dispatch(getWishList());
            return response.data;
        } catch (error) {
            const errorMessage = error.response.data.message;
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export { getWishList, addToWishlist, removeFromWishlist };
