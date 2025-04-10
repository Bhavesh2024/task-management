import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const taskApi = createApi({
	reducerPath: "taskApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api/user/task",
		credentials: "include",
	}),
	endpoints: (build) => ({
		createTask: build.mutation({
			query: (credential) => ({
				url: "/",
				body: credential,
				method: "POST",
			}),
		}),
		getTask: build.query({
			query: (id) => `${id}`,
		}),
		getAllTask: build.query({
			query: () => `/all`,
		}),
		editTask: build.mutation({
			query: (credential) => ({
				url: "/",
				method: "PUT",
				body: credential,
			}),
		}),
		removeTask: build.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useCreateTaskMutation,
	useEditTaskMutation,
	useRemoveTaskMutation,
	useGetAllTaskQuery,
	useGetTaskQuery,
} = taskApi;
