import { Dispatch, SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, RouteI } from "../App";
import Button from "./Button";

interface RoutePreview {
	route: RouteI;
	// setCurrentRoute: Dispatch<SetStateAction<RouteI>>;
}

const RoutePreview = ({ route }: RoutePreview) => {
	const navigate = useNavigate();
	const appContext = useContext(AppContext);

	const handleClick = () => {
		if (!appContext) return;
		appContext.setCurrentRoute(route);
		navigate("/maps/route");
	};

	return (
		<tr className="grid grid-cols-4 justify-start items-center border-b-2 border-gray-300 p-4 bg-white text-base sm:text-xl">
			<td>{route.origin}</td>
			<td>{route.destination}</td>
			<td>{route.length / 1000} km</td>
			<td>
				<Button
					variant="outlined"
					className="text-base sm:text-lg py-1 px-2 sm:py-2 sm:px-4"
					onClick={handleClick}
				>
					WYŚWIETL TRASĘ
				</Button>
			</td>
		</tr>
	);
};
export default RoutePreview;
