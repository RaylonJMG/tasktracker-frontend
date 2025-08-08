import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
	const isLoggedIn = true;
	return isLoggedIn ? (
		<Outlet />
	) : (
		<Navigate
			to={"/login"}
			replace
		/>
	);
};
