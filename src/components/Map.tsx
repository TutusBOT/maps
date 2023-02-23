import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Map {
	center?: [number, number];
}

const Map = ({ center }: Map) => {
	return (
		<MapContainer
			center={center || [51.505, -0.09]}
			zoom={13}
			scrollWheelZoom={false}
			className="mt-16 w-full h-[500px]"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Polyline
				positions={[
					[52.5263761, 13.3686186],
					[51, 13.5],
					[51, 13.6],
					[51, 13.8],
					[51, 13.9],
					[50, 14],
				]}
				color="#00FFFF"
				weight={1}
			/>
		</MapContainer>
	);
};
export default Map;
