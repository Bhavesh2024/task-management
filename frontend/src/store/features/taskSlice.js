import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
	name: "task",
	initialState: {
		value: [],
	},
	reducers: {
		addAllTask: (state, action) => {
			state.value = action.payload;
		},
		addTask: (state, action) => {
			state.value.push(action.payload);
		},
		updateTask: (state, action) => {
			const updatedTask = action.payload;
			const index = state.value.findIndex(
				(task) => task._id === updatedTask._id,
			);
			if (index !== -1) {
				state.value[index] = updatedTask;
			}
		},
		deleteTask: (state, action) => {
			const taskId = action.payload;
			state.value = state.value.filter(
				(task) => task._id !== taskId,
			);
		},
		clearAllTasks: (state) => {
			state.value = [];
		},
	},
});

export const { addTask, addAllTask, updateTask, deleteTask, clearAllTasks } =
	taskSlice.actions;

export default taskSlice.reducer;
