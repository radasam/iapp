import { GET_STATUS, UPDATE_STATUS, GET_SENSOR_DATA } from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_STATUS:
			return {
				...state,
				pumpStatus: action.payload,
				loaded: true,
			};
		case GET_SENSOR_DATA:
			return { ...state, sensordata: action.payload };
		default:
			return state;
	}
};
