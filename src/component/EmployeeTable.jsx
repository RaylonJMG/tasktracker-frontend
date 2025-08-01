import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "employee";

export const EmployeeTable = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [employee, setEmployee] = useState([]);

	const getEmployee = async () => {
		const { employee_id } = params;
		const url = baseUrl + endpoint;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "GET",
			headers: {
				authorization: token,
			},
		});
		const data = await result.json();
		setEmployee(data);
	};
	const handleEdit = (id) => {
		navigate(`/editEmployee/${id}`);
	};
	const handleDelete = async (id) => {
		const url = `${baseUrl}${endpoint}/${id}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "DELETE",
			headers: {
				authorization: token,
			},
		});
		const data = await result.json();
		window.location.reload();
	};
	const handleTasks = (id) => {
		navigate(`/tasks/${id}`);
	};

	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<>
			<h1>Employee Database</h1>
			<div className="table-responsive">
				<table className="table container text-align:center table-responsive">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Department</th>
							<th>Role</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="table-group-divider">
						{employee.map((item) => (
							<tr key={item.employee_id}>
								<td>{item.employee_id}</td>
								<td>{item.name}</td>
								<td>{item.department}</td>
								<td>{item.role}</td>
								<td>
									<button
										type="button"
										onClick={() => handleEdit(item.employee_id)}
										className="btn btn-primary">
										<i className="bi bi-pencil-square"></i>
									</button>
									<button
										type="button"
										onClick={() => handleDelete(item.employee_id)}
										className="btn btn-danger">
										<i className="bi bi-person-x"></i>
									</button>
									<button
										type="button"
										onClick={() => handleTasks(item.employee_id)}
										className="btn btn-info">
										AddTasks
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
