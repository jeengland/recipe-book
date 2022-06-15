import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


import { minutesToTimeStamp, timeStampToMinutes, validateTimestamp } from '../../utils/timeUtils';

const Time = styled.input`
	color: goldenrod
`;

TimeInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	state: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		])
	),
	setState: PropTypes.func
};

function TimeInput({ label, name, state, setState }) {
	const [err, setErr] = useState(''),
		time = state[name];

	const handleChange = (e) => {
		const err = validateTimestamp(e.target.value).err;

		if (e.target.value === '' || !err) {
			const newTime = {...state};

			newTime[name] = e.target.value;

			setState(newTime);
			setErr('');
		} else {
			setErr(err);
		}

		return;
	};

	const incrementTime = (increment) => {
		let currentTime = timeStampToMinutes(time);

		currentTime +=  increment;

		if (currentTime <= 0) {
			currentTime = 0;
		}

		const newTime = {...state};

		newTime[name] = minutesToTimeStamp(currentTime);

		setState(newTime);

		return;
	};

	const handleKeyDown = (e) => {
		switch (e.keyCode) {
		case 38:
			incrementTime(15);
			break;
		case 40:
			incrementTime(-15);
			break;
		}

		return;
	};

	return (
		<>
			{ err ? <p>{err}</p> : undefined}
			<label htmlFor={name}>{label}</label>
			<Time name={name} id={name} type='text' value={time} onChange={handleChange} onKeyDown={handleKeyDown}/>
		</>
	);
}

export default TimeInput;