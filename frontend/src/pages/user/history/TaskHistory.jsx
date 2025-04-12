import React, { useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";

import TaskItem from "../../../components/list/TaskItem";
import Modal from "../../../components/modal/Modal";
import TaskForm from "../../../components/form/task/TaskForm";
import { useGetAllTaskQuery } from "../../../store/api/taskApi";
import { useDispatch, useSelector } from "react-redux";
import PageLoading from "../../../components/loader/PageLoading";
import { addAllTask } from "../../../store/features/taskSlice";
import { statusOptions } from "../../../utils/status";
import DatePicker from "react-datepicker";

const TaskHistory = () => {
	// name, description, time, label, status, progress, date;
	const [openTaskId, setOpenTaskId] = useState(null);
	const [openDropdown, setOpenDropdonwn] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	// const filterOptions = ["Status", "DateTime", "Filter"];
	const [filter, setFilter] = useState("Filter");

	const {
		data: myTask,
		isLoading: myTaskLoading,
		isError: myTaskError,
		isSuccess: myTaskSuccess,
	} = useGetAllTaskQuery();

	const tasks = useSelector((state) => state.task.value);
	const dispatch = useDispatch();
	const searchTasks = (e) => {
		const { value } = e.target;
		if (value == "") {
			dispatch(addAllTask(myTask));
		} else {
			dispatch(
				addAllTask(
					[...myTask].filter((task) =>
						task.name.startsWith(value),
					),
				),
			);
		}
	};

	const filterTaskByStatus = (e) => {
		const { value } = e.target;
		dispatch(
			addAllTask(
				[...myTask].filter((task) => task.status == value),
			),
		);
	};

	useEffect(() => {
		if (selectedDate) {
			dispatch(
				addAllTask(
					[...myTask]
						.reverse()
						.filter(
							(task) =>
								new Date(task.time.start) >=
								new Date(selectedDate),
						),
				),
			);
		}
	}, [selectedDate]);

	useEffect(() => {
		if (myTaskSuccess) {
			dispatch(addAllTask(myTask));
		}
	}, [myTaskSuccess]);

	useEffect(() => {
		setOpenDropdonwn(false);
		if (filter == "Filter") {
			dispatch(addAllTask(myTask));
		}
	}, [filter]);

	return (
		<>
			{myTaskLoading && <PageLoading />}
			{!myTaskLoading && (
				<div className='flex flex-col gap-3 h-full w-full text-center mt-36 pb-20 overflow-auto'>
					<div className='flex flex-col gap-4 md:flex-row justify-between h-fit  md:h-12 w-11/12 mx-auto items-center'>
						<h1 className='text-xl font-sans font-semibold text-slate-600'>
							Task History
						</h1>
						<div className='flex justify-center  md:w-auto  px-4 gap-1'>
							<div className='flex w-3/5 md:w-auto border rounded-md border-slate-300 shadow h-10 items-center '>
								<input
									type='text'
									name='search'
									onChange={searchTasks}
									className='focus:outline-0 h-full placeholder:text-xs px-2 flex items-center text-sm'
									placeholder='Search tasks..'
								/>
								<div className='flex items-center justify-center h-full me-7 md:w-8'>
									<Search className='size-4 text-slate-500' />
								</div>
							</div>
							<div className='flex items-center'>
								{filter == "Date & Time" && (
									<DatePicker
										selected={
											selectedDate
										}
										name='filterDateTime'
										onChange={(date) =>
											setSelectedDate(
												date,
											)
										}
										value={
											new Date(
												selectedDate,
											)
										}
										showTimeSelect
										timeFormat='HH:mm'
										timeIntervals={15}
										dateFormat='MMMM d, yyyy h:mm aa'
										placeholderText='Select Time'
										className='border border-slate-400 rounded-md px-2 h-10 w-full'
									/>
								)}
								{filter == "Status" && (
									<select
										className='border border-slate-300 rounded-md min-w-36 h-10 px-2'
										onChange={
											filterTaskByStatus
										}>
										{statusOptions.map(
											({
												title,
												value,
											}) => (
												<option
													value={
														value
													}>
													{
														title
													}
												</option>
											),
										)}
									</select>
								)}
							</div>
							{filter !== "Filter" && (
								<button
									className='flex items-center justify-center  h-10 min-w-24 w-fit px-1 shadow rounded-md bg-gray-100 text-slate-600'
									onClick={() =>
										setFilter("Filter")
									}>
									Clear
								</button>
							)}
							<div className='flex items-center justify-center  gap-2 relative'>
								<button
									className='flex items-center justify-center  h-10 min-w-24 w-fit px-1 shadow rounded-md bg-gray-100 text-slate-600'
									onClick={() =>
										setOpenDropdonwn(
											!openDropdown,
										)
									}>
									{filter}
								</button>

								{openDropdown && (
									<div className='z-30 flex min-w-40 bg-white rounded-md  absolute top-full mt-1 -end-4 shadow-lg '>
										<ul className='flex flex-col py-2 justify-center w-full'>
											<li
												className='text-center w-full hover:bg-sky-50 py-1'
												onClick={() =>
													setFilter(
														"Status",
													)
												}>
												Status
											</li>
											<li
												className='text-center w-full hover:bg-sky-50 py-1'
												onClick={() =>
													setFilter(
														"Date & Time",
													)
												}>
												Date &
												Time
											</li>
										</ul>
									</div>
								)}
							</div>
						</div>
					</div>
					<hr className='w-11/12 mx-auto mt-1 border-slate-300' />

					<div className='w-full'>
						<ul className='flex flex-col gap-2 w-11/12 mx-auto'>
							{myTaskSuccess &&
							tasks &&
							tasks.length !== 0 ? (
								[...tasks]
									.reverse()
									.map((task) => (
										<TaskItem
											key={task._id}
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
									))
							) : (
								<div className='w-full h-[50vh] flex items-center justify-center text-4xl text-slate-600 font-sans font-semibold'>
									No Task Found
								</div>
							)}
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export default TaskHistory;
