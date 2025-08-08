import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Employee } from "./pages/Employee.jsx";
import { Tasks } from "./pages/Tasks.jsx";
import { NavBar } from "./component/NavBar.jsx";
import { EditEmployee } from "./component/EditEmployee.jsx";
import { RegisterUser } from "./component/RegisterUser.jsx";
import { EditTasks } from "./component/EditTasks.jsx";
import TasksForm from "./component/TasksForm.jsx";
import { ProtectedRoutes } from "./component/ProtectedRoutes.jsx";
import { TasksTable } from "./component/TasksTable.jsx";

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
					{/*redirects logged in user*/}
					<Route
						path="/login"
						element={
							isLoggedIn ? (
								<Navigate to="/employee" />
							) : (
								<Home login={setLoggedIn} />
							)
						}
					/>
					<Route
						path="/register"
						element={
							isLoggedIn ? <Navigate to="/employee" /> : <RegisterUser />
						}
					/>
					<Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
						<Route
							path="/employee"
							element={<Employee />}
						/>
						<Route
							path="/employee/:employee_id"
							element={<EditEmployee />}
						/>
						<Route
							path="/tasks"
							element={<Tasks />}
						/>
						<Route
							path="/tasks/:employee_id"
							element={<TasksTable />}
						/>
						<Route
							path="/tasks/add/:employee_id"
							element={<TasksForm />}
						/>
						<Route
							path="/tasks/edit/:employee_id"
							element={<EditTasks />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
