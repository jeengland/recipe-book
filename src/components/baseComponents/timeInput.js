import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';

import { minutesToTimeStamp, timeStampToMinutes, validateTimestamp } from '../../utils/timeUtils.js';
import { sentenceCase } from '../../utils/textUtils.js';
 
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

function TimeInput({ name, state, setState }) {
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
		setErr('');
		let currentTime = timeStampToMinutes(time);

		if (increment < 0) {
			currentTime = Math.floor((currentTime + increment) / increment) * increment;
		}

		if (increment > 0) {
			currentTime = Math.ceil((currentTime + increment) / increment) * increment;
		}

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
			{/* { err ? <p>{err}</p> : undefined} */}
			<TextField error={err} helperText={err} name={name} id={name} label={sentenceCase(name)} type='text' value={time} onChange={handleChange} onKeyDown={handleKeyDown}/>
		</>
	);
}

export default TimeInput;