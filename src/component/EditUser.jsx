import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "editUser";

export const EditUser = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [editUser, setEditUser] = useState({
		username: "",
		password: "",
		first_name: "",
		last_name: "",
		phone: "",
	});

	const handleForm = (event) => {
		event.preventDefault();
		const formInput = {
			username: editUser.username,
			password: editUser.password,
			first_name: editUser.first_name,
			last_name: editUser.last_name,
			phone: editUser.phone,
		};
		formInput[event.target.name] = event.target.value;
		setEditUser(formInput);
	};

	const getUserById = async () => {
		const { user_id } = params;
		const baseUrl = import.meta.env.VITE_BASE_URL;
		const endpoint = "user";
		const token = localStorage.getItem("token");
		const url = `${baseUrl}${endpoint}/${user_id}`;
		const result = await fetch(url, {
			headers: {
				authorization: token,
			},
		});
		const data = await result.json();
		const element = data[0];
		const {} = element;

		setEditUser({
			username,
			password,
			first_name,
			last_name,
			phone,
		});
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const employee_id = params.employee_id;
		const url = `${baseUrl}${endpoint}/${employee_id}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "PUT",
			body: JSON.stringify(editUser),
			headers: {
				"Content-type": "application/json",
				authorization: token,
			},
		});
		const data = await result.json();
		navigate("/employee");
	};

	useEffect(() => {
		getUserById();
	}, []);

	return (
		<>
			<h1>Edit Employee Form</h1>
			<main className="container">
				<form onSubmit={handleSubmit}>
					<div>
						<label className="form-label">Name</label>
						<input
							name="name"
							onChange={handleForm}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Department</label>
						<input
							name="department"
							onChange={handleForm}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Role</label>
						<input
							name="role"
							onChange={handleForm}
							type="text"
							className="form-control"
						/>
					</div>
					<button
						type="submit"
						name="Save"
						className="btn btn-primary">
						<i className="bi bi-floppy">Save Data</i>
					</button>
				</form>
			</main>
		</>
	);
};
