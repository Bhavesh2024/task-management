import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCheckLoginQuery } from "../../store/api/authApi";

const Home = () => {
	const { isSuccess, isError } = useCheckLoginQuery();
	const navigate = useNavigate();
	return (
		<>
			<div className='bg-slate-100 flex flex-col gap-2 justify-center items-center h-screen w-full'>
				<div className='fixed z-0 top-0 w-full min-h-screen'>
					<img
						src='../../../images/background/home.jpg'
						alt='Home Background'
						className='w-full h-full'
						title='Home'
					/>
				</div>
				<div className='flex flex-col gap-2 z-20 justify-center items-center'>
					<h1 className='text-xl text-center md:text-4xl text-slate-900 font-semibold font-sans'>
						Welcome to Task Management App
					</h1>

					{isSuccess && (
						<button
							className='bg-indigo-500 shadow-md rounded-md min-h-12 min-w-28 max-w-fit text-white px-4'
							onClick={() => navigate("/user")}>
							Go to Dashboard
						</button>
					)}
					{isError && (
						<button
							className='bg-indigo-500 shadow-md rounded-md min-h-12 min-w-28 max-w-fit text-white'
							onClick={() => navigate("/login")}>
							Login
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
