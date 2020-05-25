import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from '././authReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	AUTH_ERROR,
} from '../types';

const AuthState = (props) => {
	const initalState = {
		token: localStorage.getItem('token'),
		isAuthenticated: false,
		loading: false,
		username: null,
	};

	const [state, dispatch] = useReducer(authReducer, initalState);

	// Login User
	const login = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post(
				'http://fb26d8c2.ngrok.io/auth',
				formData,
				config
			);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Logout
	const logout = () => {
		dispatch({ type: LOGOUT });
	};

	// Clear Errors
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				username: state.username,
				login,
				logout,
				clearErrors,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
