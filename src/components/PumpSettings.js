import React, { useState, useContext, useEffect, Fragment } from 'react';
import PumpContext from '../context/pump/pumpContext';
import DayDrop from './Widgets/DayDrop';
import TypeDrop from './Widgets/TypeDrop';

const PumpSettings = () => {
	const pumpContext = useContext(PumpContext);

	const [stateStatus, setStateStatus] = useState({
		pumpid: 1,
		type: 'off',
		times: [''],
		days: [''],
		durations: [''],
		threshold: 20000,
	});

	const { pumpStatus, getStatus, updateStatus, loaded, runPump } = pumpContext;

	useEffect(() => {
		if (!loaded) {
			getStatus(1);
		}
		setStateStatus(pumpStatus);
	}, [pumpStatus]);

	const { pumpid, type, days, times, durations, threshold } = stateStatus;

	const onChange = (e) => {
		if (e.target.name === 'type') {
			setStateStatus({
				...stateStatus,
				type: e.target.value,
			});
		} else if (e.target.name.includes('day')) {
			setStateStatus({
				...stateStatus,
				days: [].concat(
					days.slice(0, parseInt(e.target.name.replace('day-', ''))),
					e.target.value,
					days.slice(
						parseInt(e.target.name.replace('day-', '')) + 1,
						days.length
					)
				),
			});
		} else if (e.target.name.includes('time')) {
			setStateStatus({
				...stateStatus,
				times: [].concat(
					times.slice(0, parseInt(e.target.name.replace('time-', ''))),
					e.target.value,
					times.slice(
						parseInt(e.target.name.replace('time-', '')) + 1,
						times.length
					)
				),
			});
		} else if (e.target.name.includes('duration')) {
			setStateStatus({
				...stateStatus,
				durations: [].concat(
					durations.slice(0, parseInt(e.target.name.replace('duration-', ''))),
					e.target.value,
					durations.slice(
						parseInt(e.target.name.replace('duration-', '')) + 1,
						durations.length
					)
				),
			});
		}
	};

	const addRow = () => {
		if (type === 'scheduleday') {
			setStateStatus({
				...stateStatus,
				days: days.concat(''),
				times: times.concat(''),
				durations: durations.concat(''),
			});
		} else {
			setStateStatus({
				...stateStatus,
				times: times.concat(''),
				durations: durations.concat(''),
			});
		}
	};

	return (
		<Fragment>
			<div className="pumpsettings">
				<br></br>
				<form>
					<div className="form-group">
						<label htmlFor="type">Type</label>
						<TypeDrop type={type} onChange={onChange}></TypeDrop>
					</div>
					{type === 'scheduleday' ? (
						<Fragment>
							<div className="multi-form-group four">
								<label className="multi-form-title">Schedule</label>
								<div className="col2">Days</div>
								<div className="col3">Times</div>
								<div className="col4">Durations</div>
								{days.map((day, index) => (
									<DayDrop
										onChange={onChange}
										className="col2"
										name={'day-' + index}
										childkey={'day-' + index}
										day={day}
									></DayDrop>
								))}
								{times.map((time, index) => (
									<input
										onChange={onChange}
										className="col3"
										name={'time-' + index}
										key={'time-' + index}
										type="time"
										value={time}
									></input>
								))}
								{durations.map((duration, index) => (
									<input
										onChange={onChange}
										className="col4"
										name={'duration-' + index}
										key={'duration-' + index}
										type="text"
										value={duration}
									></input>
								))}
							</div>
							<span className="btn btn-right" onClick={addRow}>
								+
							</span>
						</Fragment>
					) : type === 'schedule' ? (
						<Fragment>
							<div className="multi-form-group">
								<label className="multi-form-title">Schedule</label>
								<div className="col2">Times</div>
								<div className="col3">Durations</div>
								{times.map((time, index) => (
									<input
										onChange={onChange}
										className="col2"
										name={'time-' + index}
										key={'time-' + index}
										type="time"
										value={time}
									></input>
								))}
								{durations.map((duration, index) => (
									<input
										onChange={onChange}
										className="col3"
										name={'duration-' + index}
										key={'duration-' + index}
										type="text"
										value={duration}
									></input>
								))}
							</div>
							<span className="btn btn-right" onClick={addRow}>
								+
							</span>
						</Fragment>
					) : type === 'auto' ? (
						<Fragment>
							<div className="form-group">
								<label htmlFor="threshold">Threshold</label>
								<input type="text" name="threshold"></input>
							</div>
							<div className="form-group">
								<label htmlFor="duration">Duration</label>
								<input type="text" name="duration"></input>
							</div>
						</Fragment>
					) : (
						<div></div>
					)}
				</form>
				<br></br>
				<br></br>
				<span
					className="btn btn-right"
					onClick={(e) => updateStatus(stateStatus)}
				>
					Update
				</span>
				<br></br>
				<div className="form-group">
					<label htmlFor="rundur">
						<span
							className="btn"
							onClick={(e) =>
								runPump(pumpid, document.getElementById('rundur').value)
							}
						>
							Run Pump
						</span>
					</label>
					<input
						style={{ marginRight: '2%' }}
						id="rundur"
						type="number"
						name="rundur"
						step="0.5"
					></input>
					<span>Sec</span>
				</div>
			</div>
		</Fragment>
	);
};

export default PumpSettings;
