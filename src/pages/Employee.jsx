import React, { useState } from "react";
import EmployeeForm from "../component/EmployeeForm";
import { EmployeeTable } from "../component/EmployeeTable";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "employee";

export const Employee = () => {
	return (
		<>
			<EmployeeForm />
			<hr />
			<EmployeeTable />
		</>
	);
};
