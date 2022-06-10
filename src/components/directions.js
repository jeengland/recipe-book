import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const DirectionItem = styled.li`
	color: purple;
`;

Direction.propTypes = {
	direction: PropTypes.string
};

function Direction({direction}) {
	return (
		<DirectionItem>
			{direction}
		</DirectionItem>
	);
}

const DirectionsSection = styled.section`
	color: red;
`;

Directions.propTypes = {
	directions: PropTypes.arrayOf(
		PropTypes.string
	)
};

function Directions() {
	const { recipes } = useSelector(state => state.recipes);

	const directions = JSON.parse(recipes.data[0].directions);

	return(
		<DirectionsSection>
			<h3>Directions</h3	>
			<ol>
				{directions.map((direction, i) => {
					return <Direction key={'direction' + i} direction={direction}/>;
				})}
			</ol>
		</DirectionsSection>
	);
}

export default Directions;