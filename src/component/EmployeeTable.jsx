import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const endpoint = "/employee";

export const EmployeeTable = () => {
	const [employee, setEmployee] = useState([]);
	const params = useParams();

	const getEmployee = async () => {
		const { employee_id } = params;
		const url = baseUrl + endpoint;
		const result = await fetch(url);
		const data = await result.json();
		setEmployee(data);
	};
	const handleDelete = async () => {
		console.log("Delete Tasks");
	};

	useEffect(() => {
		getEmployee();
	}, []);

	return (
		<>
			<h3>Employee Database</h3>
			<table className="table container text-align:center table-responsive">
				<thead>
					<tr>
						<th>Name</th>
						<th>Department</th>
						<th>Role</th>
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
									onClick={() => handleEdit(item.employee_id)}
									className="btn btn-primary">
									Edit
								</button>
								<button
									onClick={() => handleDelete(item.employee_id)}
									className="btn btn-danger">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
