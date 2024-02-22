import { combineReducers } from "redux";
import { dashboardSlice } from "./slices/dashboard/index";
import listingsReducer from "./slices/listingsSlice"; // Adjust the import statement

const rootReducer = combineReducers({
    dashboard: dashboardSlice.reducer,
    listings: listingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
