import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "tasks";

export const TasksForm = () => {
	const navigate = useNavigate();
	const params = useParams();
	const { task_id } = params;
	const [tasks, setTasks] = useState({ task_id: task_id });

	const handleForm = (event) => {
		event.preventDefault();
		const inputName = event.target.name;
		const inputValue = event.target.value;
		tasks[inputName] = inputValue;
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const url = `${baseUrl}${endpoint}/${task_id}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "POST",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
		});
		const data = await result.json();
		setTasks(data);
		window.location.reload();
	};

	const handleReturn = () => {
		navigate("/employee");
	};

	return (
		<>
			<h1 className="text-center">Task Management</h1>
			<main className="container">
				<form
					onSubmit={handleSubmit}
					className="mt-5">
					<div>
						<label className="form-label">Task Name</label>
						<input
							className="form-control"
							onChange={handleForm}
							name="task_name"
							type="text"
						/>
					</div>
					<div>
						<label className="form-label">Description</label>
						<input
							className="form-control"
							onChange={handleForm}
							name="task_description"
							type="text"
						/>
					</div>
					<div>
						<label className="form-label">Status</label>
						<input
							className="form-control"
							onChange={handleForm}
							name="task_status"
							type="text"
						/>
					</div>
					<button
						type="submit"
						name="Save"
						className="btn btn-primary w-100 mt-3">
						<i className="bi bi-floppy"> Save Data </i>
					</button>
				</form>
				<button
					className="btn btn-danger mt-2 w-100"
					onClick={handleReturn}>
					Cancel
				</button>
			</main>
		</>
	);
};

export default TasksForm;
