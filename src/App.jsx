import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Employee } from "./pages/Employee.jsx";
import { EditEmployee } from "./pages/EditEmployee.jsx";
import { Tasks } from "./pages/Tasks.jsx";
import { Users } from "./pages/Users.jsx";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/employee"
						element={<Employee />}
					/>
					<Route
						path="/editEmployee/:employee_id"
						element={<EditEmployee />}
					/>
					<Route
						path="/tasks"
						element={<Tasks />}
					/>
					<Route
						path="/tasks/:employee_id"
						element={<Tasks />}
					/>
					<Route
						path="/users"
						element={<Users />}
					/>
					<Route
						path="/users/:user_id"
						element={<Users />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
