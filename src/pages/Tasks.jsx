import React, { useEffect, useState } from "react";
import { TasksTable } from "../component/TasksTable.jsx";
import TasksForm from "../component/TasksForm.jsx";

export const Tasks = () => {
	const [tasks, setTasks] = useState([]);

	const getAllTasks = async () => {
		const url = `${baseUrl}${endpoint}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			headers: {
				authorization: token,
			},
		});
		const data = await result.json();
		setTasks(data);
	};

	useEffect(() => {
		getAllTasks();
	});

	return (
		<>
			<TasksForm refreshTasks={getAllTasks} />
			<hr />
			<TasksTable tasks={tasks} />
		</>
	);
};
