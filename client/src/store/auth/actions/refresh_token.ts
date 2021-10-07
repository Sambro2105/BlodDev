import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import alertSlice from "../../alert/slice";
import IRefreshTokenResponse from "../../../types/api/refresh_token/response";

const refresh_token = createAsyncThunk<
	IRefreshTokenResponse,
	undefined,
	{
		rejectValue: void;
	}
>("auth/refresh_token", async (arg, thunkAPI) => {
	thunkAPI.dispatch(alertSlice.actions.loading());
	return await api
		.refresh_token()
		.then(value => {
			localStorage.setItem("access_token", value.data.access_token);
			return value.data;
		})
		.finally(() => {
			thunkAPI.dispatch(alertSlice.actions.notLoading());
		});
});

export default refresh_token;
