interface Button {
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	className?: string;
	onClick?: () => void;
	variant: "filled" | "outlined";
	disabled?: boolean;
}

const Button = ({
	children,
	type,
	className,
	onClick,
	variant,
	disabled = false,
}: Button) => {
	return (
		<button
			type={type || "button"}
			className={`${
				variant === "filled"
					? "bg-black text-white hover:bg-gray-800"
					: "bg-white text-black border-2 border-black "
			} ${
				disabled ? "opacity-50" : ""
			} text-lg py-2 px-4 rounded-xl transition-colors duration-500 ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
export default Button;
