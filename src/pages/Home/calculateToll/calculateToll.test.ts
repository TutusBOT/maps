import { calculateToll } from "./calculateTolll";
import { expect, it, describe } from "vitest";

describe("calculateTolls", () => {
	it("returns 0 if tolls is an empty array", () => {
		expect(calculateToll([])).toBe(0);
	});

	it("returns 10 if given ", () => {
		expect(
			calculateToll([{ fares: [{ convertedPrice: { value: 10 } }] }])
		).toBe(10);
	});
});
