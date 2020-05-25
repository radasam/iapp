import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

const Navbar = () => {
	const authContext = useContext(AuthContext);

	const { isAuthenticated, logout } = authContext;

	const guestlinks = (
		<li>
			<Link to="/login">Login</Link>
		</li>
	);

	const authlinks = (
		<Fragment>
			<li>
				<Link to="/">Pumps</Link>
			</li>
			<li>
				<Link to="/camera">Camera</Link>
			</li>
			<li>
				<a onClick={logout} href="#!">
					Logout
				</a>
			</li>
		</Fragment>
	);

	return (
		<div className="navbar">
			<ul>{isAuthenticated ? authlinks : guestlinks}</ul>
		</div>
	);
};

export default Navbar;
