import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Ingredients from './ingredients.js';
import Directions from './directions.js';
import Summary from './summary.js';
import Notes from './notes.js';

const RecipeDiv = styled.div`
	color: pink;
`;

Recipe.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	])
};

function Recipe({data}) {
	return (<RecipeDiv>
		<h2>{data.name}</h2>
		<Summary data={data.summary}/>
		<Ingredients ingredients={data.ingredients}/>
		<Directions directions={data.directions}/>
		<Notes notes={data.notes} />
	</RecipeDiv>
	);
}

export default Recipe;
