import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
	return (
		<nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white ">
			<Link className="font-bold" to={"/"}>
				GitHub Search
			</Link>

			<span>
				{/* <Link to="/" className="mr-1">
					Home
				</Link> */}
				<Link to="/favourites" className="ml-1">
					Favourites
				</Link>
			</span>
		</nav>
	);
}

export default Navigation;
