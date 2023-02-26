// import "./App.css";
import { createContext, Dispatch, SetStateAction, useState } from "react";
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

interface AppContext {
	currentRoute: RouteI;
	setCurrentRoute: Dispatch<SetStateAction<RouteI>>;
	routeHistory: RouteI[];
	setRouteHistory: Dispatch<SetStateAction<RouteI[]>>;
}

export const AppContext = createContext<AppContext | null>(null);

function App() {
	const [currentRoute, setCurrentRoute] = useState<RouteI>({
		positions: [],
		length: 0,
		origin: "",
		destination: "",
		toll: 0,
	});
	const [routeHistory, setRouteHistory] = useState<RouteI[]>([]);

	return (
		<AppContext.Provider
			value={{ currentRoute, setCurrentRoute, routeHistory, setRouteHistory }}
		>
			<Routes>
				<Route path="/maps/" element={<Home />} />
				<Route path="/maps/route" element={<RoutePage />} />
			</Routes>
		</AppContext.Provider>
	);
}

export default App;
