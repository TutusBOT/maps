interface Input {
	label: string;
	id: string;
	name: string;
	type?: string;
	required?: boolean;
	value: string | number | readonly string[] | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	min?: number;
	max?: number;
}

const Input = ({
	label,
	id,
	type,
	name,
	required,
	value,
	onChange,
	className,
	min,
	max,
}: Input) => {
	return (
		<div className={`flex flex-col max-w-3xl w-full text-lg ${className}`}>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={type || "text"}
				className="bg-gray-200  outline-none p-2 w-full rounded-xl"
				name={name}
				required={required}
				value={value}
				onChange={(e) => onChange(e)}
				min={min}
				max={max}
			/>
		</div>
	);
};
export default Input;
