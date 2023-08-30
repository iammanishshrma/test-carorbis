import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const filterSlice = createSlice({
    name: "filterSlice",
    initialState,
    reducers: {
        // NEED ID, NAME, TYPE in payload
        addFilter: (state, action) => {
            if (action.payload?.filters?.length === 0) {
                delete state?.[action.payload.filterType];
            } else {
                state[action.payload.filterType] = action.payload.filters;
            }
        },
        addAttributeFilter: (state, action) => {
            if (state?.attributesList?.includes(action.payload)) {
                state.attributesList = state.attributesList.filter(
                    (item) => item != action.payload
                );
            } else if (state.attributesList?.length > 0) {
                state.attributesList = [
                    ...state.attributesList,
                    action.payload,
                ];
            } else {
                state.attributesList = [action.payload];
            }
        },
        addFitment: (state, action) => {
            if (state?.[action.payload.filterType]) {
                delete state?.[action.payload.filterType];
            } else {
                state[action.payload.filterType] = true;
            }
        },
        addSorting: (state, action) => {
            if (action.payload !== null) {
                const isSort =
                    action.payload === "Price_low_to_high" ||
                    action.payload === "Price_high_to_low" ||
                    action.payload === "discount";
                if (isSort) {
                    state.sortby = action.payload;
                    delete state?.productIdentifier;
                } else {
                    state.productIdentifier = action.payload;
                    delete state?.sortBy;
                }
            } else {
                delete state?.sortby;
                delete state?.productIdentifier;
            }
        },
        removeFilter: (state, action) => {
            const filterType = action.payload.type;
            const filterId = action.payload.id;
            let isSingleFilter = filterType === "universalFit";

            if (filterType === "minPrice") {
                delete state?.minPrice;
                isSingleFilter = true;
            } else if (filterType === "maxPrice") {
                delete state?.maxPrice;
                isSingleFilter = true;
            }

            if (isSingleFilter) {
                delete state?.[filterType];
            } else {
                state[filterType] = state[filterType].filter(
                    (item) => item !== filterId
                );
            }
            if (!isSingleFilter && state?.[filterType].length === 0) {
                delete state[filterType];
            }
        },
        removeAttributeById: (state, action) => {
            const id = action.payload;
            state.attributesList = state.attributesList.filter(
                (item) => item !== id
            );
        },
        removeAllFilters: (state, action) => {
            Object.keys(state).forEach((key) => delete state[key]);
        },
    },
});

export const {
    addFilter,
    addAttributeFilter,
    addSorting,
    addFitment,
    removeAllFilters,
    removeAttributeById,
    removeFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
