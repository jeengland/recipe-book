import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { getHoursMinutes } from '../../utils/timeUtils.js';

const SummarySection = styled.section`
	color: orange;
`;

Summary.propTypes = {
	data: PropTypes.objectOf(
		PropTypes.number
	)
};

function Summary() {
	const { recipes } = useSelector(state => state.recipes);

	const data = JSON.parse(recipes.data[0].summary);

	console.log(data);
	
	const totalTime = (data?.cookTime || 0) + (data?.prepTime || 0) + (data?.additionalTime || 0);

	return (
		<SummarySection>
			{data.prepTime ? <p>Prep time: {getHoursMinutes(data.prepTime)}</p> : undefined}
			{data.cookTime ? <p>Cook time: {getHoursMinutes(data.cookTime)}</p> : undefined}
			{data.additionalTime ? <p>Additional time: {getHoursMinutes(data.additionalTime)}</p> : undefined}
			{totalTime ? <p>Total time: {getHoursMinutes(totalTime)}</p> : undefined}
			{data.servings ? <p>Servings: {data.servings}</p> : undefined}
			{data.preheat ? <p>Preheat Temperature: {data.preheat}°</p> : undefined}
		</SummarySection>
	);
}

export default Summary;