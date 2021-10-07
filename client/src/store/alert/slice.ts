import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMessage {
	msg: string | string[];
}

interface IAlertState {
	loading: boolean;
	success?: IMessage;
	errors?: IMessage;
}

const initialState: IAlertState = {
	loading: false,
};

const alertSlice = createSlice({
	name: "alert",
	initialState: initialState,
	reducers: {
		loading: () => {
			return {
				...initialState,
				loading: true,
			};
		},
		notLoading: state => {
			return {
				...state,
				loading: false,
			};
		},
		success: (state, action: PayloadAction<IMessage>) => {
			return {
				...initialState,
				success: action.payload,
			};
		},
		error: (state, action: PayloadAction<IMessage>) => {
			return {
				...initialState,
				errors: action.payload,
			};
		},
		clear: state => {
			state.success = undefined;
			state.errors = undefined;
		},
	},
	extraReducers: builder => {
		builder.addDefaultCase(state => {
			return state;
		});
	},
});

export default alertSlice;
