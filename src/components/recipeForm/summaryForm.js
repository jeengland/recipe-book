import React from 'react';
import PropTypes from 'prop-types';

import TimeInput from '../baseComponents/timeInput.js';
import { Card, CardHeader, TextField } from '@mui/material';

SummaryForm.propTypes = {
	state: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		])
	),
	setState: PropTypes.func
};

function SummaryForm({ state, setState }) {
	const handleServingsChange = (e) => {
		if (e.target.value < 0) {
			console.error('Servings cannot be less than 0');
			return;
		}

		let newState = {...state};

		newState.servings = e.target.value;

		setState(newState);
	};

	return (
		<Card>
			<CardHeader title="Summary" subheader="Basic info about your recipe"/>
			<TimeInput name='prepTime' state={state} setState={setState}/>
			<TimeInput name='cookTime' state={state} setState={setState}/>
			<TimeInput name='additionalTime' state={state} setState={setState}/>
			<TextField name='servings' label='Servings' type='number' value={state.servings} onChange={handleServingsChange}/>
		</Card>
	);
}

export default SummaryForm;