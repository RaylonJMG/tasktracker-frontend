import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "tasks";

export const TasksForm = () => {
	const navigate = useNavigate();
	const { employee_id } = useParams();
	const [tasks, setTasks] = useState({
		description: "",
		status: "",
		employee_id: employee_id,
	});

	const handleForm = (event) => {
		const { name, value } = event.target;
		const formInput = {
			description: tasks.description,
			status: tasks.status,
			employee_id: employee_id,
		};
		formInput[name] = value;
		console.log(name);
		setTasks(formInput);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const token = localStorage.getItem("token");
		const url = `${baseUrl}${endpoint}`;
		const result = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
			body: JSON.stringify({
				description: "",
				status: "",
				employeeId: employeeId,
			}),
		});
		const data = await result.json();
		console.log(data);
		setTasks({ description: "", status: "", employee_id });

		window.location.reload();
		navigate(`/employee`);
	};

	const handleReturn = () => {
		navigate("/tasks");
	};

	return (
		<>
			<main className="container mb-2">
				<h1 className="text-center"> Add Tasks</h1>
				<form
					onSubmit={handleSubmit}
					className="mt-5">
					<div>
						<label className="form-label">Description</label>
						<input
							className="form-control"
							onChange={handleForm}
							value={tasks.description}
							name="description"
							type="text"
						/>
					</div>
					<div>
						<label className="form-label">Status</label>
						<input
							className="form-control"
							onChange={handleForm}
							value={tasks.status}
							name="status"
							type="text"
						/>
					</div>
					<div>
						<label className="form-label">Employee ID</label>
						<input
							className="form-control"
							onChange={handleForm}
							value={employee_id}
							name="employee_id"
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
					type="button"
					name="Return"
					className="btn btn-danger mt-2 w-100"
					onClick={handleReturn}>
					Return
				</button>
			</main>
		</>
	);
};

export default TasksForm;
