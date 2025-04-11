import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { taskApi } from "./api/taskApi";
import taskReducer from "./features/taskSlice";
import userReducer from "./features/userSlice";
import { userApi } from "./api/userApi";
export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[taskApi.reducerPath]: taskApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		task: taskReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(taskApi.middleware)
			.concat(userApi.middleware),
});

setupListeners(store.dispatch);
