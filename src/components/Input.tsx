interface Input {
	label: string;
	id: string;
	name: string;
	type?: string;
	required?: boolean;
	value: string | number | readonly string[] | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, id, type, name, required, value, onChange }: Input) => {
	return (
		<div className="flex flex-col max-w-3xl w-full text-lg">
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={type || "text"}
				className="bg-gray-200  outline-none p-2 w-full rounded-xl"
				name={name}
				required={required}
				value={value}
				onChange={(e) => onChange(e)}
			/>
		</div>
	);
};
export default Input;
