import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Employee } from "./component/Employee.jsx";
import { Task } from "./component/Tasks.jsx";

function App() {
	return (
		<>
			<h1>Task Tracker</h1>
			<Employee />
			<hr />
			<Task />
		</>
	);
}

export default App;
