import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userDataPattern } from "../../../utils/pattern";
import { useEditUserMutation } from "../../../store/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../store/features/userSlice";
import { CircleCheck, CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Account = () => {
	const [message, setMessage] = useState("");
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const { name, email, password, username } = userDataPattern;
	const [editAccount, { data, isLoading, isSuccess, isError }] =
		useEditUserMutation();
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			name: "",
			username: "",
			email: "",
			oldPassword: "",
			newPassword: "",
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required("Name is required")
				.matches(name, "Name is not in valid format")
				.min(2, "Name must be at least 2 characters")
				.max(50, "Maximum character limit reached"),

			username: Yup.string()
				.required("Username is required")
				.matches(username, "Username is in invalid format")
				.min(3, "Username must be 3 characters long")
				.max(16, "Maximum character limit reached"),

			email: Yup.string()
				.required("Email is required")
				.matches(email, "Email is in invalid format")
				.min(11, "Email must be at least 11 characters")
				.max(255, "Maximum size reached"),

			oldPassword: Yup.string(),

			newPassword: Yup.string().test(
				"passwords-valid-when-filled",
				"Both old and new passwords are required and must be valid when changing password.",
				function (newPassword) {
					const { oldPassword } = this.parent;
					if (newPassword || oldPassword) {
						const isValidNew =
							password.test(newPassword);
						const isValidOld =
							password.test(oldPassword);
						if (!newPassword || !oldPassword)
							return false;
						if (!isValidNew || !isValidOld)
							return false;
					}
					return true;
				},
			),
		}),
		onSubmit: async (data) => {
			try {
				console.log("Submitted Data:", data);
				const response = await editAccount(data).unwrap();
				if (response) {
					setMessage(response.message);
					dispatch(updateUser(response.user));
				}
			} catch (err) {
				if (err.data) {
					setMessage(err.data.message);
				} else {
					setMessage(err.message);
				}
				console.error("Submission Error:", err);
			} finally {
				setOpen(true);
			}
		},
		validateOnBlur: true,
		validateOnChange: true,
		validateOnMount: false,
	});

	useEffect(() => {
		// console.log(user);
		if (user) {
			const { email, username, name } = user;
			formik.setValues({
				name: name,
				email: email,
				username: username,
			});
		}
	}, [user]);
	useEffect(() => {
		if (open) {
			setTimeout(() => {
				if (isSuccess) {
					navigate("/user/");
				}
				setMessage("");
				setOpen(false);
			}, 3000);
		}
	}, [open, isSuccess]);
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 w-full'>
			{open && (
				<div className='bg-white flex justify-center gap-1 items-center h-10 rounded-md w-full max-w-lg my-2 shadow text-slate-600'>
					{isError && <CircleX className='text-red-400' />}
					{isSuccess && (
						<CircleCheck className='text-emerald-500' />
					)}
					{message}
				</div>
			)}
			<form
				onSubmit={formik.handleSubmit}
				className='bg-white shadow-md rounded-md px-8 pt-6 pb-8 w-full max-w-lg'>
				<h2 className='text-2xl font-bold mb-4 text-center text-neutral-700'>
					Edit Account
				</h2>

				{/* Name */}
				<div className='mb-4'>
					<input
						type='text'
						id='name'
						name='name'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
						placeholder='Enter your name'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline placeholder:text-slate-500'
					/>
					{formik.touched.name && formik.errors.name && (
						<p className='text-red-500 text-xs mt-1'>
							{formik.errors.name}
						</p>
					)}
				</div>

				{/* Username */}
				<div className='mb-4'>
					<input
						type='text'
						id='username'
						name='username'
						placeholder='Username'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.username}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
					{formik.touched.username &&
						formik.errors.username && (
							<p className='text-red-500 text-xs mt-1'>
								{formik.errors.username}
							</p>
						)}
				</div>

				{/* Email */}
				<div className='mb-4'>
					<input
						type='email'
						id='email'
						name='email'
						placeholder='Email'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
					{formik.touched.email && formik.errors.email && (
						<p className='text-red-500 text-xs mt-1'>
							{formik.errors.email}
						</p>
					)}
				</div>

				{/* Old Password */}
				<div className='mb-4'>
					<input
						type='password'
						id='oldPassword'
						name='oldPassword'
						placeholder='Old Password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.oldPassword}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
					{formik.touched.oldPassword &&
						formik.errors.oldPassword && (
							<p className='text-red-500 text-xs mt-1'>
								{formik.errors.oldPassword}
							</p>
						)}
				</div>

				{/* New Password */}
				<div className='mb-4'>
					<input
						type='password'
						id='newPassword'
						name='newPassword'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.newPassword}
						placeholder='New Password'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
					{formik.touched.newPassword &&
						formik.errors.newPassword && (
							<p className='text-red-500 text-xs mt-1'>
								{formik.errors.newPassword}
							</p>
						)}
				</div>

				{/* Submit */}
				<div className='flex items-center justify-between'>
					<button
						type='submit'
						className='bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto '>
						Update Account
					</button>
				</div>
			</form>
		</div>
	);
};

export default Account;
