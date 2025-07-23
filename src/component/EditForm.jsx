import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const endpoint = "/employee";

export const EditEmployee = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [editEmployee, setEditEmployee] = useEffect({
		name: "",
		department: "",
		role: "",
	});

	const handleForm = (event) => {
		const inputName = event.target.name;
		const inputValue = event.target.value;
		editEmployee[inputName] = inputValue;
		console.log(editEmployee);
	};

	const getEmployeeById = async () => {
		const { employee_id } = params;
		const baseUrl = import.meta.env.VITE_API_BASE_URL;
		const endpoint = "/employee";
		const url = `${baseUrl}${endpoint}/${employee_id}`;
		const result = await fetch(url);
		const data = await result.json();
		const element = data[0];
		setEditEmployee({
			name,
			department,
			role,
		});
	};
	const handleSubmit = async () => {
		event.preventDefault();
		const employee_id = params.employee_id;
		const url = `${baseUrl}${endpoint}/${employee_id}`;
		const result = await fetch(url, {
			method: "PUT",
			body: JSON.stringify(editEmployee),
			headers: {
				"Content-type": "application/json",
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
			<h1>Employee Form</h1>
			<main className="container">
				<form onSubmit={handleSubmit}>
					<div>
						<label className="form-label">Name</label>
						<input
							onChange={handleForm}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Department</label>
						<input
							onChange={handleForm}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Role</label>
						<input
							onChange={handleForm}
							type="text"
							className="form-control"
						/>
					</div>
					<button className="btn btn-primary">Save Data</button>
				</form>
			</main>
		</>
	);
};
