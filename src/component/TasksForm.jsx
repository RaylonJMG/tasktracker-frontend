import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "tasks";

export const TasksForm = () => {
	const params = useParams();
	const navigate = useNavigate();
	const { task_id } = params;
	const [tasks, setTasks] = useState({ task_id: task_id, tasks });

	const handleForm = (event) => {
		const inputName = event.target.name;
		const inputValue = event.target.value;
		tasks[inputName] = inputValue;
	};

	const handleSubmit = async () => {
		event.preventDefault();
		const url = `${baseUrl}${endpoint}`;
		const result = await fetch(url, {
			method: "POST",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await result.json();

		window.location.reload();
	};

	const handleReturn = () => {
		navigate("/employee");
	};
	return (
		<>
			<h1>Tasks</h1>
			<main className="container">
				<form onSubmit={handleSubmit}>
					<div>
						<label>Task</label>
						<input
							onChange={handleForm}
							name="task_name"
							type="text"
						/>
					</div>
					<button className="btn btn-primary">Save</button>
				</form>
				<button
					className="btn btn-danger"
					onClick={handleReturn}>
					Return
				</button>
			</main>
		</>
	);
};

export default TasksForm;
