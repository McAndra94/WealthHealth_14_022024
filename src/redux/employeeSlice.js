import { createSlice } from "@reduxjs/toolkit";

// Load the employees list from localStorage or set it to an empty array if empty
const initialState = {
	employees: JSON.parse(localStorage.getItem("employees")) || [],
};

export const employeeSlice = createSlice({
	name: "employee",
	initialState,
	reducers: {
		addEmployee: (state, action) => {
			// Check if firstName & lastName already exists
			const duplicate = state.employees.some(
				(emp) =>
					emp.firstName === action.payload.firstName &&
					emp.lastName === action.payload.lastName
			);
			// If employee doesn't already exists, add to list
			if (!duplicate) {
				state.employees.push(action.payload);
				localStorage.setItem("employees", JSON.stringify(state.employees));
			}
		},
		deleteEmployee: (state, action) => {
			// For deleting an existing employee from the list
			const { firstName, lastName } = action.payload;
			const index = state.employees.findIndex(
				(emp) => emp.firstName === firstName && emp.lastName === lastName
			);
			if (index !== -1) {
				state.employees.splice(index, 1);
				localStorage.setItem("employees", JSON.stringify(state.employees));
			}
		},
	},
});

export const { addEmployee, deleteEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
