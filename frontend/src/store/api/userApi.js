import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/user",
		credentials: "include",
	}),
	endpoints: (build) => ({
		editUser: build.mutation({
			query: (credential) => ({
				url: "/",
				body: credential,
				method: "PUT",
			}),
		}),
		editUserAvatar: build.mutation({
			query: (credentials) => ({
				url: "/upload/avatar",
				method: "PUT",
				body: credentials,
			}),
		}),
	}),
});

export const { useEditUserMutation, useEditUserAvatarMutation } = userApi;
