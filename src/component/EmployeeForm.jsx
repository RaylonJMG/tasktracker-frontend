import React, { useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "employee";

const EmployeeForm = () => {
	const [newEmployee, setNewEmployee] = useState({
		name: "",
		department: "",
		role: "",
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const url = `${baseUrl}${endpoint}/${employee_id}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "POST",
			body: JSON.stringify(newEmployee),
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
		});
		const data = await result.json();
		setNewEmployee(data);
	};

	const handleName = (event) => {
		newEmployee.name = event.target.value;
	};
	const handleDepartment = (event) => {
		newEmployee.department = event.target.value;
	};
	const handleRole = (event) => {
		newEmployee.role = event.target.value;
	};

	return (
		<>
			<h1>Employee Form</h1>
			<main className="container">
				<form onSubmit={handleSubmit}>
					<div>
						<label className="form-label">Name</label>
						<input
							onChange={handleName}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Department</label>
						<input
							onChange={handleDepartment}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Role</label>
						<input
							onChange={handleRole}
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
				</form>
			</main>
		</>
	);
};

export default EmployeeForm;
