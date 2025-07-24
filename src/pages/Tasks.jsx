import React from "react";
import { TasksTable } from "../component/TasksTable";
import TasksForm from "../component/TasksForm";

export const Tasks = () => {
	return (
		<>
			<TasksForm />
			<hr />
			<TasksTable />
		</>
	);
};
