import axios from "axios";
import { handleError } from "../../utils/handleError";

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
		handleError(error);
	}
};
