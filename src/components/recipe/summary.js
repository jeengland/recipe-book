import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, Typography } from '@mui/material';

import { getHoursMinutes } from '../../utils/timeUtils.js';

Summary.propTypes = {
	id: PropTypes.string
};

function Summary({ id }) {
	const { recipes } = useSelector(state => state.recipes);

	const data = JSON.parse(recipes[id].summary);

	console.log(data);

	const totalTime = (data?.cookTime || 0) + (data?.prepTime || 0) + (data?.additionalTime || 0);

	return (
		<Card sx={{p: '.5rem'}}>
			<CardHeader title='Recipe Summary'/>
			<CardContent fontSize='large' sx={{pt: '.2rem', pl: '2.5rem'}}>
				{data.prepTime ? <Typography fontSize='large' sx={{py: '.3rem'}}>Prep time: {getHoursMinutes(data.prepTime)}</Typography> : undefined}
				{data.cookTime ? <Typography fontSize='large' sx={{py: '.3rem'}}>Cook time: {getHoursMinutes(data.cookTime)}</Typography> : undefined}
				{data.additionalTime ? <Typography fontSize='large' sx={{py: '.3rem'}}>Additional time: {getHoursMinutes(data.additionalTime)}</Typography> : undefined}
				{totalTime ? <Typography fontSize='large' sx={{py: '.3rem'}}>Total time: {getHoursMinutes(totalTime)}</Typography> : undefined}
				{data.servings ? <Typography fontSize='large' sx={{py: '.3rem'}}>Servings: {data.servings}</Typography> : undefined}
				{data.preheat ? <Typography fontSize='large' sx={{py: '.3rem'}}>Preheat Temperature: {data.preheat}°</Typography> : undefined}
			</CardContent>
		</Card>
	);
}

export default Summary;