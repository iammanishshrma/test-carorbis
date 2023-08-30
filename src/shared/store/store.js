import { configureStore } from "@reduxjs/toolkit";

import SignInSlice from "./slices/SignInSlice";
import languageListSlice from "./slices/languageListSlice";
import ForgetPassSlice from "./slices/ForgetPassSlice";
import systemIpSlice from "./slices/systemIpSlice";
import checkLoginSlice from "./slices/checkLoginSlice";
import getUserSlice from "./slices/getUserSlice";
import addressSlice from "./slices/addressSlice";
import filterSlice from "./slices/filterSlice";
import wishListSlice from "./slices/wishlist/wishListSlice";
import garageSlice from "./slices/garage/garageSlice";

const store = configureStore({
    reducer: {
        SignInSlice: SignInSlice,
        languageListSlice,
        ForgetPassSlice,
        systemIpSlice,
        checkLoginSlice,
        getUserSlice,
        addressData: addressSlice,
        filterSlice,
        wishList: wishListSlice,
        garageList: garageSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;
