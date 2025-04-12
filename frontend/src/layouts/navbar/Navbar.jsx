import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useHandleLogoutMutation } from "../../store/api/authApi";
import Modal from "../../components/modal/Modal";
import ResponseModal from "../../components/modal/message/ResponseModal";
const Navbar = ({ sidebarHandler, sidebar }) => {
	const [openDropdown, setOpenDropdown] = useState(false);
	const user = useSelector((state) => state.user.value);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [logoutUser, { isSuccess, isError, isLoading }] =
		useHandleLogoutMutation();
	const handleLogout = async () => {
		try {
			const response = await logoutUser().unwrap();
			if (response) {
				navigate("/login");
			}
		} catch (err) {
			if (err.data) {
				setMessage(err.data.message);
			} else {
				setMessage(err.message);
			}
		}
	};
	return (
		<div className='absolute  w-full shadow h-[70px] z-10 bg-slate-100  shadow-gray-300 border border-slate-100 flex items-center justify-between px-5'>
			<Menu onClick={() => sidebarHandler(!sidebar)} />
			<div className='relative'>
				<img
					src={
						user.image
							? user.image
							: "../../../images/default/user.png"
					}
					alt='profile'
					className='h-10 w-10 rounded-full'
					onClick={() => setOpenDropdown(!openDropdown)}
				/>
				{openDropdown && (
					<div className='flex min-w-40 bg-white rounded-md  absolute top-full mt-1 -end-4 shadow-lg z-30'>
						<ul className='flex flex-col py-2 justify-center w-full'>
							<li className='text-center w-full hover:bg-sky-50 py-1'>
								<Link
									to={`/user/account`}
									className=''>
									My Account
								</Link>
							</li>
							<li
								className='text-center w-full hover:bg-sky-50 py-1'
								onClick={handleLogout}>
								Logout
							</li>
						</ul>
					</div>
				)}
			</div>
			<Modal
				open={open}
				setOpen={setOpen}>
				<ResponseModal
					setOpen={setOpen}
					message={message}
					isError={isError}
					isSuccess={isSuccess}
				/>
			</Modal>
		</div>
	);
};

export default Navbar;
