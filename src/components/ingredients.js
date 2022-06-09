import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const IngredientItem = styled.li`
	color: green;
    list-style-type: none;
`;

Ingredient.propTypes = {
	amount: PropTypes.string,
	name: PropTypes.string
};

function Ingredient({ amount, name }) {
	return(
		<IngredientItem>
			<input type="checkbox" /> {amount} {name}
		</IngredientItem>
	);
}

const IngredientSection = styled.section`
	color: blue;
	ul {
		padding-left: 10px;
	}
`;

Ingredients.propTypes = {
	ingredients: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			amount: PropTypes.string
		})
	)
};

function Ingredients() {
	const { recipes } = useSelector(state => state.recipes);

	const ingredients = JSON.parse(recipes.data[0].ingredients);

	return(
		<IngredientSection>
			<h3>Ingredients</h3	>
			<ul>
				{ingredients.map((ingredient, i) => {
					return <Ingredient key={'ingredient' + i} {...ingredient}/>;
				})}
			</ul>
		</IngredientSection>
	);
}

export default Ingredients;