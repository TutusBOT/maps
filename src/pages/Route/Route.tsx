import { Button, Input, Map, Navbar } from "../../components";
import { AppContext } from "../../App";
import { useContext, useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import { calculateRouteCost } from "./calculateRouteCost/calculateRouteCost";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

const Route = () => {
	const navigate = useNavigate();
	const [cost, setCost] = useState("0");
	const pdfRef = useRef(null);
	const appContext = useContext(AppContext);

	if (!appContext || !appContext.currentRoute) return null;

	const generatePDF = async () => {
		const report = new jsPDF();
		if (!pdfRef.current || !appContext.currentRoute) return;
		const canvas = await html2canvas(pdfRef.current);
		const data = canvas.toDataURL("image/png");
		const imgProperties = report.getImageProperties(data);
		const pdfWidth = report.internal.pageSize.getWidth();
		const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
		report.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
		report.save(
			`Trasa ${appContext?.currentRoute.origin} - ${appContext?.currentRoute.destination}.pdf`
		);
	};

	useEffect(() => {
		if (!appContext?.currentRoute) {
			console.log("hcu");

			navigate("/maps/");
		}
	}, []);
	return (
		<div className="h-screen">
			<Navbar />
			<main className="w-full py-16 px-2 sm:px-8">
				<div
					className="flex flex-col w-full text-base sm:text-lg py-4"
					ref={pdfRef}
				>
					<h3 className="text-lg sm:text-2xl">Dane trasy</h3>
					<div>Miejsce początkowe: {appContext.currentRoute.origin}</div>
					<div>
						Współrzędne geograficzne miejsca początkowego:{" "}
						{appContext.currentRoute.positions[0][0]}{" "}
						{appContext.currentRoute.positions[0][1]}
					</div>
					<div>Miejsce docelowe: {appContext.currentRoute.destination}</div>
					<div>
						Współrzędne geograficzne miejsca docelowego:{" "}
						{
							appContext.currentRoute.positions[
								appContext.currentRoute.positions.length - 1
							][0]
						}{" "}
						{
							appContext.currentRoute.positions[
								appContext.currentRoute.positions.length - 1
							][1]
						}
					</div>
					<div>Dystans: {appContext.currentRoute.length / 1000}km</div>
					<div>
						Koszt:{" "}
						{calculateRouteCost({
							cost: parseFloat(cost),
							length: appContext.currentRoute.length,
							toll: appContext.currentRoute.toll,
						})}
						zł
					</div>
				</div>
				<div className="flex">
					<Input
						id="cost"
						name="cost"
						label="Koszt"
						onChange={(e) => setCost(e.target.value)}
						value={cost}
					/>
					<Button variant="filled" onClick={generatePDF}>
						POBIERZ TRASĘ
					</Button>
				</div>
				<Map />
			</main>
		</div>
	);
};
export default Route;
