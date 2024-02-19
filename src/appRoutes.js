import { Routes, Route } from "react-router-dom";
import Create from "./pages/createEmployee";
import List from "./pages/employeeList";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Create />} />
			<Route path="/create" element={<Create />} />
			<Route path="/list" element={<List />} />
			<Route
				path="*"
				element={
					<div style={{ textAlign: "center", paddingTop: "20%" }}>
						Error 404.
						<br />
						<br />
						Oops! Page not found.
					</div>
				}
			/>
		</Routes>
	);
};

export default AppRoutes;
