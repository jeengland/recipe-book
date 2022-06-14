import React, { useState } from 'react';
import styled from '@emotion/styled';
import { hasOneOrZeroColons, validateTimestamp } from '../../utils/timeUtils';

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
	};

	const handleKeyDown = (e) => {
		switch (e.keyCode) {
		case 38:
			console.log('up key');
			break;
		case 40:
			console.log('down key');
			break;
		}
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

function SummaryForm({ state, setState }) {
	return (
		<SummaryFormWrapper>
			<TimeInput/>
		</SummaryFormWrapper>
	);
}

export default SummaryForm;