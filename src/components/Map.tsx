import {
	MapContainer,
	TileLayer,
	Polyline,
	Marker,
	Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { AppContext } from "../App";

const Map = () => {
	const appContext = useContext(AppContext);

	if (!appContext) return null;
	return (
		<MapContainer
			center={appContext.currentRoute.positions[0]}
			zoom={13}
			scrollWheelZoom={false}
			className="mt-16 w-full h-[500px]"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Polyline
				positions={appContext.currentRoute.positions}
				color="#0000FF"
				weight={3}
			/>
			<Marker position={appContext.currentRoute.positions[0]}>
				<Tooltip>{appContext.currentRoute.origin}</Tooltip>
			</Marker>
			<Marker
				position={
					appContext.currentRoute.positions[
						appContext.currentRoute.positions.length - 1
					]
				}
			>
				<Tooltip>{appContext.currentRoute.destination}</Tooltip>
			</Marker>
		</MapContainer>
	);
};
export default Map;
