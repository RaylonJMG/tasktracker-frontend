import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Employee } from "./pages/Employee.jsx";
import { Tasks } from "./pages/Tasks.jsx";
import { NavBar } from "./component/NavBar.jsx";
import { EditEmployee } from "./component/EditEmployee.jsx";
import { RegisterUser } from "./component/RegisterUser.jsx";

function App() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const validateToken = () => {
		const token = localStorage.getItem("token");
		if (token) {
			setLoggedIn(true);
		}
	};
	useEffect(() => {
		validateToken();
	}, []);

	return (
		<>
			<BrowserRouter>
				{isLoggedIn && <NavBar login={setLoggedIn} />}
				<Routes>
					<Route
						path="/"
						element={<Home login={setLoggedIn} />}
					/>
					<Route
						path="/register"
						element={<RegisterUser />}
					/>
					{isLoggedIn && (
						<Route
							path="/employee"
							element={<Employee />}
						/>
					)}
					{isLoggedIn && (
						<Route
							path="/editEmployee/:employee_id"
							element={<EditEmployee />}
						/>
					)}
					{isLoggedIn && (
						<Route
							path="/tasks"
							element={<Tasks />}
						/>
					)}
					{isLoggedIn && (
						<Route
							path="/tasks/:employee_id"
							element={<Tasks />}
						/>
					)}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
