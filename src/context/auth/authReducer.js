import {
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_ERRORS,
	LOGIN_FAIL,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: false,
				isAuthenticated: false,
				loading: false,
				username: null,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
