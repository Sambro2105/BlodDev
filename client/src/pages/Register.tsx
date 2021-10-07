import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import register from "../store/auth/actions/register";
import IRegisterDispatch from "../types/api/register/dispatch";
import { RootState } from "../store";

const initialRegisterForm: IRegisterDispatch = {
	name: "",
	account: "",
	password: "",
	cf_password: "",
};

const Register: React.FC = () => {
	const userData = useSelector((state: RootState) => state.auth.userData);
	const [userRegisterForm, setUserRegisterForm] =
		useState<IRegisterDispatch>(initialRegisterForm);
	const [typePass, setTypePass] = useState<boolean>(false);
	const [typeCfPass, setTypeCfPass] = useState<boolean>(false);

	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		if (userData) history.push("/");
	}, [history, userData]);

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setUserRegisterForm({
			...userRegisterForm,
			[name]: value,
		});
	};

	const handleTypePassChange = () => {
		setTypePass(!typePass);
	};

	const handleTypeCfPassChange = () => {
		setTypeCfPass(!typeCfPass);
	};

	const handleRegister = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(register(userRegisterForm));
	};

	return (
		<div className={"auth_page"}>
			<div className={"auth_box"}>
				<h3 className={"text-uppercase text-center mb-4"}>Register</h3>

				<RegisterForm
					userRegisterForm={userRegisterForm}
					typePass={typePass}
					onTypePassChange={handleTypePassChange}
					typeCfPass={typeCfPass}
					onTypeCfPassChange={handleTypeCfPassChange}
					onChangeInput={handleChangeInput}
					onRegister={handleRegister}
				/>

				<p>
					Already have an account?
					<Link
						className={"mx-1"}
						to={"/login"}
						style={{
							color: "crimson",
						}}
					>
						Login Now
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
