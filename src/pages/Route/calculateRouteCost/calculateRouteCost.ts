interface calculateRouteCost {
	cost: number;
	length: number;
	toll: number;
}

const M_TO_KM_CONVERSION_RATE = 1000;

export const calculateRouteCost = ({
	cost,
	length,
	toll,
}: calculateRouteCost) => {
	return (((cost * length) / M_TO_KM_CONVERSION_RATE + toll) * 1.1).toFixed(2);
};
