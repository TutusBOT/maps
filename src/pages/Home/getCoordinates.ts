import axios from "axios";

export const getCoordinates = async ({
	street,
	city,
	country,
}: {
	street: string;
	city: string;
	country: string;
}) => {
	try {
		const { data } = await axios.get(
			`https://geocode.search.hereapi.com/v1/geocode?q=${street}+${city}+${country}&apiKey=${
				import.meta.env.VITE_HERE_API_KEY
			}`
		);
		return data.items;
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
