// redux/slices/listingsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { getListingsAPI } from "../../services/listings.api";

interface ListingsState {
    loading: boolean;
    error: string | null;
    data: any[]; // Adjust the type according to your API response structure
}

const initialState: ListingsState = {
    loading: false,
    error: null,
    data: [],
};

const listingsSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {
        fetchListingsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchListingsSuccess(state, action: PayloadAction<any[]>) {
            state.loading = false;
            state.data = action.payload;
        },
        fetchListingsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchListingsStart,
    fetchListingsSuccess,
    fetchListingsFailure,
} = listingsSlice.actions;

export default listingsSlice.reducer;
