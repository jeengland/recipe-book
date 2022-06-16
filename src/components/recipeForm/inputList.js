import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { Button, TextField, InputAdornment, IconButton, Card, CardHeader, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { sentenceCase } from '../../utils/textUtils.js';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';


const InputWrapper = styled.li`
	list-style-type: none;
`;

Input.propTypes = {
	index: PropTypes.number,
	name: PropTypes.string,
	value: PropTypes.objectOf(
		PropTypes.string
	),
	last: PropTypes.bool,
	handleChange: PropTypes.func,
	handleRemove: PropTypes.func,
	handleMove: PropTypes.func,
	fullWidth: PropTypes.bool
};

function Input({ index, name, value, last, handleChange, handleRemove, handleMove, fullWidth=false }) {
	const fields = Object.keys(value);

	return (
		<InputWrapper key={name}>
			{
				fields.map((field, i) => {
					const fieldName = name + '-' + field;

					let deleteable = {};

					if (i === fields.length - 1) {
						deleteable = {
							endAdornment:
							<InputAdornment position="end">
								<IconButton disabled={index === 0} onClick={() => handleMove('up', index)}>
									<KeyboardArrowUp/>
								</IconButton>
								<IconButton disabled={last} onClick={() => handleMove('down', index)}>
									<KeyboardArrowDown/>
								</IconButton>
								<IconButton onClick={() => handleRemove(index)}>
									<DeleteIcon/>
								</IconButton>
							</InputAdornment>
						};
					}
					
					return (
						<TextField 
							InputProps={deleteable} 
							fullWidth={fullWidth} 
							key={fieldName} 
							name={fieldName} 
							label={sentenceCase(field)} 
							value={value[field]} 
							onChange={(e) => handleChange(index, field, e)}
							sx={{ 
								width: fullWidth ? '91.5%' : `${ 90 / fields.length }%`, 
								marginX: '.7rem',
								marginY: '.5rem'
							}}
						/>
					);
				})
			}
			
		</InputWrapper>
	);
}

InputList.propTypes = {
	listType: PropTypes.string,
	schema: PropTypes.objectOf(
		PropTypes.string
	),
	state: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.string
		)
	),
	setState: PropTypes.func,
	error: PropTypes.string,
	blurb: PropTypes.string,
	fullWidth: PropTypes.bool
};

function InputList({ listType, schema, state, setState, error, blurb, fullWidth=false }) {
	const addInput = () => {
		const values = [...state];

		values.push(schema);

		setState(values);
	};

	const handleChange = (index, field, e) => {
		const values = [...state];

		values[index][field] = e.target.value;

		setState(values);
	};

	const handleMove = (direction, pos) => {
		if (direction !== 'up' && direction !== 'down') {
			console.error('Invalid direction');
			return;
		}

		if (!state[pos]) {
			console.error('Invalid index');
			return;
		}

		if (direction === 'up' && pos === 0) {
			console.warn('Tried to move past beginning of state array');
			return;
		}

		if (direction === 'down' && pos === state.length - 1) {
			console.warn('Tried to move past end of state array');
			return;
		}

		const newState = [...state];
			
		let newPos;

		if (direction === 'up') {
			newPos = pos - 1;
		}

		if (direction === 'down') {
			newPos = pos + 1;
		}

		let elem = newState[pos];

		newState.splice(pos, 1);
		newState.splice(newPos, 0, elem);

		setState(newState);

		return;
	};

	const handleRemove = (index) => {
		const values = [...state],
			filteredValues = values.filter((value, i) => i != index);

		setState(filteredValues);
	};

	return (
		<Card sx={{marginY: '1rem', padding: '1%'}}>
			<CardHeader title={sentenceCase(listType)} subheader={blurb} sx={{paddingBottom: 0}}/>
			<ul style={{paddingLeft: 0, margin: '.75rem'}}>
				{state.map((value, index) => {
					const name = listType + '-' + index;
					
					return (
						<Input 
							key={name} 
							name={name} 
							value={value} 
							index={index}
							schema={schema}
							last={index === state.length - 1}
							handleChange={handleChange} 
							handleRemove={handleRemove}
							handleMove={handleMove}
							fullWidth={fullWidth}
						/>
					);
				})}
				<Button 
					color='info' 
					type='button' 
					onClick={addInput}
					variant='contained' 
					sx={{ marginTop: '.5rem', marginBottom: '1.5rem', marginRight: '8%', float: 'right'}}
				>
					<AddIcon />
				</Button>
				{error 
					? <Typography color='#d32f2f' sx={{margin: '.5rem'}}>{error}</Typography> 
					: undefined } 
			</ul>
		</Card>

	);
}

export default InputList;