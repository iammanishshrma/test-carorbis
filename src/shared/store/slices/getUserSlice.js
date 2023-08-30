import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { axiosInstance } from "@/shared/api/axios";
import { userEndpoints } from "@/shared/api/endpoints";

const initialState = {
    img: null,
    name: "",
    mobile: "",
    email: "",
    id: "",
};

export const getUserDetail = createAsyncThunk("getUserDetail", async () => {
    const response = axiosInstance.get(userEndpoints.getUser);
    return response;
});

export const getUserSlice = createSlice({
    name: "getUserState",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserDetail.fulfilled, (state, action) => {
            state.name = action.payload.data.data.name;
            state.email = action.payload.data.data.email;
            state.mobile = action.payload.data.data.mobile;
            state.id = action.payload.data.data._id;
            state.img = action.payload.data.data.image;
            state.isVerifiedMobile = action.payload.data.data.isVerifiedMobile;
            state.isVerifiedEmail = action.payload.data.data.isVerifiedEmail;
        });
    },
});

export default getUserSlice.reducer;
