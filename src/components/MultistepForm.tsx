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
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isLastStep) {
			back();
		} else {
			next();
		}
	};

	return (
		<form onSubmit={onSubmit} className="max-w-sm w-full flex flex-col gap-4">
			{step}
			<div className="mt-4 w-full flex gap-2">
				{
					<Button variant="outlined" type="submit" className="w-full">
						{isLastStep ? "POWRÓT" : "DALEJ"}
					</Button>
				}
				{isLastStep && (
					<Button variant="filled" onClick={handleSubmit} className="w-full">
						{submitButtonText}
					</Button>
				)}
			</div>
			{children}
		</form>
	);
};
export default MultistepForm;