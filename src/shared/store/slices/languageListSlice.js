import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminAxiosInstance } from "@/shared/api/axios";
import { adminEndPoints } from "@/shared/api/endpoints";
import Cookies from "js-cookie";

export const getLanguageList = createAsyncThunk("languageList", async () => {
    const response = adminAxiosInstance.get(adminEndPoints.languageList);
    return response;
});

export const languageListSlice = createSlice({
    name: "languageList",
    initialState: {
        language: "",
        countryCode: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLanguageList.fulfilled, (state, action) => {
            state.language = action.payload.data.data[0]._id;
            state.countryCode = action.payload.data.data[0].code;
            Cookies.set("langId", action.payload.data.data[0]._id);
            Cookies.set("countryCode", action.payload.data.data[0].code);
        });
    },
});

export default languageListSlice.reducer;
