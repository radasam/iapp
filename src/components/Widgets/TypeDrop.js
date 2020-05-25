import React from 'react';

const TypeDrop = (props) => {
	const { type, onChange } = props;

	return (
		<select name="type" type="text" onChange={onChange}>
			<option value={type}>
				{type == 'scheduleday'
					? 'Schedule Day'
					: type.charAt(0).toUpperCase() + type.slice(1)}
			</option>
			<option value="off">Off</option>
			<option value="auto">Auto</option>
			<option value="schedule">Schedule</option>
			<option value="scheduleday">Schedule Day</option>
		</select>
	);
};

export default TypeDrop;
