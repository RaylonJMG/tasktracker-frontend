import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "login";

export const Home = ({ login }) => {
	const navigate = useNavigate();
	const [resultLogIn, setResultLogin] = useState("");
	const [body, setBody] = useState({ username: "", password: "" });

	const handleForm = (event) => {
		const temp = {
			username: body.username,
			password: body.password,
		};
		temp[event.target.name] = event.target.value;
		setBody(temp);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const url = `${baseUrl}${endpoint}`;
		const result = await fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (result.ok) {
			const data = await result.json();
			localStorage.getItem("token", data.token);
			login(true);
			navigate("/users");
		} else {
			setResultLogin("Invalid Credentials");
		}
	};

	return (
		<>
			<div className="container vh-100 d-flex align-items-center justify-content-center">
				<div
					className="card p-2"
					style={{ maxWidth: "60%", width: "100%" }}>
					<h3 className="text-center mb-2">Log In</h3>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label className="form-label">Username</label>
							<input
								name="text"
								onChange={handleForm}
								type="text"
								className="form-control"
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Password</label>
							<input
								name="password"
								onChange={handleForm}
								type="password"
								className="form-control"
							/>
						</div>
						{resultLogIn}
						<button className="btn btn-primary w-100">Log In</button>
					</form>
					<button className="btn btn-secondary  w-100">Register</button>
				</div>
			</div>
		</>
	);
};
