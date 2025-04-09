import React, { useState } from "react";
import {
	Calendar,
	CalendarClock,
	LayoutList,
	Plus,
	Edit,
	EllipsisVertical,
	Eye,
	Trash2,
	X,
} from "lucide-react";

import {
	formatDate,
	formatDateTime,
	formatTime,
} from "../../../utils/formatter";
import TaskItem from "../../../components/list/TaskItem";
const MyTask = () => {
	// name, description, time, label, status, progress, date;
	const [open, setOpen] = useState(false);
	const [openTaskId, setOpenTaskId] = useState(null);

	const taskList = [
		{
			id: 1,
			name: "Setup Project of Progress Tracker",
			description:
				"Initialize the codebase and set up dependencies",
			label: "Urgent",
			status: 0,
			time: {
				startTime: "2025-04-08T09:00:00.000Z",
				endTime: "2025-04-08T12:00:00.000Z",
			},
			createdAt: Date.now(),
		},
		{
			id: 2,
			name: "Design UI Wireframes",
			description: "Create initial UI layout for dashboard",
			label: "High",
			status: 2,
			time: {
				startTime: "2025-04-09T10:00:00.000Z",
				endTime: "2025-04-09T14:00:00.000Z",
			},
			createdAt: Date.now(),
		},
		{
			id: 3,
			name: "Implement Auth System",
			description: "Add Google and email login/signup",
			label: "Medium",
			status: 0,
			time: {
				startTime: "2025-04-10T11:00:00.000Z",
				endTime: "2025-04-10T15:30:00.000Z",
			},
			createdAt: Date.now(),
		},
		{
			id: 4,
			name: "Create User Dashboard",
			description: "Display user tasks and progress",
			label: "High",
			status: 0,
			time: {
				startTime: "2025-04-11T09:30:00.000Z",
				endTime: "2025-04-11T13:00:00.000Z",
			},
			createdAt: Date.now(),
		},
		{
			id: 5,
			name: "Setup MongoDB Database",
			description: "Create collections and sample schemas",
			label: "Medium",
			status: 1,
			time: {
				startTime: "2025-04-07T08:00:00.000Z",
				endTime: "2025-04-07T10:30:00.000Z",
			},
			createdAt: Date.now(),
		},
		{
			id: 6,
			name: "API Integration for Tasks",
			description: "Build RESTful APIs for task management",
			label: "Urgent",
			status: 2,
			time: {
				startTime: "2025-04-12T10:00:00.000Z",
				endTime: "2025-04-12T13:30:00.000Z",
			},
			createdAt: Date.now(),
		},
		{
			id: 7,
			name: "Responsive Design Fixes",
			description: "Ensure dashboard works on mobile devices",
			label: "Low",
			status: 0,
			time: {
				startTime: "2025-04-13T09:00:00.000Z",
				endTime: "2025-04-13T11:00:00.000Z",
			},
			createdAt: Date.now(),
		},
	];

	return (
		<>
			<div className='h-full w-full text-center mt-36'>
				<div className='flex justify-between h-12 w-11/12 mx-auto items-center'>
					<h1 className='text-xl font-sans font-semibold text-slate-600'>
						My Tasks
					</h1>
					<button className='flex items-center justify-center  h-10 min-w-24 w-fit px-1 shadow rounded-md bg-indigo-500 text-white'>
						<Plus /> Add
					</button>
				</div>
				<hr className='w-11/12 mx-auto mt-1 border-slate-300' />
				<div className='w-full'>
					<ul className='flex flex-col gap-2 w-11/12 mx-auto'>
						{taskList.map((task, index) => (
							<TaskItem
								data={task}
								open={openTaskId === task.id}
								setOpen={() =>
									setOpenTaskId(
										openTaskId ===
											task.id
											? null
											: task.id,
									)
								}
							/>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default MyTask;
