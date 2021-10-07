import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../api";
import { AxiosError } from "axios";
import IActivateError from "../types/api/activate/error";
import ErrorMessage from "../components/alerts/ErrorMessage";
import SuccessMessage from "../components/alerts/SuccessMessage";

interface IMatchParams {
	activate_token: string;
}

const Activate: React.FC = () => {
	const match = useRouteMatch<IMatchParams>();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");

	const dispatch = useDispatch();

	useEffect(() => {
		if (match.params.activate_token) {
			api
				.activate(match.params)
				.then(value => {
					setSuccessMessage(value.data.msg);
				})
				.catch((error: AxiosError) => {
					const messageResponse = !!error.response
						? (error.response.data as IActivateError)
						: { msg: error.message };
					setErrorMessage(messageResponse.msg);
				});
		}
	}, [dispatch, match.params]);

	return (
		<div>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			{successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
		</div>
	);
};

export default Activate;
