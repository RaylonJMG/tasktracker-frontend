import React from "react";
import { TasksTable } from "../component/TasksTable";

export const Tasks = () => {
	return (
		<>
			<TasksForm />
			<hr />
			<TasksTable />
		</>
	);
};
