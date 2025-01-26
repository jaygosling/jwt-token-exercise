import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary me-3">Log in</button>
					</Link>
					<Link to="/signup">
						<button className="btn btn-primary me-3">Sign up</button>
					</Link>
					<Link to="/private">
						<button className="btn btn-primary me-3">My Profile</button>
					</Link>
					<Link to="/">
						<button className="btn btn-primary" onClick={(e) => { sessionStorage.removeItem("token"); }} >Log out</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
