// import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

export interface Route {
	positions: Array<[number, number]>;
	length: number;
	origin: string;
	destination: string;
}

function App() {
	const [route, setRoute] = useState<Route>({
		positions: [],
		length: 0,
		origin: "",
		destination: "",
	});

	return (
		<Routes>
			<Route path="/maps/" element={<Home setCurrentRoute={setRoute} />} />
		</Routes>
	);
}

export default App;
