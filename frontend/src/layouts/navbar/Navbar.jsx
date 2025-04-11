import { Menu } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = ({ sidebarHandler, sidebar }) => {
	const [openDropdown, setOpenDropdown] = useState(false);
	const user = useSelector((state) => state.user.value);
	return (
		<div className='absolute  w-full shadow h-[70px] bg-slate-100  shadow-gray-300 border border-slate-100 flex items-center justify-between px-5'>
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
					<div className='flex min-w-40 bg-white rounded-md  absolute top-full mt-1 -end-4 shadow-lg '>
						<ul className='flex flex-col py-2 justify-center w-full'>
							<li className='text-center w-full hover:bg-sky-50 py-1'>
								<Link
									to={`/user/edit-profile`}
									className=''>
									Edit Profile
								</Link>
							</li>
							<li className='text-center w-full hover:bg-sky-50 py-1'>
								Logout
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
