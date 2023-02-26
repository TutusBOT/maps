import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		console.log(error);
		toast.error(error.message + "\n" + error.response?.data.error_description);
	} else {
		console.log(error);
		toast.error(JSON.stringify(error));
	}
};
