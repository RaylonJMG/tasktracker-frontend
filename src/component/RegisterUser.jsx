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
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const url = `${baseUrl}${endpoint}`;
		const result = await fetch(url, {
			method: "POST",
			body: JSON.stringify(newUser),
			headers: {
				"Content-Type": "application/json",
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
	const handleReturn = () => {
		navigate("/");
	};
	return (
		<>
			<main className="container">
				<h1
					className="mt-4"
					style={{ textDecorationLine: "underline", textAlign: "center" }}>
					User Registration Form
				</h1>
				<form
					className="mt-5"
					onSubmit={handleSubmit}>
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
							type="password"
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
						<label className="form-label">
							<i className="bi bi-telephone"></i> Phone
						</label>
						<input
							onChange={handlePhone}
							type="tel"
							className="form-control"
							placeholder="555-123-4567"
						/>
					</div>
					<br />
					<button
						type="submit"
						name="Save"
						className="btn btn-primary w-100">
						<i className="bi bi-floppy"> Save Data </i>
					</button>
				</form>
				<button
					className="btn btn-danger mt-2 w-100"
					onClick={handleReturn}>
					Return
				</button>
			</main>
		</>
	);
};
