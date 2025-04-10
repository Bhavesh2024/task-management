import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { taskApi } from "./api/taskApi";
import taskReducer from "./features/taskSlice";
export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[taskApi.reducerPath]: taskApi.reducer,
		task: taskReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(taskApi.middleware),
});

setupListeners(store.dispatch);
