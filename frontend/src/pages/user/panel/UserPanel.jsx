import React, { useContext, useState } from "react";
import Navbar from "../../../layouts/navbar/Navbar";
import Sidebar from "../../../layouts/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useCheckLoginQuery } from "../../../store/api/authApi";
import NotFound from "../../not-found/NotFound";
import PageLoading from "../../../components/loader/PageLoading";
import Modal from "../../../components/modal/Modal";
import ResponseModal from "../../../components/modal/message/ResponseModal";
import AuthContextProvider, {
	AuthContext,
} from "../../../context/AuthContextProvider";
const UserPanel = () => {
	const [openSidebar, setOpenSidebar] = useState(
		window.matchMedia("(min-width:576px)").matches,
	);
	const { isSuccess, isError, isLoading } = useCheckLoginQuery();
	const {
		openResponseModal,
		setOpenResponseModal,
		isError: logoutError,
		isSuccess: logoutSuccess,
		responseMessage,
	} = useContext(AuthContext);
	return (
		<>
			{isLoading && <PageLoading />}
			{isError && <NotFound />}
			{isSuccess && (
				<div className='flex'>
					{openSidebar && <Sidebar />}
					<div
						className={`flex flex-col h-screen fixed end-0 ${
							openSidebar
								? "w-full md:w-4/5"
								: "w-full"
						}`}>
						<div className='shadow-lg shadow-amber-100 relative'>
							<Navbar
								sidebar={openSidebar}
								sidebarHandler={setOpenSidebar}
							/>
						</div>
						<div className='min-h-screen flex justify-center items-center bg-white'>
							<Outlet />
						</div>
					</div>
				</div>
			)}

			<Modal
				open={openResponseModal}
				setOpen={setOpenResponseModal}>
				<ResponseModal
					setOpen={setOpenResponseModal}
					isError={logoutError}
					isSuccess={logoutSuccess}
					message={responseMessage}
				/>
			</Modal>
		</>
	);
};

export default UserPanel;
