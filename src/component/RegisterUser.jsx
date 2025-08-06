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
				<form onSubmit={handleSubmit}>
					<div>
						<label className="form-label">Username</label>
						<input
							onChange={handleUsername}
							value={newUser.username}
							type="text"
							className="form-control"
							required
						/>
					</div>
					<div>
						<label className="form-label">Password</label>
						<input
							onChange={handlePassword}
							value={newUser.password}
							type="password"
							className="form-control"
							required
						/>
					</div>
					<div>
						<label className="form-label">First Name</label>
						<input
							onChange={handleFirst_Name}
							value={newUser.first_name}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Last Name</label>
						<input
							onChange={handleLast_Name}
							value={newUser.last_name}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">
							<i className="bi bi-telephone"></i>Phone
						</label>
						<input
							onChange={handlePhone}
							value={newUser.phone}
							type="tel"
							className="form-control"
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
							placeholder="555-123-4567"
						/>
					</div>
					<br />
					<input
						type="submit"
						className="btn btn-primary">
						Save Data
					</input>
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
