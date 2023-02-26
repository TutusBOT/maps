import axios from "axios";
import { handleError } from "../../utils/handleError";

export const getRoute = async ({
	origin,
	destination,
}: {
	origin: string;
	destination: string;
}) => {
	try {
		const { data } = await axios.get(
			`https://router.hereapi.com/v8/routes?transportMode=car&origin=${origin}&destination=${destination}&currency=PLN&return=polyline,summary,tolls&apikey=${
				import.meta.env.VITE_HERE_API_KEY
			}`
		);
		return data.routes[0].sections[0];
	} catch (error) {
		handleError(error);
	}
};
