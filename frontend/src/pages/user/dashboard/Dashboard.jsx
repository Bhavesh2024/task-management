import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/navbar/Navbar";
import Sidebar from "../../../layouts/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useGetAllTaskQuery } from "../../../store/api/taskApi";
import PageLoading from "../../../components/loader/PageLoading";

const Dashboard = () => {
	const {
		data: allTasks = [],
		isLoading,
		isError,
		isSuccess,
	} = useGetAllTaskQuery();

	const [taskCount, setTaskCount] = useState({
		total: 0,
		completed: 0,
		inComplete: 0,
		inProgress: 0,
		notStarted: 0,
	});

	useEffect(() => {
		if (isSuccess && allTasks.length > 0) {
			let updatedCounts = {
				total: allTasks.length,
				completed: 0,
				inComplete: 0,
				inProgress: 0,
				notStarted: 0,
			};

			allTasks.forEach((task) => {
				switch (task.status) {
					case 0:
						updatedCounts.notStarted++;
						break;
					case 1:
						updatedCounts.completed++;
						break;
					case 2:
						updatedCounts.inProgress++;
						break;
					case 3:
						updatedCounts.inComplete++;
						break;
					default:
						break;
				}
			});

			setTaskCount(updatedCounts);
		}
	}, [isSuccess, allTasks]);

	return (
		<>
			{isLoading && <PageLoading />}
			{isError && (
				<div className='flex items-center justify-center text-2xl md:text-4xl text-slate-500 '>
					No Tasks Found
				</div>
			)}
			{isSuccess && (
				<div className='w-11/12 mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
					{[
						{
							label: "Total Tasks",
							count: taskCount.total,
							color: "bg-slate-500",
						},
						{
							label: "Completed",
							count: taskCount.completed,
							color: "bg-emerald-500",
						},
						{
							label: "In Progress",
							count: taskCount.inProgress,
							color: "bg-indigo-500",
						},
						{
							label: "Incomplete",
							count: taskCount.inComplete,
							color: "bg-yellow-400",
						},
						{
							label: "Not Started",
							count: taskCount.notStarted,
							color: "bg-red-400",
						},
					].map((item, index) => (
						<div
							key={index}
							className={`rounded-md shadow p-6 text-white flex flex-col items-center justify-center ${item.color}`}>
							<h3 className='text-lg font-semibold'>
								{item.label}
							</h3>
							<p className='text-3xl mt-2'>
								{item.count}
							</p>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default Dashboard;
