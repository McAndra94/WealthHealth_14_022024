import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const EmployeeTable = () => {
	const [employees, setEmployees] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		// Load employees from localStorage and update state
		const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
		console.log(storedEmployees);

		const employeesWithDates = storedEmployees.map((emp) => ({
			...emp,
			dateOfBirth: new Date(emp.dateOfBirth),
			startDate: new Date(emp.startDate),
		}));
		setEmployees(employeesWithDates);
	}, []);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};

	const columns = [
		{ name: "First Name", selector: (row) => row.firstName, sortable: true },
		{ name: "Last Name", selector: (row) => row.lastName, sortable: true },
		{
			name: "Start Date",
			selector: (row) => formatDate(row.startDate),
			sortable: true,
		},
		{ name: "Department", selector: (row) => row.department, sortable: true },
		{
			name: "Date of Birth",
			selector: (row) => formatDate(row.dateOfBirth),
			sortable: true,
		},
		{ name: "Street", selector: (row) => row.street, sortable: true },
		{ name: "City", selector: (row) => row.city, sortable: true },
		{ name: "State", selector: (row) => row.state, sortable: true },
		{ name: "Zip Code", selector: (row) => row.zipCode, sortable: true },
	];

	// Filter employees based on search input
	const filteredEmployees = employees.filter((employee) =>
		Object.values(employee).some((value) =>
			value.toString().toLowerCase().includes(search.toLowerCase())
		)
	);

	return (
		<div className="container">
			<h1>Current Employees</h1>
			<div className="search">
				<label>Search:</label>
				<input
					type="text"
					placeholder="search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<DataTable columns={columns} data={filteredEmployees} pagination />
			<Link to="/">Home</Link>
		</div>
	);
};

export default EmployeeTable;
