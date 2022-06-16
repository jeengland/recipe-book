import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, Checkbox, Typography } from '@mui/material';

const IngredientItem = styled.li`
    list-style-type: none;
`;

Ingredient.propTypes = {
	amount: PropTypes.string,
	name: PropTypes.string
};

function Ingredient({ amount, name }) {
	return(
		<IngredientItem>
			<Typography><Checkbox size='small'/>{amount} {name}</Typography>
		</IngredientItem>
	);
}

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
		<Card sx={{p: '.5rem', mt: '2rem', pb: '0'}}>
			<CardHeader title='Ingredients' sx={{ pb: '.2rem'}}/>
			<CardContent sx={{pt: '0', pl: '0' }}>
				<ul>
					{ingredients.map((ingredient, i) => {
						return <Ingredient key={'ingredient' + i} {...ingredient}/>;
					})}
				</ul>
			</CardContent>
		</Card>
	);
}

export default Ingredients;