import { combineReducers } from "redux";
import authSlice from "./auth/slice";
import alertSlice from "./alert/slice";

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	alert: alertSlice.reducer,
});

export default rootReducer;
