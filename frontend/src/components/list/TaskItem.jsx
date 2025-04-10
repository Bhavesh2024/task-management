import React, { useEffect, useState } from "react";
import {
	Edit,
	EllipsisVertical,
	Eye,
	Trash2,
	X,
	LayoutList,
	CalendarClock,
} from "lucide-react";
import { formatDateTime } from "../../utils/formatter";
import { taskStatus } from "../../utils/status";
import Modal from "../modal/Modal";
import Alert from "../modal/alert/Alert";
import { useRemoveTaskMutation } from "../../store/api/taskApi";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../store/features/taskSlice";
import ViewTask from "../modal/task/view/ViewTask";
// import { set } from "mongoose";
const TaskItem = ({
	data,
	open,
	setOpen,
	formModalHandler,
	disabled = false,
}) => {
	const { name, description, label, status, time, createdAt } = data;
	const [alert, setAlert] = useState(false);
	const [openEditTaskModal, setOpenEditTaskModal] = useState(false);
	const [openViewTask, setOpenViewTask] = useState(false);
	const task = useSelector((state) => state.task.value);
	const dispatch = useDispatch();
	const [
		removeTask,
		{
			data: removedTask,
			isLoading: RemoveTaskLoading,
			isError: RemoveTaskError,
			isSuccess: RemoveTaskSuccess,
		},
	] = useRemoveTaskMutation();
	const [message, setMessage] = useState("");
	const handleDelete = async () => {
		try {
			const response = await removeTask(data._id).unwrap();
			if (response) {
				setMessage(response.message);
			}
		} catch (err) {
			if (err.data) {
				setMessage(err.data.message);
			} else {
				setMessage(err.message);
			}
		}
	};

	useEffect(() => {
		if (RemoveTaskSuccess) {
			dispatch(deleteTask(data._id));
			setTimeout(() => {
				setOpen(false);
			}, 3000);
		}
	}, [RemoveTaskSuccess]);

	useEffect(() => {
		console.log("task ::::", data);
	}, []);
	return (
		<>
			<div className='h-12 w-full bg-slate-100 flex items-center justify-between rounded-md px-3 hover:bg-sky-200'>
				<div className='flex gap-2 items-center text-sm font-sans'>
					<LayoutList className='size-5' />
					{name}
				</div>
				<div className='w-fit ms-auto me-2'>
					<div className='flex justify-start items-center text-xs bg-white rounded-md p-2 gap-2 w-full'>
						<CalendarClock className='size-4' />
						{formatDateTime(time.start)} -{" "}
						{formatDateTime(time.end)}
					</div>
				</div>
				<div
					className={`px-3 py-1 rounded-md h-8 flex items-center justify-center text-white text-sm shadow text-nowrap ${
						taskStatus[`${status}`].statusBackground
					}`}>
					{taskStatus[`${status}`].text}
				</div>

				<div className='relative'>
					<EllipsisVertical
						className='text-slate-700 size-5 cursor-pointer hover:text-gray-500 transition'
						onClick={() => setOpen(!open)}
					/>
					{open && (
						<div className='absolute right-0 mt-2 min-w-28  bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-auto max-h-48'>
							<ul className='flex flex-col '>
								<li
									className='flex gap-1 items-center px-4 py-1 hover:bg-sky-200 cursor-pointer text-sky-500'
									onClick={() => {
										setOpen(false);
										setOpenViewTask(
											true,
										);
									}}>
									<Eye className='size-5 text-sky-400' />
									View
								</li>
								{!disabled && (
									<>
										<li
											className=' flex gap-1 items-center px-4 py-1 hover:bg-emerald-200 cursor-pointer text-emerald-500'
											onClick={() => {
												setOpen(
													false,
												);
												formModalHandler(
													"edit",
													data,
												);
											}}>
											<Edit className='size-5 text-emerald-400' />
											Edit
										</li>
										<li
											className=' flex gap-1 items-center px-4 py-1 hover:bg-red-200 cursor-pointer text-red-500'
											onClick={() => {
												setOpen(
													false,
												);
												setAlert(
													true,
												);
											}}>
											<Trash2 className='size-5 text-red-500' />
											Delete
										</li>
									</>
								)}
							</ul>
						</div>
					)}
				</div>
			</div>

			<Modal
				open={alert}
				setOpen={setAlert}>
				<div>
					<Alert
						setOpen={setAlert}
						positiveAction={handleDelete}
						negativeAction={() => setAlert(false)}
						errMessage={message}
						successMessage={message}
						title={"Delete"}
						message={"Are you sure to delete task?"}
						isSuccess={RemoveTaskSuccess}
						isError={RemoveTaskError}
						isLoading={RemoveTaskLoading}
					/>
				</div>
			</Modal>
			<Modal
				open={openViewTask}
				setOpen={setOpenViewTask}>
				<ViewTask
					setOpen={setOpenViewTask}
					task={data}
				/>
			</Modal>
		</>
	);
};

export default TaskItem;
