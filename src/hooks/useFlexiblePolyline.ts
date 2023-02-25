import { decode } from "../utils/flexible-polyline";

export function useFlexiblePolyline(polyline: string): Array<[number, number]> {
	return decode(polyline).polyline;
}
