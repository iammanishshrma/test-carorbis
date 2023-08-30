import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '@/shared/api/axios';
import { userEndpoints } from '@/shared/api/endpoints';

const initialState = {
    addressList: null,
};

export const getAddresses = createAsyncThunk('/getAddress', async (payload, thunkAPI) => {
    return axiosInstance
        .get(userEndpoints.getAddress)
        .then((res) => res.data)
        .catch((error) => {
            return thunkAPI.rejectWithValue(error?.response?.data);
        });
});

const addressSlice = createSlice({
    name: 'addressSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAddresses.fulfilled, (state, action) => {
            state.addressList = action.payload.data;
        });
        builder.addCase(getAddresses.rejected, (state, action) => {
            state.addressList = [];
        });
    },
});

export default addressSlice.reducer;
