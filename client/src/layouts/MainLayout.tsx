import React, { ChangeEvent, useState } from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import Alert from "../components/alerts/Alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import alertSlice from "../store/alert/slice";
import { useHistory } from "react-router-dom";
import logout from "../store/auth/actions/logout";

const MainLayout: React.FC = props => {
	const [searchValue, setSearchValue] = useState("");
	const alert = useSelector((state: RootState) => state.alert);
	const userData = useSelector((state: RootState) => state.auth.userData);

	const dispatch = useDispatch();

	const history = useHistory();

	const handleToastClose = () => {
		dispatch(alertSlice.actions.clear());
	};

	const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleLogout = () => {
		dispatch(logout());
		history.push("/");
	};

	const toastErrorProps = alert.errors
		? {
				title: "Errors",
				body: alert.errors.msg,
				bgColor: "bg-danger",
				onClose: handleToastClose,
		  }
		: undefined;

	const toastSuccessProps = alert.success
		? {
				title: "Success",
				body: alert.success.msg,
				bgColor: "bg-success",
				onClose: handleToastClose,
		  }
		: undefined;

	const menuLinks = userData?.access_token
		? [
				{
					label: "CreateBlog",
					path: "/create_blog",
				},
		  ]
		: [
				{ label: "Login", path: "/login" },
				{ label: "Register", path: "/register" },
		  ];

	return (
		<div className={"container"}>
			<Header
				onLogout={handleLogout}
				searchValue={searchValue}
				onSearchValueChange={handleSearchValueChange}
				menuLinks={menuLinks}
				userData={userData?.user}
			/>
			<Alert
				toastErrorProps={toastErrorProps}
				toastSuccessProps={toastSuccessProps}
				loading={alert.loading}
			/>
			{props.children}
			<Footer />
		</div>
	);
};

export default MainLayout;
