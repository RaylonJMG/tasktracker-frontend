import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = ({ login }) => {
	const navigate = useNavigate();

	const logOut = () => {
		localStorage.removeItem("token");
		login(false);
		navigate("/");
	};

	return (
		<>
			<nav
				className="navbar navbar-expand-lg bg-light"
				data-bs-theme="light">
				<div className="container-fluid">
					<Link
						className="navbar-brand"
						to="/employee">
						Task Management System
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarColor03"
						aria-controls="navbarColor03"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse"
						id="navbarColor03">
						<ul className="navbar-nav me-auto">
							<li>
								<Link
									className="nav-link"
									to="/employee">
									Employee Database
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/tasks">
									Tasks List
								</Link>
							</li>
						</ul>
						<div className="d-flex">
							<button
								onClick={logOut}
								className="btn btn-secondary my-2 my-sm-0">
								Log Out
							</button>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};
