import {
	CalendarCheck,
	FileClock,
	LayoutDashboard,
	LogOut,
	SquareUser,
	X,
} from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHandleLogoutMutation } from "../../store/api/authApi";
import Modal from "../../components/modal/Modal";
import ResponseModal from "../../components/modal/message/ResponseModal";
import { AuthContext } from "../../context/AuthContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { useEditUserAvatarMutation } from "../../store/api/userApi";
import { updateUser } from "../../store/features/userSlice";

const Sidebar = ({ handler }) => {
	const { logout, setResponseMessage, setOpenResponseModal } =
		useContext(AuthContext);
	const fileRef = useRef(null);
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const [previewImage, setPreviewImage] = useState(null);
	const navigate = useNavigate();
	const [editAvatar, { data: updatedUser, isError, isSuccess }] =
		useEditUserAvatarMutation();
	const [message, setMessage] = useState("");
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
		{
			link: "/user/account",
			name: "Account",
			icon: <SquareUser />,
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

	const editUserProfileImage = async (e) => {
		try {
			const { files } = e.target;
			const formData = new FormData();

			if (files) {
				const [image] = files;
				if (image) {
					setPreviewImage(image);
					formData.append("image", image);
					const response = await editAvatar(
						formData,
					).unwrap();
					if (response) {
						console.log(response);
						// dispatch(updatedUser(response.user));
					}
				}
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
		if (user) {
			console.log("user", user);
		}
	}, [user]);

	useEffect(() => {
		if (isSuccess) {
			dispatch(updateUser(updatedUser.user));
		}
	}, [isSuccess]);

	return (
		<>
			<div className='h-screen fixed top-0 left-0 w-full md:w-1/5 bg-black/20 flex z-10'>
				<div className='h-full max-h-screen bg-slate-100 w-2/3 md:w-full relative overflow-auto'>
					<X
						className='md:hidden absolute top-2 end-2 size-5 text-slate-400'
						onClick={() => handler(false)}></X>
					<div className='flex flex-col mt-10 items-center gap-1 justify-between md:justify-start'>
						<img
							src={
								previewImage
									? URL.createObjectURL(
											previewImage,
									  )
									: !user.image
									? "../../../images/default/user.png"
									: user.image
							}
							className='w-32 h-32 rounded-full'
							alt='User Image'
							title='User Image'
						/>
						<input
							type='file'
							onChange={editUserProfileImage}
							name='file'
							ref={fileRef}
							hidden
						/>
						<button
							to={"/user/edit-profile"}
							className='text-sky-400'
							onClick={() =>
								fileRef.current.click()
							}>
							Edit Profile
						</button>
					</div>
					<div className='mt-10'>
						<ul className='flex flex-col gap-2'>
							{userActivities.map(
								(
									{ link, name, icon },
									index,
								) => (
									<Link
										to={link}
										key={`TM${index}`}
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
								className='flex justify-center items-center absolute h-12 bottom-0 w-full bg-slate-900 hover:bg-slate-500 text-white'
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
