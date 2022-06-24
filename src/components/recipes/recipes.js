import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@mui/system';

import { Typography } from '@mui/material';

function Recipes() {
	const { recipes } = useSelector(state => state.recipes);

	console.log(recipes);
	
	return (
		<Container sx={{minHeight: '90vh', paddingY: '1rem'}}>
			<Typography variant='h4' as='h2' sx={{mb: '2rem'}}>Recipes</Typography>
		</Container>
	);
}

export default Recipes;
