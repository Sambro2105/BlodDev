import React from "react";

const ErrorMessage: React.FC = props => {
	return <div className={"errMsg"}>{props.children}</div>;
};

export default ErrorMessage;
