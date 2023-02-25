// import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import RoutePage from "./pages/Route/Route";

export interface RouteI {
	positions: Array<[number, number]>;
	length: number;
	origin: string;
	destination: string;
	toll: number;
}

function App() {
	const [route, setRoute] = useState<RouteI>({
		positions: [],
		length: 0,
		origin: "",
		destination: "",
		toll: 0,
	});

	return (
		<Routes>
			<Route path="/maps/" element={<Home setCurrentRoute={setRoute} />} />
			<Route path="/maps/route" element={<RoutePage currentRoute={route} />} />
		</Routes>
	);
}

export default App;
