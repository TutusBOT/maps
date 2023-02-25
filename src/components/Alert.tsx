interface Alert {
	open: boolean;
	title: string;
	message: string;
}

const Alert = ({ title, message, open }: Alert) => {
	if (open)
		return (
			<div>
				<h4>{title}</h4>
				<p>{message}</p>
			</div>
		);
};
export default Alert;
