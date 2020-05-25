import React, { useReducer } from 'react';
import PumpContext from './pumpContext';
import pumpReducer from './pumpReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

import { GET_STATUS, UPDATE_STATUS, GET_SENSOR_DATA } from '../types';

const PumpState = (props) => {
	const initialState = {
		pumpStatus: {
			pumpid: 1,
			type: 'off',
			times: [''],
			days: [''],
			durations: [''],
			threshold: 20000,
		},
		loaded: false,
		sensordata: [],
	};

	const [state, dispatch] = useReducer(pumpReducer, initialState);

	const getStatus = async (pumpid) => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		const status = await axios.get(
			'http://fb26d8c2.ngrok.io/pump/status/' + pumpid,
			{
				crossdomain: true,
			}
		);
		console.log(status.data.status.type);
		switch (status.data.status.type) {
			// case 'off':
			case 'off':
				dispatch({
					type: GET_STATUS,
					payload: {
						pumpid: status.data.status.pumpid,
						type: 'off',
						times: [''],
						days: [''],
						durations: [''],
						threshold: 20000,
					},
				});
				break;
			case 'schedule':
				dispatch({
					type: GET_STATUS,
					payload: {
						pumpid: status.data.status.pumpid,
						type: status.data.status.type,
						times: status.data.status.times,
						days: [''],
						durations: status.data.status.durations,
						threshold: 20000,
					},
				});
			case 'scheduleday':
				dispatch({
					type: GET_STATUS,
					payload: {
						pumpid: status.data.status.pumpid,
						type: status.data.status.type,
						times: status.data.status.times,
						days: status.data.status.days,
						durations: status.data.status.durations,
						threshold: 20000,
					},
				});
				break;
		}

		getSensorData(pumpid);
	};

	const updateStatus = async (pumpStatus) => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		switch (pumpStatus.type) {
			case 'off':
				pumpStatus = {
					...pumpStatus,
					times: [''],
					days: [''],
					durations: [''],
					threshold: 20000,
				};
			case 'schedule':
				pumpStatus = {
					...pumpStatus,
					days: [''],
					threshold: 20000,
				};
		}

		const resData = await axios.post(
			'http://fb26d8c2.ngrok.io/pump/status',
			pumpStatus
		);

		console.log(resData);
	};

	const getSensorData = async (pumpid) => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		const data = await axios.get(
			'http://fb26d8c2.ngrok.io/sensor/log/' + pumpid,
			{
				crossdomain: true,
			}
		);

		dispatch({ type: GET_SENSOR_DATA, payload: data.data.records });
	};

	const runPump = async (pumpid, duration) => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		const run = await axios.get(
			'http://fb26d8c2.ngrok.io/pump/run/' + pumpid + '/' + duration
		);
	};

	return (
		<PumpContext.Provider
			value={{
				pumpStatus: state.pumpStatus,
				loaded: state.loaded,
				sensordata: state.sensordata,
				getStatus,
				updateStatus,
				runPump,
			}}
		>
			{props.children}
		</PumpContext.Provider>
	);
};

export default PumpState;
