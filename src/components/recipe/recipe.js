import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@mui/system';

import Ingredients from './ingredients.js';
import Directions from './directions.js';
import Summary from './summary.js';
import Notes from './notes.js';

function Recipe() {
	const { recipes } = useSelector(state => state.recipes);
	
	const name= recipes.data[0].name;
	
	return (
		<Container sx={{minHeight: '90vh', paddingY: '1rem'}}>
			<h2>{name}</h2>
			<Summary />
			<Ingredients />
			<Directions />
			<Notes />
		</Container>
	);
}

export default Recipe;
