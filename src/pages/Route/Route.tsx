import { Input, Map, Navbar } from "../../components";
import { RouteI } from "../../App";
import { useState } from "react";

interface Route {
	currentRoute: RouteI;
}

const Route = ({ currentRoute }: Route) => {
	const [cost, setCost] = useState("");

	return (
		<div className="h-screen">
			<Navbar />
			<Input
				id="cost"
				name="cost"
				label="Koszt"
				onChange={(e) => setCost(e.target.value)}
				value={cost}
			/>
			<Map
				positions={currentRoute.positions}
				center={currentRoute.positions[0]}
				origin={currentRoute.origin}
				destination={currentRoute.destination}
			/>
		</div>
	);
};
export default Route;
