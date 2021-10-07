import React from "react";

const Footer: React.FC = () => {
	return (
		<div className={"text-center bg-light py-4"}>
			<h6>Welcome to BlogDev</h6>
			<a
				href={"https://github.com/Sambro2105?tab=repositories"}
				target={"_blank"}
				rel={"noreferrer"}
				className={"mb-2 d-block"}
			>
				GitHub
			</a>
			<p>Copyright &copy; 2021</p>
		</div>
	);
};

export default Footer;
