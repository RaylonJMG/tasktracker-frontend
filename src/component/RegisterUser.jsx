import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "register";

export const RegisterUser = () => {
	const navigate = useNavigate();
	const [newUser, setNewUser] = useState({
		username: "",
		password: "",
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const url = `${baseUrl}${endpoint}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "POST",
			body: JSON.stringify(newUser),
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
		});
		const data = await result.json();
		setNewUser(data);
	};

	const handleUsername = (event) => {
		newUser.username = event.target.value;
	};
	const handlePassword = (event) => {
		newUser.password = event.target.value;
	};
	const handleFirst_Name = (event) => {
		newUser.first_name = event.target.value;
	};
	const handleLast_Name = (event) => {
		newUser.last_name = event.target.value;
	};
	const handlePhone = (event) => {
		newUser.phone = event.target.value;
	};
	const handleEmail = (event) => {
		newUser.email = event.target.value;
	};
	const handleReturn = () => {
		navigate("/user");
	};
	return (
		<>
			<h1>Registeration Form</h1>
			<main className="container">
				<form onSubmit={handleSubmit}>
					<div>
						<label className="form-label">Username</label>
						<input
							onChange={handleUsername}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Password</label>
						<input
							onChange={handlePassword}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">First Name</label>
						<input
							onChange={handleFirst_Name}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Last Name</label>
						<input
							onChange={handleLast_Name}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Phone</label>
						<input
							onChange={handlePhone}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Email</label>
						<input
							onChange={handleEmail}
							type="text"
							className="form-control"
						/>
					</div>
					<br />
					<button
						type="submit"
						className="btn btn-primary">
						Save Data
					</button>
					<button
						className="btn btn-danger"
						onClick={handleReturn}>
						Return
					</button>
				</form>
			</main>
		</>
	);
};

export default RegisterUser;
