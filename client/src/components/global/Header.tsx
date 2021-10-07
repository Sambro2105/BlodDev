import React, { ChangeEvent } from "react";
import Search from "./Search";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import IUser from "../../types/api/IUser";

interface IHeader {
	searchValue: string;
	onSearchValueChange: (event: ChangeEvent<HTMLInputElement>) => void;
	menuLinks: { label: string; path: string }[];
	userData?: IUser;
	onLogout: () => void;
}

const Header: React.FC<IHeader> = props => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
			<Link className="navbar-brand" to={"/"}>
				BlogDev
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<Search
					searchValue={props.searchValue}
					onSearchValueChange={props.onSearchValueChange}
				/>
				<Menu
					menuLinks={props.menuLinks}
					userData={props.userData}
					onLogout={props.onLogout}
				/>
			</div>
		</nav>
	);
};

export default Header;
