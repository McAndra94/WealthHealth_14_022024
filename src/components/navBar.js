import logo from "../logo.jpg";
import { Link } from "react-router-dom";
import "./navBar.css";

function NavBar() {
	return (
		<header>
			<div className="navBar">
				<Link to="/" className="logo">
					<img src={logo} alt="Logo de WealthHealth" />
				</Link>
				<h1>HRnet</h1>
				<Link to="/create" className="menu">
					Create Employee
				</Link>
				<Link to="/list" className="menu">
					View Current Employees
				</Link>
			</div>
		</header>
	);
}

export default NavBar;
