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
		const result = await fetch(url, {
			method: "POST",
			body: JSON.stringify(tasks),
			heders: {
				"Content-Type": "application/json",
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
					<div>
						<label>Description</label>
						<input
							onChange={handleForm}
							name="task_description"
							type="text"
						/>
					</div>
					<div>
						<label>Status</label>
						<input
							onChange={handleForm}
							name="task_status"
							type="text"
						/>
					</div>
					<button className="btn btn-primary">Save</button>
					<button
						className="btn btn-danger"
						onClick={handleReturn}>
						Return
					</button>
				</form>
			</main>
		</>
	);
};

export default TasksForm;
