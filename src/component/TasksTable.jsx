import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "tasks";
const endpoint2 = "employee";

export const TasksTable = () => {
	const { employee_id } = useParams();
	console.log("Current employee_id from useParams:", employee_id);
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	const [employee, setEmployee] = useState({});

	const getAllTasks = async () => {
		const url = `${baseUrl}${endpoint}`;
		const token = localStorage.getItem("token");
		console.log(token);
		const result = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
		});
		console.log(result);
		const data = await result.json();
		console.log(data);
		setTasks(data);
	};

	// const getTasksById = async () => {
	// 	const url = `${baseUrl}${endpoint}/${employee_id}`;
	// 	const token = localStorage.getItem("token");
	// 	const result = await fetch(url, {
	// 		headers: {
	// 			authorization: token,
	// 		},
	// 	});
	// 	const data = await result.json();
	// 	setTasks(data);
	// };

	const getEmployeeById = async () => {
		const token = localStorage.getItem("token");
		const url = `${baseUrl}${endpoint2}/${employee_id}`;
		console.log("Fetching employee from:", url);
		const result = await fetch(url, {
			headers: {
				authorization: token,
			},
		});
		const data = await result.json();
		setEmployee(data[0]);
	};
	const handleTaskEdit = () => {
		navigate(`/tasks/editTasks`);
	};
	const handleTaskDelete = async (task_id) => {
		const url = `${baseUrl}${endpoint}/${task_id}`;
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

	useEffect(() => {
		getAllTasks();
		//console.log("EMPLOYEE ID BEING SENT:", employee_id);
		//getTasksById();
		getEmployeeById();
	}, []);

	return (
		<>
			<div className="container">
				<h2>Task List</h2>
				<table className="table text-align:center table-responsive">
					<thead>
						<tr>
							<th>Task Description</th>
							<th>Status</th>
							<th>Employee Assigned</th>
							<th>Employee ID</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="table-group-divider">
						{tasks.map((item) => (
							<tr key={item.task_id}>
								<td>{item.description}</td>
								<td>{item.status}</td>
								<td>{item.employee}</td>
								<td>{item.employee_id}</td>
								<td>
									<button
										onClick={() => handleTaskEdit(item.tasks_id)}
										className="btn btn-primary w-100 me-2">
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
			</div>
		</>
	);
};
