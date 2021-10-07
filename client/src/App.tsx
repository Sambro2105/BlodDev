import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./routes";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import { useDispatch } from "react-redux";
import refresh_token from "./store/auth/actions/refresh_token";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const access_token = localStorage.getItem("access_token");
		if (access_token) dispatch(refresh_token());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<MainLayout>
				<Switch>
					{routes.map((route, index) => (
						<Route
							key={`route-${index}`}
							render={route.render}
							exact={route.exact}
							path={route.path}
						/>
					))}
					<Route path={"*"} exact component={NotFound} />
				</Switch>
			</MainLayout>
		</BrowserRouter>
	);
}

export default App;
