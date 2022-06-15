import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import TimeInput from '../baseComponents/timeInput.js';

const SummaryFormWrapper = styled.fieldset`
	color: pink;
`;

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
		<SummaryFormWrapper>
			<TimeInput name='prepTime' label='Prep Time' state={state} setState={setState}/>
			<TimeInput name='cookTime' label='Cook Time' state={state} setState={setState}/>
			<TimeInput name='additionalTime' label='Additional Time' state={state} setState={setState}/>
			<label htmlFor='servings'>Servings</label>
			<input name='servings' type='number' value={state.servings} onChange={handleServingsChange}/>
		</SummaryFormWrapper>
	);
}

export default SummaryForm;