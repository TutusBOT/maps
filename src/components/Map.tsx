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
import L from "leaflet";

const markerIcon = new L.Icon({
	iconUrl: "./marker-icon.png",
	iconAnchor: new L.Point(12, 40),
});

const Map = () => {
	const appContext = useContext(AppContext);

	if (!appContext) return null;
	return (
		<MapContainer
			center={appContext.currentRoute.positions[0]}
			zoom={13}
			scrollWheelZoom={false}
			className="w-full h-full"
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
			<Marker position={appContext.currentRoute.positions[0]} icon={markerIcon}>
				<Tooltip>{appContext.currentRoute.origin}</Tooltip>
			</Marker>
			<Marker
				position={
					appContext.currentRoute.positions[
						appContext.currentRoute.positions.length - 1
					]
				}
				icon={markerIcon}
			>
				<Tooltip>{appContext.currentRoute.destination}</Tooltip>
			</Marker>
		</MapContainer>
	);
};
export default Map;
