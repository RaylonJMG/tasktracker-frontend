import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "tasks";

export const TasksForm = () => {
	const navigate = useNavigate();
	const { employee_id } = useParams();
	const [newTasks, setNewTasks] = useState({
		description: "",
		status: "",
	});

	const handleForm = (event) => {
		const { name, value } = event.target;
		const formInput = {
			description: newTasks.description,
			status: newTasks.status,
		};
		formInput[name] = value;
		setNewTasks(formInput);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const token = localStorage.getItem("token");
		const url = `${baseUrl}${endpoint}/${employee_id}`;
		const result = await fetch(url, {
			method: "PUT",
			body: JSON.stringify(newTasks),
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
		});
		const data = await result.json();
		setNewTasks({ description: "", status: "" });
		navigate(`/tasks/${employee_id}`);
		window.location.reload();
	};

	const handleReturn = () => {
		navigate("/employee");
	};

	return (
		<>
			<main className="container mb-2">
				<h1 className="text-center">Add Tasks for #{employee_id}</h1>
				<form
					onSubmit={handleSubmit}
					className="mt-5">
					<div>
						<label className="form-label">Description</label>
						<input
							className="form-control"
							onChange={handleForm}
							name="description"
							type="text"
						/>
					</div>
					<div>
						<label className="form-label">Status</label>
						<input
							className="form-control"
							onChange={handleForm}
							name="status"
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
					Return
				</button>
			</main>
		</>
	);
};

export default TasksForm;
