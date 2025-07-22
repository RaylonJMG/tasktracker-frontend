import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EditEmployees } from "./component/EditEmployee.jsx";
import { Tasks } from "./pages/Tasks.jsx";
import { Home } from "./pages/Home.jsx";
import { Employee } from "./pages/Employee.jsx";

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
						path="/editEmployees/:employee_id"
						element={<EditEmployees />}
					/>
					<Route
						path="/tasks/:tasks_id"
						element={<Tasks />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
