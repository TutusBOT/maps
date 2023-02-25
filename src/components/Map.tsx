import {
	MapContainer,
	TileLayer,
	Polyline,
	Marker,
	Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Map {
	center?: [number, number];
	positions: Array<[number, number]>;
	origin: string;
	destination: string;
}

const Map = ({ center, positions, origin, destination }: Map) => {
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
			<Polyline positions={positions} color="#00FFFF" weight={3} />
			<Marker position={positions[0]}>
				<Tooltip>{origin}</Tooltip>
			</Marker>
			<Marker position={positions[positions.length - 1]}>
				<Tooltip>{destination}</Tooltip>
			</Marker>
		</MapContainer>
	);
};
export default Map;
