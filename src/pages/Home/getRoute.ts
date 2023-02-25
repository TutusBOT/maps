import axios from "axios";

export const getRoute = async ({
	origin,
	destination,
}: {
	origin: string;
	destination: string;
}) => {
	try {
		const { data } = await axios.get(
			`https://router.hereapi.com/v8/routes?transportMode=car&origin=${origin}&destination=${destination}&return=polyline,summary&apikey=${
				import.meta.env.VITE_HERE_API_KEY
			}`
		);
		return data.routes[0].sections[0];
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Access to config, request, and response
			console.log(error);
			alert(error.message + "\n" + error.response?.data.error_description);
		} else if (error instanceof Error) {
			// Just a stock error
			alert(error);
		} else {
			// unknown
			alert(error);
		}
	}
};
