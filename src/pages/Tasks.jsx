import React from "react";
import { TasksTable } from "../component/TasksTable.jsx";
import TasksForm from "../component/TasksForm.jsx";

export const Tasks = () => {
	return (
		<>
			<TasksForm />
			<hr />
			<TasksTable />
		</>
	);
};
