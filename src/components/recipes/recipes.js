import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/system';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { AccessTime } from '@mui/icons-material';

import { getHoursMinutes } from '../../utils/timeUtils';


RecipeCard.propTypes = {
	recipe: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		])
	)
};

function RecipeCard({ recipe }) {
	let navigate = useNavigate();

	const summary = JSON.parse(recipe.summary);

	const activeTime = (summary?.cookTime || 0) + (summary?.prepTime || 0);

	const handleClick = () => {
		navigate(`/recipe/${recipe.id}`);
	};

	return (
		<Card onClick={handleClick} sx={{ 
			maxWidth: '30%', 
			maxHeight: '20vh', 
			margin: '1rem', 
			display: 'flex', 
			flexDirection: 'column',
			justifyContent: 'space-between'
		}}>
			<CardHeader titleTypographyProps={{variant: 'h6'}} title={recipe.name}/>
			<CardContent sx={{
				display: 'flex',
				alignItems: 'center',
				flexWrap: 'wrap',
				justifySelf: 'flex-end'
			}}>
				<AccessTime /> 
				<Typography sx={{ ml: '.2rem' }}>{getHoursMinutes(activeTime)}</Typography>
			</CardContent>
		</Card>
	);
}

function Recipes() {
	const { recipes } = useSelector(state => state.recipes),
		[recipeData, setRecipeData] = useState([]);

	useEffect(() => {
		var newRecipeData = [];
		for (let id in recipes) {
			newRecipeData.push(recipes[id]);
		}
		setRecipeData(newRecipeData);
	}, [recipes]);
	
	return (
		<>
			<Typography variant='h4' as='h2' sx={{flex: '0 0 100%', padding: '1rem', paddingLeft: '1.5rem'}}>Recipes</Typography>
			<Container sx={{
				minHeight: '90vh', 
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap'
			}}>
				{recipeData.map(recipe => {
					return (<RecipeCard key={recipe.id} recipe={recipe}/>);
				})}
			</Container>
		</>
	);
}

export default Recipes;
