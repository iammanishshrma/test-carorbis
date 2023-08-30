import { createSlice } from "@reduxjs/toolkit";
import { addVehicle, getGarageList, deleteVehicle } from "./garageActions";
import { notify } from "@/shared/utils/notifyToast";

const initialState = {
    garage: null,
    loading: false,
    error: null,
    message: null,
};

export const garageSlice = createSlice({
    name: "garageSlice",
    initialState,
    reducers: {
        clearState: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        //Get Garage List
        builder
            .addCase(getGarageList.pending, (state, action) => {
                state.error = false;
                state.loading = true;
            })
            .addCase(getGarageList.fulfilled, (state, action) => {
                state.garage = action.payload.data.garageList;
                state.error = false;
                state.loading = false;
            })
            .addCase(getGarageList.rejected, (state, action) => {
                state.error = true;
                notify.errorToast(action.payload);
                state.loading = false;
            });

        //Add Vehicle To Garage
        builder
            .addCase(addVehicle.pending, (state, action) => {
                state.error = false;
                state.loading = true;
            })
            .addCase(addVehicle.fulfilled, (state, action) => {
                state.error = false;
                notify.successToast(action.payload.message);
                state.loading = false;
            })
            .addCase(addVehicle.rejected, (state, action) => {
                state.error = true;
                notify.errorToast(action.payload);
                state.loading = false;
            });

        //Delete Vehicle From Garage
        builder
            .addCase(deleteVehicle.pending, (state, action) => {
                state.error = false;
                state.loading = true;
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.error = false;
                notify.successToast(action.payload.message);
                state.loading = false;
            })
            .addCase(deleteVehicle.rejected, (state, action) => {
                state.error = true;
                notify.errorToast(action.payload);
                state.loading = false;
            });
    },
});

export const { clearState } = garageSlice.actions;

export default garageSlice.reducer;
