import NavBar from "./components/navBar";
import AppRoutes from "./appRoutes";
import "./App.css";

function App() {
	return (
		<div className="mainContainer">
			<NavBar />
			<div className="App">
				<AppRoutes />
			</div>
		</div>
	);
}

export default App;
