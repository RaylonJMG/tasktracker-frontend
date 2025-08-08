import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "tasks";
const endpoint2 = "employee";

export const TasksTable = () => {
	const { employee_id } = useParams();
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	const [employee, setEmployee] = useState({});

	const getTasksById = async () => {
		const url = `${baseUrl}${endpoint}/${employee_id}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "GET",
			headers: {
				authorization: token,
			},
		});
		const data = await result.json();
		setTasks(data);
	};

	const getEmployeeById = async () => {
		const token = localStorage.getItem("token");
		const url = `${baseUrl}${endpoint2}/${employee_id}`;
		console.log("Fetching employee from:", url);
		const result = await fetch(url, {
			method: "GET",
			headers: {
				authorization: token,
			},
		});
		const data = await result.json();
		setEmployee(data[0]);
	};

	const handleTaskEdit = (id) => {
		navigate(`tasks/edit/${id}`);
	};

	const handleTaskDelete = async (id) => {
		const url = `${baseUrl}${endpoint}/${id}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "DELETE",
			headers: {
				authorization: token,
			},
		});
		getTasksById();
	};

	useEffect(() => {
		console.log("EMPLOYEE ID BEING SENT:", employee_id);
		getTasksById();
		getEmployeeById();
	}, [employee_id]);

	return (
		<>
			<table className="table container text-align:center table-responsive">
				<thead>
					<tr>
						<th>Description</th>
						<th>Status</th>
						<th>Employee ID</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{tasks.map((item) => (
						<tr key={item.tasks_id}>
							<td>{item.description}</td>
							<td>{item.status}</td>
							<td>{employee.name || item.employee_id}</td>
							<td>
								<button
									onClick={() => handleTaskEdit(item.tasks_id)}
									className="btn btn-warning w-100 mt-2">
									Edit
								</button>
								<button
									onClick={() => handleTaskDelete(item.tasks_id)}
									className="btn btn-danger w-100 mt-2">
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
