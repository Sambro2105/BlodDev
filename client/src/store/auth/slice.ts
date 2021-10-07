import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import EAsyncStatus from "../../types/EAsyncStatus";
import login from "./actions/login";
import ILoginResponse from "../../types/api/login/response";
import refresh_token from "./actions/refresh_token";

interface IAuthState {
	userData?: ILoginResponse;
	status: EAsyncStatus;
}

const initialState: IAuthState = {
	status: EAsyncStatus.IDLE,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		clear: () => {
			return initialState;
		},
	},
	extraReducers: builder => {
		builder.addMatcher(isAnyOf(login.pending, refresh_token.pending), () => {
			return {
				...initialState,
				state: EAsyncStatus.PENDING,
			};
		});
		builder.addMatcher(
			isAnyOf(login.fulfilled, refresh_token.fulfilled),
			(state, action) => {
				state.userData = action.payload;
				state.status = EAsyncStatus.FULFILLED;
			},
		);
		builder.addMatcher(isAnyOf(login.rejected, refresh_token.rejected), () => {
			return {
				...initialState,
				state: EAsyncStatus.REJECTED,
			};
		});
		builder.addDefaultCase(state => {
			return state;
		});
	},
});

export default authSlice;
