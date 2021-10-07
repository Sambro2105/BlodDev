import React, { ChangeEvent } from "react";

interface ISearch {
	searchValue: string;
	onSearchValueChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<ISearch> = props => {
	return (
		<div className={"search w-100 position-relative me-4"}>
			<input
				type={"text"}
				className={"form-control me-2 w-100"}
				value={props.searchValue}
				onChange={props.onSearchValueChange}
				placeholder={"Enter your search..."}
			/>
		</div>
	);
};

export default Search;
