import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from './header';
import Footer from './footer';

function Wrapper() {
	const pages = [
		{href: '/recipe', text: 'Recipe'},
		{href: '/recipeForm', text: 'Recipe Form'}
	];

	return (
		<Container maxWidth='md'>
			<Header pages={pages}/>
			<Outlet />
			<Footer pages={pages}/>
		</Container>
	);
}

export default Wrapper;