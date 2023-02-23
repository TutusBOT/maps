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
		<div className="flex flex-col max-w-3xl w-full">
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={type || "text"}
				className="bg-transparent border-white border-2 outline-none text-lg p-2 w-full"
				name={name}
				required={required}
				value={value}
				onChange={(e) => onChange(e)}
			/>
		</div>
	);
};
export default Input;
