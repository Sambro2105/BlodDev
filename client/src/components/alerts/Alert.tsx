import React from "react";
import Loader from "../loaders/Loader";
import Toast, { IToast } from "./Toast";

interface IAlert {
	loading: boolean;
	toastErrorProps?: IToast;
	toastSuccessProps?: IToast;
}

const Alert: React.FC<IAlert> = props => {
	return (
		<div>
			{props.loading && <Loader />}
			{props.toastErrorProps && <Toast {...props.toastErrorProps} />}
			{props.toastSuccessProps && <Toast {...props.toastSuccessProps} />}
		</div>
	);
};

export default Alert;
