import React, { useContext } from 'react';
import PumpContext from '../context/pump/pumpContext';
import PumpSettings from './PumpSettings';
import PumpPlot from './PumpPlot';

const Pump = () => {
	const pumpContext = useContext(PumpContext);

	const { pumpStatus, getStatus } = pumpContext;

	const { pumpid } = pumpStatus;

	const nextPump = () => {
		if (pumpid < 4) {
			getStatus(pumpid + 1);
		}
	};

	const prevPump = () => {
		if (pumpid > 1) {
			getStatus(pumpid - 1);
		}
	};

	return (
		<div>
			<div className="pump">
				<h1>Pump {pumpid}</h1>
				<span className="btn" onClick={prevPump}>
					Prev
				</span>
				<span className="btn" onClick={nextPump}>
					Next
				</span>
				<PumpPlot></PumpPlot>
				<PumpSettings></PumpSettings>
			</div>
		</div>
	);
};

export default Pump;
