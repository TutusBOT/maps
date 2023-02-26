import { useContext } from "react";
import { AppContext, RouteI } from "../App";
import RoutePreview from "./RoutePreview";

const RouteHistory = () => {
	const appContext = useContext(AppContext);

	return (
		<table className="flex flex-col p-2 sm:p-8" id="history">
			<thead>
				<tr className="grid grid-cols-4 justify-items-start border-b-2 border-gray-300 sm:p-4 text-base sm:text-xl">
					<th>Początek trasy</th>
					<th>Miejsce docelowe</th>
					<th>Długość trasy</th>
					<th>Wyświetl</th>
				</tr>
			</thead>
			<tbody>
				{appContext &&
					appContext.routeHistory.map((route, i) => (
						<RoutePreview route={route} key={i} />
					))}
			</tbody>
		</table>
	);
};
export default RouteHistory;
