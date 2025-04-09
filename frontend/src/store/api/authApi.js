import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/auth",
		credentials: "include",
	}),
	endpoints: (build) => ({
		handleLogin: build.mutation({
			query: (credential) => ({
				url: "/login",
				body: credential,
				method: "POST",
			}),
		}),
		checkLogin: build.query({
			query: () => "/login",
		}),
		handleLogout: build.mutation({
			query: () => ({
				url: "/logout",
				method: "POST",
			}),
		}),
	}),
});

export const {
	useHandleLoginMutation,
	useCheckLoginQuery,
	useHandleLogoutMutation,
} = authApi;
