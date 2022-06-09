import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import Ingredients from './ingredients.js';
import Directions from './directions.js';
import Summary from './summary.js';
import Notes from './notes.js';

const RecipeDiv = styled.div`
	color: pink;
`;

function Recipe() {
	const { recipes } = useSelector(state => state.recipes);
	
	const name= recipes.data[0].name;
	
	return (<RecipeDiv>
		<h2>{name}</h2>
		<Summary />
		<Ingredients />
		<Directions />
		<Notes />
	</RecipeDiv>
	);
}

export default Recipe;
