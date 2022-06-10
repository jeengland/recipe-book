import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
	color: grey;
`;

function Header() {
	return (
		<HeaderWrapper>
			<nav>
				<Link to='/recipe'>Recipe</Link>
				<Link to='/recipeForm'>Recipe Form</Link>
			</nav>
		</HeaderWrapper>
	);
}

export default Header;
