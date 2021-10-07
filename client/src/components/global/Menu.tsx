import React from "react";
import { Link } from "react-router-dom";
import IUser from "../../types/api/IUser";

interface IMenu {
	menuLinks: { label: string; path: string }[];
	userData?: IUser;
	onLogout: () => void;
}

const Menu: React.FC<IMenu> = props => {
	return (
		<ul className="navbar-nav ms-auto">
			{props.menuLinks.map((link, index) => (
				<li key={`header-nav-link-${index}`} className="nav-item">
					<Link className="nav-link" to={link.path}>
						{link.label}
					</Link>
				</li>
			))}
			{props.userData && (
				<li className="nav-item dropdown">
					<span
						className="nav-link dropdown-toggle"
						id="navbarDropdown"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<img
							src={props.userData.avatar}
							alt="avatar"
							className={"avatar"}
						/>
					</span>
					<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
						<li>
							<Link className="dropdown-item" to={"/profile"}>
								Profile
							</Link>
						</li>
						<li>
							<hr className="dropdown-divider" />
						</li>
						<li>
							<Link className="dropdown-item" to={"/"} onClick={props.onLogout}>
								Logout
							</Link>
						</li>
					</ul>
				</li>
			)}
		</ul>
	);
};

export default Menu;
