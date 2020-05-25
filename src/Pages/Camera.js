import React, { useEffect, useState } from 'react';

const Camera = () => {
	const [currpic, setCurrpic] = useState(0);

	useEffect(() => {
		var startX;

		document.getElementById('imagebox-curr').innerHTML =
			'<img style="max-width:100%;height:auto;" src="/pic/' + currpic + '">';

		document.getElementById('imagebox-prev').innerHTML =
			'<img style="max-width:100%;height:auto;display:none;" src="/pic/' +
			parseInt(currpic - 1) +
			'">';
		document.getElementById('imagebox-prev-2').innerHTML =
			'<img style="max-width:100%;height:auto;display:none;" src="/pic/' +
			parseInt(currpic - 2) +
			'">';

		document
			.getElementById('imagebox-curr')
			.addEventListener('touchstart', function (e) {
				startX = e.changedTouches[0].screenX;
			});

		document
			.getElementById('imagebox-curr')
			.addEventListener('touchend', function (e) {
				if (startX > e.changedTouches[0].screenX + 50) {
					nextPic();
				} else if (startX < e.changedTouches[0].screenX - 50) {
					lastPic();
				}
			});
	}, []);

	const nextPic = () => {
		if (currpic < 0) {
			document.getElementById('imagebox-curr').innerHTML =
				'<img style="max-width:100%;height:auto;" src="/pic/' +
				parseInt(currpic + 1) +
				'">';
			setCurrpic(currpic + 1);
		}
	};
	const lastPic = () => {
		if (currpic <= 0) {
			var nextPic = parseInt(currpic - 1);
			document.getElementById('imagebox-curr').innerHTML =
				'<img style="max-width:100%;height:auto;" src="/pic/' + nextPic + '">';
			setCurrpic(parseInt(currpic - 1));
			document.getElementById('imagebox-prev').innerHTML =
				'<img style="max-width:100%;height:auto;display:none;" src="/pic/' +
				parseInt(currpic - 2) +
				'">';
			document.getElementById('imagebox-prev-2').innerHTML =
				'<img style="max-width:100%;height:auto;display:none;" src="/pic/' +
				parseInt(currpic - 3) +
				'">';
		}
	};

	return (
		<div className="pump">
			<div id="imagebox-prev-2"></div>
			<div id="imagebox-prev"></div>
			<div id="imagebox-curr"></div>
			<span className="btn" onClick={lastPic}>
				Prev
			</span>
			<span className="btn" onClick={nextPic}>
				Next
			</span>
		</div>
	);
};

export default Camera;
