import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { minutesToTimeStamp, timeStampToMinutes, validateTimestamp } from '../../utils/timeUtils';

const Time = styled.input`
	color: goldenrod
`;

function TimeInput() {
	const [time, setTime] = useState('0:00');
	const [err, setErr] = useState('');

	const handleChange = (e) => {
		const err = validateTimestamp(e.target.value).err;

		if (e.target.value === '' || !err) {
			setTime(e.target.value);
			setErr('');
		} else {
			setErr(err);
		}

		return;
	};

	const incrementTime = (increment) => {
		var currentTime = timeStampToMinutes(time);

		currentTime +=  increment;

		setTime(minutesToTimeStamp(currentTime));

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
			<Time type='text' value={time} onChange={handleChange} onKeyDown={handleKeyDown}/>
		</>
	);
}

const SummaryFormWrapper = styled.fieldset`
	color: pink;
`;

SummaryForm.propTypes = {
	state: PropTypes.object,
	setState: PropTypes.func
};

function SummaryForm({ state, setState }) {
	return (
		<SummaryFormWrapper>
			<TimeInput/>
		</SummaryFormWrapper>
	);
}

export default SummaryForm;