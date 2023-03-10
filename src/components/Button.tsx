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
					? "bg-green-500 text-white hover:bg-gray-800"
					: "bg-white text-black border-2 border-black hover:text-green-500 hover:border-green-500"
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
