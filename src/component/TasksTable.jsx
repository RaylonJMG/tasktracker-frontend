import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = VITE_BASE_URL;
const endpoint = "tasks";
const endpoint2 = "employee";

export const TasksTable = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [tasks, setTasks] = useState([]);
	const [employee, setEmployee] = useState({});

	const getTasks = async () => {
		const { task_id } = params;
		const url = `${baseUrl}${endpoint}/${task_id}`;
		const result = await fetch(url);
		const data = await result.json();
		setTasks(data);
	};

	const getEmployee = async () => {
		const { employee_id } = params;
		const url = `${baseUrl}${endpoint}/${employee_id}`;
		const result = await fetch(url);
		const data = await result.json();
		setEmployee(data[0]);
	};
	const handleTaskDelete = async (id) => {
		const url = `${baseUrl}${endpoint}/${id}`;
		const result = await fetch(url, {
			method: "DELETE",
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
						<th>Description</th>
						<th>Status</th>
						<th>Employee_id</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">
					{tasks.map((item) => (
						<tr key={item.task_id}>
							<td>{item.description}</td>
							<td>{item.status}</td>
							<td>
								<button
									onClick={() => handleTaskEdit(item.task_id)}
									className="btn btn-primary">
									Edit
								</button>
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
