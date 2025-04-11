import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		value: {},
	},
	reducers: {
		updateUser: (state, action) => {
			const updatedUser = action.payload;
			console.log("updated user", updatedUser);
			state.value = updatedUser;
		},
	},
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
