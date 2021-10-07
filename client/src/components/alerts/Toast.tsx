import React from "react";

export interface IToast {
	title: string;
	body: string | string[];
	bgColor: string;
	onClose: () => void;
}

const Toast: React.FC<IToast> = props => {
	return (
		<div
			className={`toast show position-fixed text-light ${props.bgColor}`}
			style={{ top: "5px", right: "5px", zIndex: 50, minWidth: "200px" }}
		>
			<div className={`toast-header text-light ${props.bgColor}`}>
				<strong className={"me-auto"}>{props.title}</strong>
				<button
					type="button"
					className={"btn-close"}
					data-bs-dismiss="toast"
					aria-label="Close"
					onClick={props.onClose}
				/>
			</div>
			<div className={"toast-body"}>
				{typeof props.body === "string" ? (
					props.body
				) : (
					<ul>
						{props.body.map((value, index) => (
							<li key={`toast-li-${index}`}>{value}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Toast;
