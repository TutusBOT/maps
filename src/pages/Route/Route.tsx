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

	const generatePDF = async () => {
		const report = new jsPDF();
		if (!pdfRef.current) return;
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

	if (!appContext) return null;
	useEffect(() => {
		if (!appContext?.currentRoute.positions.length) {
			navigate("/maps/");
		}
	}, []);
	return (
		<div className="h-screen overflow-hidden">
			<Navbar />
			<div className="w-full pt-16 px-2 sm:px-8 sm:grid sm:grid-cols-3 pb-2">
				<table
					className="flex flex-col  text-base sm:text-lg sm:px-8  py-4 border-2 border-black rounded-lg col-span-2"
					ref={pdfRef}
				>
					<thead>
						<tr>
							<th className="text-lg sm:text-2xl" colSpan={1}>
								Dane trasy
							</th>
						</tr>
					</thead>
					<tbody className="mt-4">
						<tr className="flex justify-between border-b-2 border-gray-300 mt-2 pb-1">
							<td>Miejsce początkowe </td>
							<td>{appContext.currentRoute.origin}</td>
						</tr>
						<tr className="flex justify-between border-b-2 border-gray-300 mt-2 pb-1">
							<td>Współrzędne geograficzne</td>
							<td>
								{appContext.currentRoute.positions[0][0]}{" "}
								{appContext.currentRoute.positions[0][1]}
							</td>
						</tr>
						<tr className="flex justify-between border-b-2 border-gray-300 mt-2 pb-1">
							<td>Miejsce docelowe</td>
							<td>{appContext.currentRoute.destination}</td>
						</tr>
						<tr className="flex justify-between border-b-2 border-gray-300 mt-2 pb-1">
							<td>Współrzędne geograficzne</td>
							<td>
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
							</td>
						</tr>
						<tr className="flex justify-between border-b-2 border-gray-300 mt-2 pb-1">
							<td>Dystans</td>
							<td> {(appContext.currentRoute.length / 1000).toFixed(2)}km</td>
						</tr>
						<tr className="flex justify-between border-b-2 border-gray-300 mt-2 pb-1">
							<td>Koszt</td>
							<td>
								{calculateRouteCost({
									cost: parseFloat(cost),
									length: appContext.currentRoute.length,
									toll: appContext.currentRoute.toll,
								})}
								zł
							</td>
						</tr>
					</tbody>
				</table>
				<div className="flex flex-col items-center justify-center gap-4 py-4">
					<Input
						id="cost"
						name="cost"
						label="Koszt (zł/km)"
						onChange={(e) => setCost(e.target.value)}
						value={cost}
						className="max-w-xs"
						type="number"
						min={0}
					/>
					<div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:justify-between">
						<Button variant="filled" onClick={generatePDF}>
							Pobierz trasę
						</Button>
						<Button
							variant="outlined"
							onClick={() => {
								navigate("/maps/#history");
							}}
						>
							Historia tras
						</Button>
					</div>
				</div>
			</div>
			<Map />
		</div>
	);
};
export default Route;
