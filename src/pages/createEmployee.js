import React, { useState } from "react";
import ReactSelect from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { states } from "../data/dataStates";
import { departments } from "../data/dataDepartments";
import Modal from "../components/modal";
import "../components/modal.css";

const CreateEmployee = ({ testMenuIsOpen }) => {
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

	// React Select expected options format
	const stateOptions = states.map((state) => ({
		value: state.abbreviation,
		label: state.name,
	}));
	const departmentOptions = departments.map((dept) => ({
		value: dept,
		label: dept,
	}));

	const saveEmployee = () => {
		const existingEmployees =
			JSON.parse(localStorage.getItem("employees")) || [];

		// Add the new employee to the array
		const newEmployee = {
			...employeeDetails,
			// Store dates as ISO string
			dateOfBirth: employeeDetails.dateOfBirth.toISOString(),
			startDate: employeeDetails.startDate.toISOString(),
		};
		existingEmployees.push(newEmployee);

		// Save the updated array back to local storage
		localStorage.setItem("employees", JSON.stringify(existingEmployees));
		setModalIsOpen(true);

		// Reset form fields
		setFirstName("");
		setLastName("");
		setDateOfBirth(new Date());
		setStartDate(new Date());
		setStreet("");
		setCity("");
		setZipCode("");
	};

	const employeeDetails = {
		firstName,
		lastName,
		dateOfBirth,
		startDate,
		street,
		city,
		state,
		zipCode,
		department,
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
						/>
					</div>
					<div className="formBox">
						<label htmlFor="start-date">Start Date</label>
						<DatePicker
							placeholderText="Select a date"
							selected={startDate}
							onChange={(date) => setStartDate(date)}
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

			<Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
		</div>
	);
};

export default CreateEmployee;
