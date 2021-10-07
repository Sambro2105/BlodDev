import React, { ReactNode } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Activate from "./pages/Activate";

interface Route {
	render: (props: { [p: string]: any }) => ReactNode;
	path: string;
	exact?: boolean;
	breadcrumb?: any;
}

const routes: Route[] = [
	{
		render: () => {
			return React.createElement(Activate);
		},
		path: "/activate/:activate_token",
	},
	{
		render: () => {
			return React.createElement(Login);
		},
		path: "/login",
	},
	{
		render: () => {
			return React.createElement(Register);
		},
		path: "/register",
	},
	{
		render: () => {
			return React.createElement(Home);
		},
		path: "/",
		exact: true,
	},
];

export default routes;
