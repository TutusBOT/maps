interface Button {
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	onClick: () => void;
}

const Button = ({ children, type, onClick }: Button) => {
	return (
		<button type={type || "button"} className="" onClick={onClick}>
			{children}
		</button>
	);
};
export default Button;
