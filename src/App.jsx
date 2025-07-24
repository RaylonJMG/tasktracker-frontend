import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Employee } from "./pages/Employee.jsx";
import { EditEmployee } from "./pages/EditEmployee.jsx";

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
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
