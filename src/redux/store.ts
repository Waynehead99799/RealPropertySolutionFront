import { AnyAction, configureStore, Store } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import rootReducer, { RootState } from "./reducers";
import listingsReducer from "./slices/listingsSlice";
import { ThunkAction } from "redux-thunk"; // Import ThunkAction type from redux-thunk

// Define AppThunk type
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: any, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };

        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

export const getStore = () => {
    return configureStore({
        reducer: {
            dashboard: rootReducer, // Assuming 'rootReducer' corresponds to your dashboard reducer
            listings: listingsReducer,
        },
    });
};

setupListeners(getStore().dispatch);

const makeStore: MakeStore<Store<RootState>> = () => {
    return getStore() as Store<RootState>;
};

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
    debug: false,
});

export default makeStore;
