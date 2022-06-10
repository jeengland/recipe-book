import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
	color: grey;
`;

function Footer() {
	return (
		<FooterWrapper>
			<nav>
				<Link to='/recipe'>Recipe</Link>
				<Link to='/recipeForm'>Recipe Form</Link>
			</nav>
		</FooterWrapper>
	);
}

export default Footer;
