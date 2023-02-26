import { useState } from "react";
import { useMultistepForm } from "../hooks/useMultistepForm";
import Button from "./Button";

interface MultistepForm {
	handleSubmit: () => void;
	children?: any;
	formSteps: any[];
	submitButtonText: string;
}

const MultistepForm = ({
	handleSubmit,
	children,
	formSteps,
	submitButtonText,
}: MultistepForm) => {
	const { step, next, back, isLastStep } = useMultistepForm(formSteps);
	const [submit, setSubmit] = useState(false);
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (submit) return handleSubmit();

		if (isLastStep) {
			back();
		} else {
			next();
		}
	};

	return (
		<form
			onSubmit={onSubmit}
			className="max-w-md w-full flex flex-col gap-4 border-2 border-black p-2 sm:p-8 rounded-xl shadow-2xl bg-white"
		>
			{step}
			<div className="mt-4 w-full flex gap-2">
				{
					<Button variant="outlined" type="submit" className="w-full">
						{isLastStep ? "POWRÓT" : "DALEJ"}
					</Button>
				}
				{isLastStep && (
					<Button
						variant="filled"
						onClick={() => setSubmit(true)}
						type="submit"
						className="w-full"
					>
						{submitButtonText}
					</Button>
				)}
			</div>
			{children}
		</form>
	);
};
export default MultistepForm;
