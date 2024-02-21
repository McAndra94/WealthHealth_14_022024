import React, { useState } from "react";
// Import useDispatch, then the addEmployee action
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { states } from "../data/dataStates";
import { departments } from "../data/dataDepartments";
import Modal from "../components/modal";
import "../components/modal.css";
import { addEmployee } from "../redux/employeeSlice";

const CreateEmployee = ({ testMenuIsOpen }) => {
	const dispatch = useDispatch();
	const employees = useSelector((state) => state.employee.employees);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [startDate, setStartDate] = useState(new Date());
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [department, setDepartment] = useState("");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [warningMessage, setWarningMessage] = useState(""); // For displaying warning messages

	// ReactSelect expected options format
	const stateOptions = states.map((state) => ({
		value: state.abbreviation,
		label: state.name,
	}));
	const departmentOptions = departments.map((dept) => ({
		value: dept,
		label: dept,
	}));

	const saveEmployee = async () => {
		// Check if the fields are filled
		if (
			!firstName ||
			!lastName ||
			!street ||
			!city ||
			!zipCode ||
			!state ||
			!department
		) {
			// Stop the function if the fields aren't filled
			alert("Fill in all the fields.");
			return;
		}

		const duplicate = employees.some(
			(emp) => emp.firstName === firstName && emp.lastName === lastName
		);

		if (duplicate) {
			setWarningMessage("An employee with the same name already exists.");
		} else {
			// Clear the warning message
			setWarningMessage("");

			const newEmployee = {
				firstName,
				lastName,
				dateOfBirth: dateOfBirth.toISOString(),
				startDate: startDate.toISOString(),
				street,
				city,
				state,
				zipCode,
				department,
			};

			// Dispatch the addEmployee action
			dispatch(addEmployee(newEmployee));

			// Show the modal only on success then reset form
			setModalIsOpen(true);
			resetFormFields();
		}
	};

	const resetFormFields = () => {
		setFirstName("");
		setLastName("");
		setDateOfBirth(new Date());
		setStartDate(new Date());
		setStreet("");
		setCity("");
		setZipCode("");
		setState("");
		setDepartment("");
	};

	return (
		<div className="container">
			<h1>Create Employee</h1>
			<form action="#" id="create-employee">
				<div className="formRow">
					<div className="formBox">
						<label htmlFor="first-name">First Name</label>
						<input
							type="text"
							id="first-name"
							placeholder="First Name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>

					<div className="formBox">
						<label htmlFor="last-name">Last Name</label>
						<input
							type="text"
							id="last-name"
							placeholder="Last Name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
				</div>
				<div className="formRow">
					<div className="formBox">
						<label htmlFor="date-of-birth">Date of Birth</label>
						<DatePicker
							placeholderText="Select a date"
							selected={dateOfBirth}
							onChange={(date) => setDateOfBirth(date)}
							showYearDropdown
							scrollableYearDropdown
							yearDropdownItemNumber={70}
						/>
					</div>
					<div className="formBox">
						<label htmlFor="start-date">Start Date</label>
						<DatePicker
							placeholderText="Select a date"
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							showYearDropdown
							scrollableYearDropdown
							yearDropdownItemNumber={20}
						/>
					</div>
				</div>
				<fieldset className="address">
					<legend>Address</legend>
					<div className="formRow">
						<div className="formBox">
							<label htmlFor="street">Street</label>
							<input
								type="text"
								id="street"
								value={street}
								onChange={(e) => setStreet(e.target.value)}
							/>
						</div>

						<div className="formRow">
							<div className="formBox">
								<label htmlFor="city">City</label>
								<input
									type="text"
									id="city"
									value={city}
									onChange={(e) => setCity(e.target.value)}
								/>
							</div>
						</div>
					</div>

					<div className="formRow">
						<div className="formBox">
							<label htmlFor="state">State</label>
							<ReactSelect
								id="state"
								options={stateOptions}
								onChange={(selectedOption) => setState(selectedOption.value)}
								placeholder="Select a state"
							/>
						</div>

						<div className="formBox">
							<label htmlFor="zip-code">Zip Code</label>
							<input
								type="number"
								id="zip-code"
								value={zipCode}
								onChange={(e) => setZipCode(e.target.value)}
								placeholder="Enter a valid zip code"
							/>
						</div>
					</div>
				</fieldset>

				<label htmlFor="department">Department</label>
				<ReactSelect
					id="department"
					options={departmentOptions}
					onChange={(selectedOption) => setDepartment(selectedOption.value)}
					placeholder="Select a department"
					menuIsOpen={testMenuIsOpen}
				/>
			</form>

			<button type="button" onClick={saveEmployee}>
				Save
			</button>

			{warningMessage && <div className="warning">{warningMessage}</div>}
			<Modal
				isOpen={modalIsOpen}
				onClose={() => setModalIsOpen(false)}
				title="Employee Created!"
				style={{
					modal: {
						backgroundColor: "rgba(0, 0, 0, 0.5)",
					},
					title: {
						padding: "0 100px",
					},
					body: {
						backgroundColor: "#c8eaa2",
						color: "#000000",
					},
					button: {
						backgroundColor: "#000000",
						color: "white",
						fontSize: "20px",
					},
				}}
			/>
		</div>
	);
};

export default CreateEmployee;
