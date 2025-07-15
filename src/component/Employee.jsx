import React, { useEffect, useState } from "react";

export const Employee = () => {
	const [employees, setEmployees] = useState([]);

	const getEmployeeData = async () => {
		const result = await fetch("http://44.201.249.93:4000/api/employee");
		const data = await result.json();
		setEmployees(data);
	};

	useEffect(() => {
		getEmployeeData();
	}, []);

	return (
		<>
			<h3>Employees</h3>
			<table className="table, primary">
				<thead>
					<th>employee_id</th>
					<th>name</th>
					<th>department</th>
					<th>role</th>
				</thead>
				<tbody>
					{employees.map((item) => (
						<tr key={item.employee_id}>
							<td>{item.employee_id}</td>
							<td>{item.name}</td>
							<td>{item.department}</td>
							<td>{item.role}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
