import React, { useEffect, useContext } from 'react';
import PumpContext from '../context/pump/pumpContext';
import { GoogleCharts } from 'google-charts';

const PumpPlot = () => {
	const pumpContext = useContext(PumpContext);
	const { sensordata } = pumpContext;

	useEffect(() => {
		GoogleCharts.load(drawChart);

		function drawChart() {
			const data = GoogleCharts.api.visualization.arrayToDataTable(
				sensordata.map((item, index) => {
					if (index == 0) {
						return item;
					} else {
						return [new Date(item[0]), item[1]];
					}
				})
			);

			var options = {
				title: 'Moisture Reading',
				vAxis: {
					viewWindow: {
						max:
							Math.max.apply(
								Math,
								sensordata.slice(1).map((row, index) => {
									return row[1];
								})
							) * 1.1,
						min:
							Math.min.apply(
								Math,
								sensordata.slice(1).map((row, index) => {
									return row[1];
								})
							) * 0.9,
					},
				},
				chartArea: {
					// leave room for y-axis labels
					width: '94%',
				},
			};

			const linechart = new GoogleCharts.api.visualization.LineChart(
				document.getElementById('chart')
			);

			linechart.draw(data, options);
		}
	}, [sensordata]);

	return <div id="chart"></div>;
};

export default PumpPlot;
