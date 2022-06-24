import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@mui/system';

import Ingredients from './ingredients.js';
import Directions from './directions.js';
import Summary from './summary.js';
import Notes from './notes.js';
import { Typography } from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';

function Recipe() {
	const { recipes } = useSelector(state => state.recipes),
		{ id } = useParams();

	if (!recipes[id]) {
		return (
			<Navigate to='/recipe/1'/>
		);
	}
	
	const name = recipes[id].name;
	
	return (
		<Container sx={{minHeight: '90vh', paddingY: '1rem'}}>
			<Typography variant='h4' as='h2' sx={{mb: '2rem'}}>{name}</Typography>
			<Summary id={id}/>
			<Ingredients id={id}/>
			<Directions id={id}/>
			<Notes id={id}/>
		</Container>
	);
}

export default Recipe;
