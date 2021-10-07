import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import LoginPass from "../components/forms/LoginPass";
import LoginSMS from "../components/forms/LoginSMS";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import login from "../store/auth/actions/login";
import ILoginRequest from "../types/api/login/request";
import { RootState } from "../store";

const initialLoginForm = { account: "", password: "" };

const Login: React.FC = () => {
	const userData = useSelector((state: RootState) => state.auth.userData);
	const [passwordLoginForm, setPasswordLoginForm] =
		useState<ILoginRequest>(initialLoginForm);
	const [typePass, setTypePass] = useState<boolean>(false);
	const [sms, setSms] = useState<boolean>(false);
	const [phone, setPhone] = useState<string>("");

	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		if (userData) history.push("/");
	}, [history, userData]);

	const { account, password } = passwordLoginForm;

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setPasswordLoginForm({
			...passwordLoginForm,
			[name]: value,
		});
	};

	const handleTypePassChange = () => {
		setTypePass(!typePass);
	};

	const handleSmsChange = () => {
		setSms(!sms);
	};

	const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPhone(event.target.value);
	};

	const handlePasswordLogin = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(login(passwordLoginForm));
	};

	return (
		<div className={"auth_page"}>
			<div className={"auth_box"}>
				<h3 className={"text-uppercase text-center mb-4"}>Login</h3>

				{sms ? (
					<LoginSMS
						phone={phone}
						loginButtonDisabled={!phone}
						onPhoneChange={handlePhoneChange}
						typePass={typePass}
						onTypePassChange={handleTypePassChange}
						onLogin={handlePasswordLogin}
					/>
				) : (
					<LoginPass
						password={password}
						account={account}
						loginButtonDisabled={!(!!account && !!password)}
						typePass={typePass}
						onChangeInput={handleChangeInput}
						onTypePassChange={handleTypePassChange}
						onLogin={handlePasswordLogin}
					/>
				)}

				<small
					className={"row my-2 text-primary"}
					style={{ cursor: "pointer" }}
				>
					<span className={"col-6"}>
						<Link to={"/forgot_password"}>Forgot password?</Link>
					</span>
					<span className={"col-6 text-end"} onClick={handleSmsChange}>
						{sms ? "Sign in with password" : "Sign in with SMS"}
					</span>
				</small>
				<p className={"mt-2"}>
					You don't have an account?
					<Link
						className={"mx-1"}
						to={"/register"}
						style={{
							color: "crimson",
						}}
					>
						Register Now
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
