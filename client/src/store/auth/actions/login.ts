import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import alertSlice from "../../alert/slice";
import ILoginRequest from "../../../types/api/login/request";
import ILoginResponse from "../../../types/api/login/response";
import ILoginError from "../../../types/api/login/error";

const login = createAsyncThunk<
	ILoginResponse,
	ILoginRequest,
	{
		rejectValue: void;
	}
>("auth/login", async (loginRequest, thunkAPI) => {
	thunkAPI.dispatch(alertSlice.actions.loading());
	return await api
		.loginWithPassword(loginRequest)
		.then(value => {
			localStorage.setItem("access_token", value.data.access_token);
			return value.data;
		})
		.catch((error: AxiosError) => {
			const messageResponse = !!error.response
				? (error.response.data as ILoginError)
				: { msg: error.message };
			thunkAPI.dispatch(alertSlice.actions.error(messageResponse));
			return thunkAPI.rejectWithValue();
		})
		.finally(() => {
			thunkAPI.dispatch(alertSlice.actions.notLoading());
		});
});

export default login;
