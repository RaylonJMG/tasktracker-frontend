import React, { useEffect, useState } from "react";

export const Task = () => {
	const [task, setTask] = useState([]);

	const getTaskData = async () => {
		const result = await fetch("http://44.201.249.93:4000/api/tasks");
		const data = await result.json();
		setTask(data);
	};

	useEffect(() => {
		getTaskData();
	}, []);

	return (
		<>
			<h3>Tasks</h3>
			<table className="table, primary">
				<thead>
					<th>task_id</th>
					<th>description</th>
					<th>status</th>
					<th>employee_id</th>
				</thead>
				<tbody>
					{task.map((item) => (
						<tr key={item.task_id}>
							<td>{item.task_id}</td>
							<td>{item.description}</td>
							<td>{item.status}</td>
							<td>{item.employee_id}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
