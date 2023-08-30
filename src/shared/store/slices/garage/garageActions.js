import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "@/shared/api/axios";
import { catalogEndPoints } from "@/shared/api/endpoints";

const getGarageList = createAsyncThunk(
    "getGarageList",
    async (payload, thunkApi) => {
        try {
            const response = await axiosInstance.get(
                catalogEndPoints.getGarage
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response.data.message;
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

const addVehicle = createAsyncThunk("addVehicle", async (payload, thunkApi) => {
    const closePopUp = payload.closePopUp;
    delete payload.closePopUp;
    try {
        const response = await axiosInstance.post(
            catalogEndPoints.addItemToGarage,
            payload
        );

        thunkApi.dispatch(getGarageList());

        closePopUp();
        return response.data;
    } catch (error) {
        const errorMessage = error.response.data.message;
        return thunkApi.rejectWithValue(errorMessage);
    }
});

const deleteVehicle = createAsyncThunk(
    "deleteVehicle",
    async (payload, thunkApi) => {
        try {
            const response = await axiosInstance.post(
                catalogEndPoints.deleteGarage,
                payload
            );

            thunkApi.dispatch(getGarageList());
            return response.data;
        } catch (error) {
            const errorMessage = error.response.data.message;
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export { addVehicle, getGarageList, deleteVehicle };
