import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "login";

export const Home = ({ login }) => {
	const navigate = useNavigate();
	const [resultLogIn, setResultLogin] = useState("");
	const [body, setBody] = useState({ username: "", password: "" });

	const handleForm = (event) => {
		const formInput = {
			username: body.username,
			password: body.password,
		};
		formInput[event.target.name] = event.target.value;
		setBody(formInput);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const url = `${baseUrl}${endpoint}`;
		try {
			const result = await fetch(url, {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (result.ok) {
				const data = await result.json();
				localStorage.setItem("token", data.token);
				login(true);
				navigate("/employee");
			} else {
				setResultLogin("Invalid Credentials. Please try again.");
			}
		} catch (error) {
			setResultLogin("Network error. Please try again later.");
		}
	};

	return (
		<>
			<div className="container vh-100 d-flex align-items-center justify-content-center">
				<div
					className="card p-4"
					style={{ maxWidth: "60%", width: "100%" }}>
					<h3 className="text-center mb-2">User Log In</h3>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label className="form-label">Username</label>
							<input
								name="username"
								onChange={handleForm}
								type="text"
								className="form-control"
								required
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Password</label>
							<input
								name="password"
								onChange={handleForm}
								type="password"
								className="form-control"
								required
							/>
						</div>
						<p>{resultLogIn}</p>
						<button className="btn btn-primary w-100">Log In</button>
					</form>
					<button
						className="btn btn-secondary mt-3 w-100"
						onClick={() => navigate("/register")}>
						Register
					</button>
				</div>
			</div>
		</>
	);
};
