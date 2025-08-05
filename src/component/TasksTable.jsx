import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "tasks";
const endpoint2 = "employee";

export const TasksTable = () => {
	const params = useParams();
	const [tasks, setTasks] = useState([]);
	const [employee, setEmployee] = useState({});

	const getTasks = async () => {
		debugger;
		const { employee_id } = params;
		const url = `${baseUrl}${endpoint}/${employee_id}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			headers: {
				method: "GET",
				authorization: token,
			},
		});
		const data = await result.json();
		setTasks(data);
	};

	const getEmployee = async () => {
		const { employee_id } = params;
		const token = localStorage.getItem("token");
		const url = `${baseUrl}${endpoint2}/${employee_id}`;
		const result = await fetch(url, {
			headers: {
				method: "GET",
				authorization: token,
			},
		});
		const data = await result.json();
		setEmployee(data[0]);
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
		window.location.reload();
	};

	useEffect(() => {
		getTasks();
		getEmployee();
	}, []);

	return (
		<>
			<table className="table container text-align:center table-responsive">
				<thead>
					<tr>
						<th>Task ID</th>
						<th>Description</th>
						<th>Status</th>
						<th>Employee Name</th>
						<th>Employee ID</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{tasks.map((item) => (
						<tr key={item.task_id}>
							<td>{item.task_id}</td>
							<td>{item.description}</td>
							<td>{item.status}</td>
							<td>{item.name}</td>
							<td>{item.employee_id}</td>
							<td>
								<button
									onClick={() => handleTaskDelete(item.task_id)}
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
