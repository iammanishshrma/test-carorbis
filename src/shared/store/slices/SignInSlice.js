import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { axiosInstance } from "@/shared/api/axios";
import { userEndpoints } from "@/shared/api/endpoints";
import { getWishList } from "./wishlist/wishListActions";
import { notify } from "@/shared/utils/notifyToast";

export const SignInSlice = createSlice({
    name: "SignInData",
    initialState: {
        loading: false,
        sucessStatus: null,
    },
    reducers: {
        SignInData: (state, action) => {
            if (action.payload.type === "loading") {
                state.loading = true;
            } else if (action.payload.type === "loaded") {
                state.loading = false;
            }
            state.SignInData = action.payload;
            state.sucessStatus = action.payload.payload?.status;
        },
    },
});

export const GetLogin = (data, router, navigateRoute) => async (dispatch) => {
    dispatch(SignInData({ type: "loading" }));
    try {
        const response = await axiosInstance.post(
            userEndpoints.VerifyOtp,
            data
        );
        dispatch(SignInData({ type: "loaded", payload: response.data }));
        notify.successToast(response.data.message);
        localStorage.setItem("authToken", response.data.data.token);
        Cookies.set("authToken", response.data.data.token, {
            expires: 1,
            priority: "High",
        });
        setTimeout(() => {
            router.push(navigateRoute);
        }, 800);
    } catch (err) {
        dispatch(SignInData({ type: "loaded" }));
        notify.errorToast(err.response.data.message);
    }
};

export const loginWithEmail =
    (data, router, navigateRoute) => async (dispatch) => {
        dispatch(SignInData({ type: "loading" }));
        try {
            const response = await axiosInstance.post(
                userEndpoints.SignIn,
                data
            );
            dispatch(SignInData({ type: "loaded", payload: response.data }));
            notify.successToast(response.data.message);
            localStorage.setItem("authToken", response.data.data.token);
            Cookies.set("authToken", response.data.data.token, {
                expires: 1,
                priority: "High",
            });
            dispatch(getWishList());
            setTimeout(() => {
                router.push(navigateRoute);
            }, 800);
        } catch (err) {
            dispatch(SignInData({ type: "loaded" }));
            notify.errorToast(err.response?.data?.message);
        }
    };

export const loginWithPhone = (data) => async (dispatch) => {
    dispatch(SignInData({ type: "loading" }));
    try {
        const response = await axiosInstance.post(userEndpoints.LoginMob, data);
        dispatch(
            SignInData({
                type: "loaded",
                payload: response.data,
            })
        );
        notify.successToast(response.data.message);
    } catch (err) {
        dispatch(SignInData({ type: "loaded" }));
        notify.errorToast(err.response.data.message);
    }
};

export const { SignInData } = SignInSlice.actions;
export default SignInSlice.reducer;
