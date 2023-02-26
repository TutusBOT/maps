import { calculateRouteCost } from "./calculateRouteCost";
import { expect, describe, it } from "vitest";

describe("calculate Route Cost", () => {
	it("returns 10 when given cost: 10, length: 500, toll: 5", () => {
		expect(calculateRouteCost({ cost: 10, length: 500, toll: 5 })).toBe(11.0);
	});

	it("returns toll if cost is 0", () => {
		const toll = 5.0;
		expect(calculateRouteCost({ cost: 0, length: 500, toll: toll })).toBe(
			toll * 1.1
		);
	});

	it("returns 0 if cost and toll is 0", () => {
		expect(calculateRouteCost({ cost: 0, length: 500, toll: 0 })).toBe(0.0);
	});
});
