import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/user/dashboard/Dashboard";
import MyTask from "../pages/user/tasks/MyTask";
import TaskHistory from "../pages/user/history/TaskHistory";
import EditProfile from "../pages/user/edit-profile/EditProfile";
import Login from "../pages/auth/login/Login";
import UserPanel from "../pages/user/panel/UserPanel";
import AuthContextProvider from "../context/AuthContextProvider";

const RouteConfig = () => {
	const CustomUserPanel = (
		<AuthContextProvider>
			<UserPanel />
		</AuthContextProvider>
	);
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/user'
						element={CustomUserPanel}>
						<Route
							path=''
							element={<Dashboard />}
						/>
						<Route
							path='my-task'
							element={<MyTask />}
						/>
						<Route
							path='history'
							element={<TaskHistory />}
						/>
						<Route
							path='edit-profile'
							element={<EditProfile />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default RouteConfig;
