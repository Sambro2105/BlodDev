import React, { ChangeEvent, FormEvent } from "react";

interface ILoginSMS {
	loginButtonDisabled: boolean;
	typePass: boolean;
	onPhoneChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onLogin: (event: FormEvent<HTMLFormElement>) => void;
	onTypePassChange: () => void;
	phone: string;
}

const LoginSMS: React.FC<ILoginSMS> = props => {
	return (
		<form onSubmit={props.onLogin}>
			<div className="form-group mb-3">
				<label htmlFor="phone" className={"form-label"}>
					Phone number
				</label>
				<input
					type="text"
					className={"form-control"}
					id={"phone"}
					name={"phone"}
					value={props.phone}
					onChange={props.onPhoneChange}
					placeholder={"Enter your phone number."}
				/>
			</div>
			<button
				type={"submit"}
				className={"btn btn-dark w-100"}
				disabled={props.loginButtonDisabled}
			>
				Login
			</button>
		</form>
	);
};

export default LoginSMS;
