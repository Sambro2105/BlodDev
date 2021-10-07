import React, { ChangeEvent, FormEvent } from "react";

interface ILoginPass {
	loginButtonDisabled: boolean;
	typePass: boolean;
	onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
	onTypePassChange: () => void;
	onLogin: (event: FormEvent<HTMLFormElement>) => void;
	password: string;
	account: string;
}

const LoginPass: React.FC<ILoginPass> = props => {
	return (
		<form onSubmit={props.onLogin}>
			<div className="form-group mb-3">
				<label htmlFor="account" className={"form-label"}>
					Email / Phone number
				</label>
				<input
					type="text"
					className={"form-control"}
					id={"account"}
					name={"account"}
					value={props.account}
					onChange={props.onChangeInput}
					placeholder={"Enter your email/phone number."}
				/>
			</div>

			<div className="form-group mb-3">
				<label htmlFor={"password"} className={"form-label"}>
					Password
				</label>
				<div className="pass">
					<input
						type={props.typePass ? "text" : "password"}
						className={"form-control"}
						id={"password"}
						name={"password"}
						value={props.password}
						onChange={props.onChangeInput}
						placeholder={"Enter yor password."}
					/>
					<small onClick={props.onTypePassChange}>
						{props.typePass ? "Hide" : "Show"}
					</small>
				</div>
			</div>

			<button
				type={"submit"}
				className={"btn btn-dark w-100 mt-1"}
				disabled={props.loginButtonDisabled}
			>
				Login
			</button>
		</form>
	);
};

export default LoginPass;
