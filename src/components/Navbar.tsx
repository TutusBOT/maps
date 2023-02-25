import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<header>
			<nav
				role="navigation"
				className="w-full px-4 py-4 flex text-xl bg-black text-white"
			>
				<Link to="/maps/">HOME</Link>
			</nav>
		</header>
	);
};
export default Navbar;
