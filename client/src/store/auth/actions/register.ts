import api from "../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import alertSlice from "../../alert/slice";
import validateRegistrationForm from "../../../utils/validateRegistrationForm";
import IRegisterResponse from "../../../types/api/register/response";
import IRegisterDispatch from "../../../types/api/register/dispatch";
import IRegisterError from "../../../types/api/register/error";

const register = createAsyncThunk<
	IRegisterResponse,
	IRegisterDispatch,
	{
		rejectValue: void;
	}
>("auth/register", async (userRegisterForm, thunkAPI) => {
	thunkAPI.dispatch(alertSlice.actions.loading());

	const errors = validateRegistrationForm(userRegisterForm);
	if (errors.length > 0) {
		const error = { msg: errors };
		thunkAPI.dispatch(alertSlice.actions.error(error));
		return thunkAPI.rejectWithValue();
	}

	return await api
		.register(userRegisterForm)
		.then(value => {
			thunkAPI.dispatch(alertSlice.actions.success(value.data));
			return value.data;
		})
		.catch((error: AxiosError) => {
			const messageResponse = !!error.response
				? (error.response.data as IRegisterError)
				: { msg: error.message };
			thunkAPI.dispatch(alertSlice.actions.error(messageResponse));
			return thunkAPI.rejectWithValue();
		});
});

export default register;
