import {
	CalendarCheck,
	FileClock,
	LayoutDashboard,
	LogOut,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHandleLogoutMutation } from "../../store/api/authApi";
import Modal from "../../components/modal/Modal";
import ResponseModal from "../../components/modal/message/ResponseModal";
import { AuthContext } from "../../context/AuthContextProvider";

const Sidebar = () => {
	const { logout, setResponseMessage, setOpenResponseModal } =
		useContext(AuthContext);
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();
	const userActivities = [
		{
			link: "/user",
			name: "Dashboard",
			icon: <LayoutDashboard />,
		},
		{
			link: "/user/history",
			name: "History",
			icon: <FileClock />,
		},
		{
			link: "/user/my-task",
			name: "Tasks",
			icon: <CalendarCheck />,
		},
	];

	const handleLogout = async (e) => {
		try {
			const response = await logout().unwrap();
			if (response) {
				setTimeout(() => {
					navigate("/login");
					setOpenResponseModal(false);
				}, 3000);
				setResponseMessage(response.message);
			}
		} catch (err) {
			if (err.data) {
				setResponseMessage(err.data.message);
			} else {
				setResponseMessage(err.data.message);
			}
			setTimeout(() => {
				setOpenResponseModal(false);
			}, 3000);
		} finally {
			setOpenResponseModal(true);
		}
	};
	return (
		<>
			<div className='h-screen fixed top-0 left-0 w-full md:w-1/5 bg-black/20 flex z-10    '>
				<div className='h-full max-h-screen bg-slate-100 w-2/3 md:w-full relative overflow-auto'>
					<div className='flex flex-col items-center gap-1 justify-between md:justify-start'>
						<img
							src='../../../images/default/user.png'
							className='w-40 h-40 rounded-full'
							alt='User Image'
							title='User Image'
						/>
						<Link
							to={"/edit-profile"}
							className='text-sky-400'>
							Edit Profile
						</Link>
					</div>
					<div className='mt-10'>
						<ul className='flex flex-col gap-2'>
							{userActivities.map(
								({ link, name, icon }) => (
									<Link
										to={link}
										className='flex justify-center hover:bg-slate-500 hover:text-white h-10  items-center'>
										<li className='flex w-1/2 '>
											<span className='flex w-full gap-1'>
												{icon}
												{name}
											</span>
										</li>
									</Link>
								),
							)}
							<li
								className='flex justify-center items-center md:absolute h-12 bottom-0 w-full bg-slate-900 hover:bg-slate-500 text-white'
								onClick={handleLogout}>
								<div className='flex w-1/2'>
									<span className='flex w-full gap-1'>
										<LogOut />
										Logout
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
