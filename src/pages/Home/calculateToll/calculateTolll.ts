export const calculateToll = (
	tolls: Array<{ fares: Array<{ convertedPrice: { value: number } }> }>
) => {
	let accumulatedToll = 0;
	tolls.forEach((toll) => {
		toll.fares.forEach((fare) => {
			accumulatedToll += fare.convertedPrice.value;
		});
	});
	return accumulatedToll;
};
