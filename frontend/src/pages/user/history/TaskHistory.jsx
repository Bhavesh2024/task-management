import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

import TaskItem from "../../../components/list/TaskItem";
import Modal from "../../../components/modal/Modal";
import TaskForm from "../../../components/form/task/TaskForm";
import { useGetAllTaskQuery } from "../../../store/api/taskApi";
import { useDispatch, useSelector } from "react-redux";
import PageLoading from "../../../components/loader/PageLoading";
import { addAllTask } from "../../../store/features/taskSlice";

const TaskHistory = () => {
	// name, description, time, label, status, progress, date;
	const [openTaskId, setOpenTaskId] = useState(null);
	const [openFormModal, setOpenFormModal] = useState(false);

	const [action, setAction] = useState("");
	const {
		data: myTask,
		isLoading: myTaskLoading,
		isError: myTaskError,
		isSuccess: myTaskSuccess,
	} = useGetAllTaskQuery();

	const tasks = useSelector((state) => state.task.value);
	const dispatch = useDispatch();

	useEffect(() => {
		if (myTaskSuccess) {
			dispatch(addAllTask(myTask));
		}
	}, [myTaskSuccess]);

	return (
		<>
			{myTaskLoading && <PageLoading />}
			{!myTaskLoading && (
				<div className='h-full w-full text-center mt-36'>
					<div className='flex justify-between h-12 w-11/12 mx-auto items-center'>
						<h1 className='text-xl font-sans font-semibold text-slate-600'>
							Task History
						</h1>
						<button className='flex items-center justify-center  h-10 min-w-24 w-fit px-1 shadow rounded-md bg-indigo-500 text-white'>
							Filter
						</button>
					</div>
					<hr className='w-11/12 mx-auto mt-1 border-slate-300' />

					<div className='w-full'>
						<ul className='flex flex-col gap-2 w-11/12 mx-auto'>
							{myTaskSuccess &&
								[...tasks]
									.reverse()
									.map((task) => (
										<TaskItem
											data={task}
											open={
												openTaskId ===
												task._id
											}
											setOpen={() =>
												setOpenTaskId(
													openTaskId ===
														task._id
														? null
														: task._id,
												)
											}
											disabled={
												true
											}
										/>
									))}
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export default TaskHistory;
