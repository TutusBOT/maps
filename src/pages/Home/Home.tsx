import { useContext, useState } from "react";
import { Input, Navbar, RouteHistory } from "../../components";
import MultistepForm from "../../components/MultistepForm";
import { AppContext } from "../../App";
import { useFlexiblePolyline } from "../../hooks/useFlexiblePolyline";
import { getRoute } from "./getRoute";
import { getCoordinates } from "./getCoordinates";
import { useNavigate } from "react-router";
import { calculateToll } from "./calculateToll/calculateTolll";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
	const appContext = useContext(AppContext);
	if (!appContext) return null;

	const navigate = useNavigate();
	const [originFields, setOriginFields] = useState({
		country: "",
		city: "",
		street: "",
	});
	const [destinationFields, setDestinationFields] = useState({
		country: "",
		city: "",
		street: "",
	});

	const handleSubmit = async () => {
		const [origin] = await getCoordinates(originFields);
		const [destination] = await getCoordinates(destinationFields);
		if (!origin || !destination) return;
		const route = await getRoute({
			origin: [origin.position.lat, origin.position.lng].join(","),
			destination: [destination.position.lat, destination.position.lng].join(
				","
			),
		});
		if (!route) return;

		const currentRoute = {
			destination: destination.address.label,
			origin: origin.address.label,
			length: route.summary.length,
			positions: useFlexiblePolyline(route.polyline),
			toll: calculateToll(route.tolls ? route.tolls : []),
		};

		appContext.setCurrentRoute(currentRoute);
		appContext.setRouteHistory([...appContext.routeHistory, currentRoute]);

		navigate("/maps/route");
	};

	return (
		<div>
			<ToastContainer position="bottom-left" theme="light" pauseOnHover />
			<Navbar />
			<div
				className="w-full flex justify-center items-center h-screen"
				style={{
					backgroundImage: "url(map-background.png)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				<MultistepForm
					handleSubmit={handleSubmit}
					submitButtonText="OBLICZ TRASĘ"
					formSteps={[
						<>
							<h3 className="text-2xl">Podaj miejsce startu</h3>
							<Input
								id="country"
								name="country"
								label="Kraj"
								required
								value={originFields.country}
								onChange={(e) => {
									setOriginFields({ ...originFields, country: e.target.value });
								}}
							/>
							<Input
								id="city"
								name="city"
								label="Miasto"
								required
								value={originFields.city}
								onChange={(e) =>
									setOriginFields({ ...originFields, city: e.target.value })
								}
							/>
							<Input
								id="street"
								name="street"
								label="Ulica"
								required
								value={originFields.street}
								onChange={(e) =>
									setOriginFields({ ...originFields, street: e.target.value })
								}
							/>
						</>,
						<>
							<h3 className="text-2xl">Podaj miejsce docelowe</h3>
							<Input
								id="country"
								name="country"
								label="Kraj"
								required
								value={destinationFields.country}
								onChange={(e) => {
									setDestinationFields({
										...destinationFields,
										country: e.target.value,
									});
								}}
							/>
							<Input
								id="city"
								name="city"
								label="Miasto"
								required
								value={destinationFields.city}
								onChange={(e) =>
									setDestinationFields({
										...destinationFields,
										city: e.target.value,
									})
								}
							/>
							<Input
								id="street"
								name="street"
								label="Ulica"
								required
								value={destinationFields.street}
								onChange={(e) =>
									setDestinationFields({
										...destinationFields,
										street: e.target.value,
									})
								}
							/>
						</>,
					]}
				/>
				{appContext.routeHistory.length > 0 && (
					<a
						href="#history"
						className="absolute left-1/2 transform -translate-x-1/2 bottom-20 text-2xl bg-black rounded-lg py-2 px-8 text-white hover:bg-gray-900 transition-colors duration-500"
					>
						Historia tras
					</a>
				)}
			</div>
			{appContext.routeHistory.length > 0 && <RouteHistory />}
		</div>
	);
};
export default Home;
