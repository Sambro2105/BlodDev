import React from "react";

const SuccessMessage: React.FC = props => {
	return <div className={"successMsg"}>{props.children}</div>;
};

export default SuccessMessage;
