import { Dispatch, SetStateAction, useState } from "react";
import { Input, Navbar, RouteHistory } from "../../components";
import MultistepForm from "../../components/MultistepForm";
import { RouteI } from "../../App";
import { useFlexiblePolyline } from "../../hooks/useFlexiblePolyline";
import { getRoute } from "./getRoute";
import { getCoordinates } from "./getCoordinates";
import { redirect, useNavigate } from "react-router";

interface Home {
	setCurrentRoute: Dispatch<SetStateAction<RouteI>>;
}

const Home = ({ setCurrentRoute }: Home) => {
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
		let accumulatedToll = 0;
		if (route.tolls) {
			route.tolls.forEach(
				(toll: { fares: [{ convertedPrice: { value: number } }] }) => {
					toll.fares.forEach((fare) => {
						accumulatedToll += fare.convertedPrice.value;
					});
				}
			);
		}
		setCurrentRoute({
			destination: destination.address.label,
			origin: origin.address.label,
			length: route.summary.length,
			positions: useFlexiblePolyline(route.polyline),
			toll: accumulatedToll,
		});
		console.log(route);

		navigate("/maps/route");
	};

	return (
		<div>
			<Navbar />
			<div className="w-full flex justify-center py-8">
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
			</div>
			<RouteHistory />
		</div>
	);
};
export default Home;
