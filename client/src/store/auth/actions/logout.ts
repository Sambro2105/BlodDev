import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import alertSlice from "../../alert/slice";
import ILogoutError from "../../../types/api/logout/error";
import authSlice from "../slice";

const logout = createAsyncThunk<
	void,
	undefined,
	{
		rejectValue: void;
	}
>("auth/logout", async (arg, thunkAPI) => {
	thunkAPI.dispatch(alertSlice.actions.loading());
	return await api
		.logout()
		.then(() => {})
		.catch((error: AxiosError) => {
			const logoutError = !!error.response
				? (error.response.data as ILogoutError)
				: { msg: error.message };
			thunkAPI.dispatch(alertSlice.actions.error(logoutError));
		})
		.finally(() => {
			thunkAPI.dispatch(authSlice.actions.clear());
			thunkAPI.dispatch(alertSlice.actions.notLoading());
			localStorage.removeItem("access_token");
		});
});

export default logout;
