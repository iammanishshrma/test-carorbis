import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '@/shared/api/axios';
import { userEndpoints } from '@/shared/api/endpoints';

export const getOtp = createAsyncThunk('getOtp', async (data, thunkAPI) => {
    // localStorage.removeItem("token");
    let response = await axiosInstance
        .post(userEndpoints.forgetpwdOtp, data)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return thunkAPI.rejectWithValue(error.response.data);
        });
    return response;
});

export const ForgetPassSlice = createSlice({
    name: 'forgetPwd',
    initialState: {
        loading: false,
        sucessStatus: false,
        notifyMsg: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOtp.pending, (state, action) => {
            state.notifyMsg = null;
            state.loading = true;
        });
        builder.addCase(getOtp.fulfilled, (state, action) => {
            state.notifyMsg = action.payload.message;
            state.getOtp = action.payload.data;
            // localStorage.setItem("token", action.payload.data.token);
            state.sucessStatus = true;
            state.loading = false;
        });
        builder.addCase(getOtp.rejected, (state, action) => {
            state.notifyMsg = action.payload.message;
            state.loading = false;
            state.sucessStatus = false;
        });
    },
});
export default ForgetPassSlice.reducer;
