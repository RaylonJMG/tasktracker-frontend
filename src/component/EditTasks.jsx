import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "tasks";

export const EditTasks = () => {
	const navigate = useNavigate();
	const { tasks_id } = useParams();
	const [editTasks, setEditTasks] = useState({
		description: "",
		status: "",
		employee_id: "",
	});

	const handleForm = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		const formInput = {
			description: editTasks.description,
			status: editTasks.status,
		};
		formInput[name] = value;
		setEditTasks(formInput);
	};

	const getTasksById = async () => {
		const token = localStorage.getItem("token");
		const url = `${baseUrl}${endpoint}/${tasks_id}`;
		const result = await fetch(url, {
			method: "GET",
			headers: {
				authorization: token,
			},
		});
		const data = await result.json();
		const { description, status, employee_id } = data[0];

		setEditTasks({
			description,
			status,
			employee_id,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const tasks_id = params.tasks_id;
		const url = `${baseUrl}${endpoint}/${tasks_id}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "PUT",
			body: JSON.stringify(editTasks),
			headers: {
				"Content-type": "application/json",
				authorization: token,
			},
		});
		const data = await result.json();
		navigate("/tasks/${editTasks.employee_id}");
		window.location.reload();
	};

	useEffect(() => {
		getTasksById();
	}, []);

	return (
		<>
			<main className="container mt-2">
				<h1>Edit Tasks</h1>
				<form
					className="mt-3"
					onSubmit={handleSubmit}>
					<div>
						<label className="form-label">Description</label>
						<input
							name="description"
							value={editTasks.description}
							onChange={handleForm}
							type="text"
							className="form-control"
						/>
					</div>
					<div>
						<label className="form-label">Status</label>
						<input
							name="status"
							value={editTasks.status}
							onChange={handleForm}
							type="text"
							className="form-control"
						/>
					</div>
					<button
						type="submit"
						name="Save"
						className="btn btn-primary w-100">
						<i className="bi bi-floppy">Save Data</i>
					</button>
				</form>
			</main>
		</>
	);
};
