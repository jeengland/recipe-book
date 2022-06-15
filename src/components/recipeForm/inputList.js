import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { TextField, InputAdornment, IconButton, Card, CardHeader, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { sentenceCase } from '../../utils/textUtils.js';


const InputWrapper = styled.li`
	color: red;
	list-style-type: none;
`;

Input.propTypes = {
	index: PropTypes.number,
	name: PropTypes.string,
	value: PropTypes.objectOf(
		PropTypes.string
	),
	handleChange: PropTypes.func,
	handleRemove: PropTypes.func,
	fullWidth: PropTypes.bool
};

function Input({ index, name, value, handleChange, handleRemove, fullWidth=false }) {
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
								<IconButton onClick={() => handleRemove(index)}>
									<DeleteIcon/>
								</IconButton>
							</InputAdornment>
						};
					}
					
					return (
						<TextField InputProps={deleteable} fullWidth={fullWidth} key={fieldName} name={fieldName} label={sentenceCase(field)} value={value[field]} onChange={(e) => handleChange(index, field, e)}/>
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

	const handleRemove = (index) => {
		const values = [...state],
			filteredValues = values.filter((value, i) => i != index);

		setState(filteredValues);
	};

	return (
		<Card>
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
							handleChange={handleChange} 
							handleRemove={handleRemove}
							fullWidth={fullWidth}
						/>
					);
				})}
			</ul>
			<IconButton color='info' type='button' onClick={addInput} sx={{paddingTop: 0}}>
				<AddIcon />
			</IconButton>
			{error ? <Typography color='#d32f2f'>{error}</Typography> : undefined } 
		</Card>

	);
}

export default InputList;