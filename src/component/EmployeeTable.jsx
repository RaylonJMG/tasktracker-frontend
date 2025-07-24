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
		const url = `${baseUrl}${endpoint}`;
		const result = await fetch(url);
		const data = await result.json();
		setEmployee(data);
	};
	const handleEdit = (id) => {
		navigate(`/editEmployee/${id}`);
	};
	const handleDelete = async (id) => {
		const url = `${baseUrl}${endpoint}/${id}`;
		const result = await fetch(url, {
			method: "DELETE",
		});
		const data = await result.json();
		window.location.reload();
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
							<th>Name</th>
							<th>Department</th>
							<th>Role</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="table-group-divider">
						{employee.map((item) => (
							<tr key={item.employee_id}>
								<td>{item.name}</td>
								<td>{item.department}</td>
								<td>{item.role}</td>
								<td>
									<button
										type="button"
										onClick={handleEdit(item.employee_id)}
										className="btn btn-primary">
										<i className="bi bi-pencil-square"></i>
									</button>
									<button
										type="button"
										onClick={handleDelete(item.employee_id)}
										className="btn btn-danger">
										<i className="bi bi-person-x"></i>
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
