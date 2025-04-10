import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LabelInput from "../../input/LabelInput";
import {
	useCreateTaskMutation,
	useEditTaskMutation,
} from "../../../store/api/taskApi";
import ResponseModal from "../../modal/message/ResponseModal";
import Modal from "../../modal/Modal";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../../store/features/taskSlice";

const TaskForm = ({ action, data = null, title, setOpen }) => {
	const [label, setLabel] = useState([]);
	const [message, setMessage] = useState("");
	const [openResponseModal, setOpenResponseModal] = useState(false);
	const dispatch = useDispatch();
	const [
		createTask,
		{
			data: newTask,
			isLoading: createTaskLoading,
			isError: createTaskError,
			isSuccess: createTaskSuccess,
		},
	] = useCreateTaskMutation();

	const [
		editTask,
		{
			data: updatedTask,
			isLoading: editTaskLoading,
			isError: editTaskError,
			isSuccess: editTaskSuccess,
		},
	] = useEditTaskMutation();

	const formik = useFormik({
		initialValues: {
			id: "",
			name: "",
			description: "",
			label: label,
			status: 0,
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required("Task Name is Required")
				.min(3, "Minimum 3 character's required")
				.max(50, "Maximum size reached out"),
			description: Yup.string().max(
				1000,
				"Maximum size reached out",
			),
			startTime: Yup.date()
				.required("Start Time is required")
				.min(
					new Date(),
					"Start Time must be today or in the future",
				),

			endTime: Yup.date()
				.nullable()
				.notRequired()
				.when("startTime", (startTime, schema) =>
					startTime
						? schema.min(
								startTime,
								"End Time must be after or equal to Start Time",
						  )
						: schema,
				),

			status: Yup.number().typeError("Status must be a number"),
		}),
		onSubmit: async (data) => {
			try {
				const time = {
					start: data.startTime,
					end: data.endTime,
				};
				// console.log(data);
				console.log(data);
				const response =
					action == "add"
						? await createTask({
								...data,
								time: time,
						  }).unwrap()
						: await editTask({
								...data,
								time: time,
						  }).unwrap();

				if (response) {
					setMessage(response.message);
				}
			} catch (err) {
				if (err.data) {
					setMessage(err.data.message);
				} else {
					setMessage(err.message);
				}
			} finally {
				setOpenResponseModal(true);
			}
		},
		validateOnBlur: true,
		validateOnChange: true,
		validateOnMount: false,
	});

	const statusOptions = [
		{
			value: 0,
			title: "Not Started",
		},
		{
			value: 1,
			title: "Completed",
		},
		{
			value: 2,
			title: "In Progress",
		},
		{
			value: 3,
			title: "Incomplete",
		},
	];

	useEffect(() => {
		formik.setFieldValue("label", label);
	}, [label]);

	useEffect(() => {
		if (openResponseModal) {
			if (createTaskSuccess || editTaskSuccess) {
				if (action == "add") {
					dispatch(addTask(newTask.task));
				} else {
					dispatch(updateTask(updatedTask.task));
				}
				setTimeout(() => {
					setOpen(false);
				}, 2000);
			}
			setTimeout(() => {
				setOpenResponseModal(false);
			}, 2000);
		}
	}, [openResponseModal, createTaskSuccess, editTaskSuccess]);

	useEffect(() => {
		if (action == "edit" && data) {
			const { name, status, description, label, time, _id } = data;
			const { start, end } = time;
			formik.setValues({
				name: name,
				description: description,
				label: label,
				status: status,
				startTime: new Date(start),
				endTime: new Date(end),
				id: _id,
			});
			setLabel(label);
		}
	}, [data]);
	return (
		<>
			<form
				onSubmit={formik.handleSubmit}
				className='p-3 flex flex-col gap-2 items-center w-full font-sans'>
				<legend className='text-2xl text-center font-semibold text-slate-800'>
					{title}
				</legend>
				<div className='w-full flex flex-col gap-1'>
					<input
						type='text'
						placeholder='Title'
						name={"name"}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className='border border-slate-400 rounded-md px-2 h-10'
						value={formik.values.name}
					/>
					{formik.touched.name && formik.errors.name && (
						<p className='text-red-500 text-xs'>
							{formik.errors.name}
						</p>
					)}
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 w-full gap-2'>
					<div className='w-full flex flex-col gap-1'>
						<DatePicker
							selected={formik.values.startTime}
							name='startTime'
							onChange={(date) =>
								formik.setFieldValue(
									"startTime",
									date,
								)
							}
							onBlur={() =>
								formik.setFieldTouched(
									"startTime",
									true,
								)
							}
							value={
								new Date(
									formik.values.startTime,
								)
							}
							showTimeSelect
							timeFormat='HH:mm'
							timeIntervals={15}
							dateFormat='MMMM d, yyyy h:mm aa'
							placeholderText='Start Time'
							className='border border-slate-400 rounded-md px-2 h-10 w-full'
						/>
						{formik.errors.startTime && (
							<p className='text-red-500 text-xs'>
								{formik.errors.startTime}
							</p>
						)}
					</div>
					<div className='w-full flex flex-col gap-1'>
						<DatePicker
							selected={formik.values.endTime}
							name='endTime'
							onChange={(date) =>
								formik.setFieldValue(
									"endTime",
									date,
								)
							}
							onBlur={() =>
								formik.setFieldTouched(
									"endTime",
									true,
								)
							}
							value={
								new Date(formik.values.endTime)
							}
							showTimeSelect
							timeFormat='HH:mm'
							timeIntervals={15}
							dateFormat='MMMM d, yyyy h:mm aa'
							placeholderText='End Time'
							className='border border-slate-400 rounded-md px-2 h-10 w-full'
						/>
						{formik.errors.endTime && (
							<p className='text-red-500 text-xs'>
								{formik.errors.endTime}
							</p>
						)}
					</div>
				</div>
				<div className='flex flex-col gap-2 w-full'>
					<select
						name='status'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className='border border-slate-400 rounded-md px-2 h-10 '
						value={formik.values.status}>
						{statusOptions.map(({ title, value }) => (
							<option value={value}>{title}</option>
						))}
					</select>
				</div>
				<div className='w-full'>
					<LabelInput
						tags={label}
						setTags={setLabel}
					/>
				</div>
				<div className='w-full flex flex-col gap-1'>
					<textarea
						rows={5}
						cols={10}
						placeholder='Enter text here...'
						name={"description"}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className='border border-slate-400 rounded-md px-2'
						value={
							formik.values.description
						}></textarea>
					{formik.touched.description &&
						formik.errors.description && (
							<p className='text-red-500 text-xs'>
								{formik.errors.description}
							</p>
						)}
				</div>
				<button
					type='submit'
					name='submit'
					className='rounded-md bg-blue-400 text-white shadow-md h-10 min-w-fit w-24'>
					Submit
				</button>
			</form>
			<Modal
				open={openResponseModal}
				setOpen={setOpenResponseModal}>
				<ResponseModal
					setOpen={setOpenResponseModal}
					isError={createTaskError || editTaskError}
					isSuccess={createTaskSuccess || editTaskSuccess}
					message={message}
				/>
			</Modal>
		</>
	);
};

export default TaskForm;
