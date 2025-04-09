import React, { createContext, useState } from "react";
import { useHandleLogoutMutation } from "../store/api/authApi";

export const AuthContext = createContext(0);

const AuthContextProvider = ({ children }) => {
	const [openResponseModal, setOpenResponseModal] = useState(false);
	const [logout, { isError, isSuccess }] = useHandleLogoutMutation();
	const [responseMessage, setResponseMessage] = useState("");
	return (
		<>
			<AuthContext.Provider
				value={{
					openResponseModal,
					setOpenResponseModal,
					logout,
					isError,
					isSuccess,
					responseMessage,
					setResponseMessage,
				}}>
				{children}
			</AuthContext.Provider>
		</>
	);
};

export default AuthContextProvider;
