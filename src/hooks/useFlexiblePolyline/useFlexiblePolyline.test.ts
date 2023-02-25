import { useFlexiblePolyline } from "./useFlexiblePolyline";
import { expectTypeOf, it, describe } from "vitest";

describe("useFlexiblePolyline", () => {
	it("should return array of positions when given encoded string", () => {
		const encoded =
			"BGkxy-_C8zu6jBwRkrB0FkN8L4csJkX4DsJwC0FkDgF4DsEToG8B0K0FjDkDnBkDnB4DToGUgFU4DA4DTkDTkDnB8G3D0ZvR4DvCsEjDwCjIoQnL8QzKsJ_E8GjDgFvCoG7BoGT8GAoakDgoB4Dw0BsE08BsEwMoB8Q8B8Q8B4N8Bw-B8Gof4D09D8Q8kBgF8LoBgjBgFkS8B8QoBoQU8LUoVUkhBAsOAgPUwbAkcT4SAgFAwRAU3DUnGAnGnB7G7B7GvC7GvCzFjDnG3DrJ3D3IrErJrE3IrEjI_E3IrEvHzFrJrE3IvCnG7B7GTzFA_EoBnGoBrE8B3DwCjD4D7B4DAkDUwCoB8G0FwMofoQkrB8LkhBoGgUgC4G";
		expectTypeOf(useFlexiblePolyline(encoded)).toMatchTypeOf<
			Array<[number, number]>
		>;
	});
});
