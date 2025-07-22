import React from "react";
import EmployeeForm from "../component/EmployeeForm";
import { EmployeeTable } from "../component/EmployeeTable";

export const Employee = () => {
	return (
		<>
			<EmployeeForm />
			<hr />
			<EmployeeTable />
		</>
	);
};
