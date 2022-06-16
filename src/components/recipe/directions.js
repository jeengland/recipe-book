import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, List, ListItem, Typography } from '@mui/material';

Directions.propTypes = {
	directions: PropTypes.arrayOf(
		PropTypes.string
	)
};

function Directions() {
	const { recipes } = useSelector(state => state.recipes);

	const directions = JSON.parse(recipes.data[0].directions);

	return(
		<Card sx={{p: '.5rem', mt: '2rem', pb: '0'}}>
			<CardHeader title='Directions' sx={{ pb: '.2rem'}}/>
			<CardContent sx={{pt: '.2rem', pl: '1.5rem'}}>
				<List>
					{directions.map((direction, i) => {
						return (
							<ListItem key={'direction' + i}>
								<Typography fontSize='large'>
									{i + 1}. {direction}
								</Typography>
							</ListItem>
						);
					})}
				</List>
			</CardContent>	
		</Card>
	);
}

export default Directions;