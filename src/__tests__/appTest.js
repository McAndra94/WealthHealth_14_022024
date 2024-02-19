/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateEmployee from "../pages/createEmployee";
import EmployeeTable from "../pages/employeeList";
import AppRoutes from "../appRoutes";

describe("Given I am on the HRnet website, on the create employee page", () => {
	beforeEach(() => {
		// Clear before each test
		localStorage.clear();
	});

	describe("When I click on 'Select a department'", () => {
		test("Then, a dropdown menu displays", () => {
			render(<CreateEmployee testMenuIsOpen={true} />);
			// Check Sales is displayed
			expect(screen.getByText(/Sales/i)).toBeInTheDocument();
		});
	});

	describe("When I click on 'save' after filling the create employee form", () => {
		test("Then, a modal should open stating 'Employee Created'", () => {
			render(<CreateEmployee />);
			fireEvent.change(screen.getByLabelText(/First Name/i), {
				target: { value: "James" },
			});
			fireEvent.change(screen.getByLabelText(/Last Name/i), {
				target: { value: "Smith" },
			});
			fireEvent.click(screen.getByRole("button", { name: /Save/i }));

			// Check if the modal is displayed with "Employee Created"
			expect(screen.getByText(/Employee Created/i)).toBeInTheDocument();
		});

		test("Then, the new employee is saved in local storage", () => {
			render(<CreateEmployee />);
			fireEvent.change(screen.getByLabelText(/First Name/i), {
				target: { value: "James" },
			});
			fireEvent.change(screen.getByLabelText(/Last Name/i), {
				target: { value: "Smith" },
			});

			fireEvent.click(screen.getByRole("button", { name: /Save/i }));

			// Check if local storage was updated
			const employees = JSON.parse(localStorage.getItem("employees"));
			const newEmployee = employees.find(
				(emp) => emp.firstName === "James" && emp.lastName === "Smith"
			);
			expect(newEmployee).toBeDefined();
			// Check if the new names were saved in local storage
			expect(newEmployee.firstName).toBe("James");
			expect(newEmployee.lastName).toBe("Smith");
		});

		test("Then, the new employee is added to the employee list", async () => {
			const testEmployee = [{ firstName: "James", lastName: "Smith" }];
			localStorage.setItem("employees", JSON.stringify(testEmployee));

			render(
				<MemoryRouter>
					<EmployeeTable />
				</MemoryRouter>
			);

			// Check if the test employee is displayed
			const employeeName = await screen.findByText("Smith");
			expect(employeeName).toBeInTheDocument();
		});
	});

	describe("When I click on 'View Current Employees'", () => {
		test("Then, I'm directed to the employees list page", () => {
			render(
				<MemoryRouter initialEntries={["/list"]}>
					<EmployeeTable />
				</MemoryRouter>
			);
			expect(screen.getByText(/Current Employees/i)).toBeInTheDocument();
		});
	});

	describe("When a page can't be found", () => {
		test("Then, the 404 error message should display", () => {
			render(
				<MemoryRouter initialEntries={["/wrong_url"]}>
					<AppRoutes />
				</MemoryRouter>
			);
			expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
		});
	});
});
