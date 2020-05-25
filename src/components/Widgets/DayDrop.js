import React from 'react';

const DayDrop = (props) => {
	const { onChange, className, name, childkey, day } = props;
	return (
		<select
			className={className}
			key={childkey}
			name={name}
			type="text"
			onChange={onChange}
		>
			<option value={day} hidden>
				{day}
			</option>
			<option value="Monday">Monday</option>
			<option value="Tuesday">Tuesday</option>
			<option value="Wednesday">Wednesday</option>
			<option value="Thursday">Thursday</option>
			<option value="Friday">Friday</option>
			<option value="Saturday">Saturday</option>
			<option value="Sunday">Sunday</option>
		</select>
	);
};

export default DayDrop;
