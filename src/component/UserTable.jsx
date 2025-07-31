import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = "user";

export const UserTable = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState([]);

	const getUser = async () => {
		const url = baseUrl + endpoint;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "GET",
			headers: {
				authorization: token,
			},
		});
		const data = await result.json();
		setUser(data);
	};
	const handleEdit = (id) => {
		navigate(`/editUser/${id}`);
	};
	const handleDelete = async (id) => {
		const url = `${baseUrl}${endpoint}/${id}`;
		const token = localStorage.getItem("token");
		const result = await fetch(url, {
			method: "DELETE",
			headers: {
				authorization: token,
			},
		});
		const data = await result.json();
		window.location.reload();
	};
	const handleUsers = (id) => {
		navigate(`/user/${id}`);
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<>
			<h1>User Database</h1>
			<div className="table-responsive">
				<table className="table container text-align:center table-responsive">
					<thead>
						<tr>
							<th>User Name</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Phone</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="table-group-divider">
						{user.map((item) => (
							<tr key={item.user_id}>
								<td>{item.username}</td>
								<td>{item.first_name}</td>
								<td>{item.last_name}</td>
								<td>{item.phone}</td>
								<td>
									<button
										type="button"
										onClick={() => handleEdit(item.user_id)}
										className="btn btn-primary">
										<i className="bi bi-pencil-square"></i>
									</button>
									<button
										type="button"
										onClick={() => handleDelete(item.user_id)}
										className="btn btn-danger">
										<i className="bi bi-person-x"></i>
									</button>
									<button
										type="button"
										onClick={() => handleUsers(item.user_id)}
										className="btn btn-info"></button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
