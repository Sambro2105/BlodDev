import React, { ChangeEvent, FormEvent } from "react";
import IRegisterDispatch from "../../types/api/register/dispatch";

interface IRegisterForm {
	userRegisterForm: IRegisterDispatch;
	onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
	onRegister: (event: FormEvent<HTMLFormElement>) => void;
	typePass: boolean;
	onTypePassChange: () => void;
	typeCfPass: boolean;
	onTypeCfPassChange: () => void;
}

const RegisterForm: React.FC<IRegisterForm> = props => {
	return (
		<form onSubmit={props.onRegister}>
			<div className="form-group mb-3">
				<label htmlFor="name" className={"form-label"}>
					Name
				</label>
				<input
					type="text"
					className={"form-control"}
					id={"name"}
					name={"name"}
					value={props.userRegisterForm.name}
					onChange={props.onChangeInput}
					placeholder={"Your name is up to 20 chars."}
				/>
			</div>

			<div className="form-group mb-3">
				<label htmlFor="account" className={"form-label"}>
					Email / Phone number
				</label>
				<input
					type="text"
					className={"form-control"}
					id={"account"}
					name={"account"}
					value={props.userRegisterForm.account}
					onChange={props.onChangeInput}
					placeholder={"Example@gmail.com/+79999999999"}
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
						value={props.userRegisterForm.password}
						onChange={props.onChangeInput}
						placeholder={"Password must be at least 6 chars."}
					/>
					<small onClick={props.onTypePassChange}>
						{props.typePass ? "Hide" : "Show"}
					</small>
				</div>
			</div>

			<div className="form-group mb-3">
				<label htmlFor={"password"} className={"form-label"}>
					Confirm Password
				</label>
				<div className="pass">
					<input
						type={props.typeCfPass ? "text" : "password"}
						className={"form-control"}
						id={"cf_password"}
						name={"cf_password"}
						value={props.userRegisterForm.cf_password}
						onChange={props.onChangeInput}
						placeholder={"Confirm your password."}
					/>
					<small onClick={props.onTypeCfPassChange}>
						{props.typeCfPass ? "Hide" : "Show"}
					</small>
				</div>
			</div>

			<button type={"submit"} className={"btn btn-dark w-100 my-1"}>
				Register
			</button>
		</form>
	);
};

export default RegisterForm;
