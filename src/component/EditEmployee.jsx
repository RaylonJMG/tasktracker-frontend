import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "editEmployee";

export const EditEmployee = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [editEmployee, setEditEmployee] = useState({
		name: "",
		department: "",
		role: "",
	});

	const handleForm = (event) => {
		event.preventDefault();
		const inputName = event.target.name;
		const inputValue = event.target.value;
		const formInput = {
			name: editEmployee.name,
			department: editEmployee.department,
			role: editEmployee.role,
		};
		formInput[event.target.name] = event.target.value;

		setEditEmployee(formInput);
	};

	const getEmployeeById = async () => {
		const { employee_id } = params;
		const baseUrl = import.meta.env.VITE_BASE_URL;
		const endpoint = "employee";
		const token = localStorage.getItem("token");
		const url = `${baseUrl}${endpoint}/${employee_id}`;
		const result = await fetch(url, {
			headers: {
				authorization: token,
			},
		});
		const data = await result.json();
		const element = data[0];
		const { name, department, role } = element;

		setEditEmployee({
			name,
			department,
			role,
		});
		console.log(name);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const employee_id = params.employee_id;
		const url = `${baseUrl}${endpoint}/${employee_id}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "PUT",
			body: JSON.stringify(editEmployee),
			headers: {
				"Content-type": "application/json",
				authorization: token,
			},
		});
		const data = await result.json();
		navigate("/employee");
	};

	useEffect(() => {
		getEmployeeById();
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
						name="Save"
						className="btn btn-primary">
						<i className="bi bi-floppy">Save Data</i>
					</button>
				</form>
			</main>
		</>
	);
};
