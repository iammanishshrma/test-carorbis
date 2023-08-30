import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSystemIp = createAsyncThunk("systemIp", async () => {
    const response = axios.get("https://ipapi.co/json/");
    return response;
});

export const systemIpSlice = createSlice({
    name: "systemIp",
    initialState: {
        systemIp: "",
        countryCode: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSystemIp.fulfilled, (state, action) => {
            state.systemIp = action.payload.data.ip;
            state.countryCode = action.payload.data.country_calling_code;
        });
    },
});

export default systemIpSlice.reducer;
