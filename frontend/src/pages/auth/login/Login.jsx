import React, { useEffect, useState } from "react";
import { CircleCheck, CircleX, Eye, EyeOff, Loader, User } from "lucide-react";
import { useHandleLoginMutation } from "../../../store/api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});
	const [togglePassword, setTogglePassword] = useState(false);
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const [openMessage, setOpenMessage] = useState(false);
	const [login, { data: loginResponse, isLoading, isError, isSuccess }] =
		useHandleLoginMutation();
	const handleInput = (e) => {
		const { name, value } = e.target;
		setLoginData((data) => ({ ...data, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await login(loginData).unwrap();
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
			setOpenMessage(true);
		}
	};

	useEffect(() => {
		if (openMessage) {
			setTimeout(() => {
				setOpenMessage(false);
				if (isSuccess) {
					navigate("/user");
				}
			}, 3000);
		}
	}, [openMessage, isSuccess, isError]);
	return (
		<>
			<div className='flex h-screen w-full bg-slate-100'>
				<div className='flex flex-col gap-2 w-full md:w-1/2 h-full justify-center items-center'>
					<form
						onSubmit={handleSubmit}
						className='w-11/12 md:w-3/4 lg:w-3/5 2xl:w-1/2 flex flex-col gap-3 justify-center items-center '>
						{openMessage && (
							<div className='bg-white flex justify-center gap-1 items-center h-10 rounded-md w-full shadow text-slate-600'>
								{isError && (
									<CircleX className='text-red-400' />
								)}
								{isSuccess && (
									<CircleCheck className='text-emerald-500' />
								)}
								{message}
							</div>
						)}
						<legend className='text-2xl font-semibold'>
							Login
						</legend>
						<div className='flex items-center border border-slate-300 rounded-md w-full'>
							<input
								type='text'
								className='w-11/12 h-10 ps-2 focus:outline-0'
								placeholder='Username'
								name='username'
								value={loginData.username}
								onChange={handleInput}
							/>
							<div className='w-[10%] flex items-center justify-center'>
								<User className='text-center w-6' />
							</div>
						</div>
						<div className='flex items-center border border-slate-300 rounded-md w-full'>
							<input
								type={
									togglePassword
										? "text"
										: "password"
								}
								className='w-11/12 h-10 ps-2 focus:outline-0'
								placeholder='Password'
								name='password'
								value={loginData.password}
								onChange={handleInput}
							/>
							<div className='w-[10%] flex items-center justify-center'>
								{togglePassword ? (
									<EyeOff
										className='text-center w-6'
										onClick={() =>
											setTogglePassword(
												!togglePassword,
											)
										}
									/>
								) : (
									<Eye
										className='text-center w-6'
										onClick={() =>
											setTogglePassword(
												!togglePassword,
											)
										}
									/>
								)}
							</div>
						</div>
						<div className=''>
							<button
								type='submit'
								name='submit'
								className='bg-indigo-500 shadow-md rounded-md min-h-10 min-w-28 max-w-fit text-white'>
								{isLoading ? (
									<div className='flex gap-2'>
										<Loader className='animate-spin' />{" "}
										Logging
									</div>
								) : (
									"Submit"
								)}
							</button>
						</div>
					</form>
				</div>
				<div className='hidden md:flex w-1/2 h-full'>
					<img
						src='../../../../images/svg/task.svg'
						className='h-full w-full'
					/>
				</div>
			</div>
		</>
	);
};

export default Login;
