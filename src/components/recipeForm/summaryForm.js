import React from 'react';
import PropTypes from 'prop-types';

import TimeInput from '../baseComponents/timeInput.js';
import { Card, CardHeader, InputAdornment, TextField } from '@mui/material';

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

	const handleTemperatureChange = (e) => {
		if (e.target.value < 0) {
			console.error('Temperature cannot be negative');
			return;
		}

		let newState = {...state};

		newState.preheat = e.target.value;

		setState(newState);
	};

	const styles = {
		marginX: '.5rem',
		marginY: '.25rem',
		width: '44%',
		marginLeft: '1.2rem',
	};

	return (
		<Card sx={{marginY: '1rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: '1%', paddingBottom: '1rem'}}>
			<CardHeader title="Summary" subheader="Basic info about your recipe" sx={{width: '100%'}}/>
			<TimeInput name='prepTime' styles={styles} state={state} setState={setState}/>
			<TimeInput name='cookTime' styles={styles} state={state} setState={setState}/>
			<TimeInput name='additionalTime' styles={styles} state={state} setState={setState}/>
			<TextField 
				name='servings' 
				label='Servings' 
				type='number' 
				value={state.servings} 
				onChange={handleServingsChange}
				sx={styles}
			/>
			<TextField 
				name='preheat' 
				label='Preheat Temperature' 
				type='number' 
				value={state.preheat} 
				onChange={handleTemperatureChange}
				InputProps={{endAdornment:
					<InputAdornment position='end'>
						°
					</InputAdornment>
				}}
				sx={styles}
			/>
		</Card>
	);
}

export default SummaryForm;