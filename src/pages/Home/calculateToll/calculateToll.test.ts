import { calculateToll } from "./calculateTolll";
import { expect, it, describe } from "vitest";

describe("calculateTolls", () => {
	it("returns 0 if tolls is an empty array", () => {
		expect(calculateToll([])).toBe(0);
	});

	it("returns 10 if given toll with one fare of price 10", () => {
		expect(
			calculateToll([{ fares: [{ convertedPrice: { value: 10 } }] }])
		).toBe(10);
	});

	it("returns sum of all fares of all tolls", () => {
		expect(
			calculateToll([
				{
					fares: [
						{ convertedPrice: { value: 10 } },
						{ convertedPrice: { value: 15.4 } },
					],
				},
				{
					fares: [
						{ convertedPrice: { value: 20 } },
						{ convertedPrice: { value: 3 } },
					],
				},
			])
		).toBe(48.4);
	});
});
