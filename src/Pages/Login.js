import React, { useState, useContext, useEffect } from 'react';

import authContext from '../context/auth/authContext';

const Login = (props) => {
	const AuthContext = useContext(authContext);

	const { login, isAuthenticated } = AuthContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}
	}, [isAuthenticated]);

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const { username, password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (username !== '' || password !== '') {
			login({ username, password });
		}
	};

	return (
		<div className="pump">
			<h1>Login</h1>
			<div className="pumpsettings">
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input
						name="username"
						type="text"
						value={username}
						onChange={onChange}
					></input>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						name="password"
						type="password"
						value={password}
						onChange={onChange}
					></input>
				</div>
				<span onClick={(e) => onSubmit(e)} className="btn btn-right">
					Login
				</span>
			</div>
		</div>
	);
};

export default Login;
