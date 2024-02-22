// redux/actions.ts
import { AppThunk } from "./store";
import {
    fetchListingsStart,
    fetchListingsSuccess,
    fetchListingsFailure,
} from "./slices/listingsSlice";
import { getListingsAPI } from "./services/listings.api";

export const fetchListings = (): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchListingsStart());
        const data = await getListingsAPI();
        dispatch(fetchListingsSuccess(data));
    } catch (error: any) {
        dispatch(fetchListingsFailure(error.message));
    }
};
