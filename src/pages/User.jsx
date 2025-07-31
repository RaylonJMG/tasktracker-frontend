import React from "react";
import { UserTable } from "../component/UserTable.jsx";
import RegisterUser from "../component/RegisterUser.jsx";

export const User = () => {
	return (
		<>
			<h1>User Database</h1>
			<RegisterUser />
			<hr />
			<UserTable />
		</>
	);
};
