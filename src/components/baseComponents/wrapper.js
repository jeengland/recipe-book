import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from './header';
import Footer from './footer';

function Wrapper() {
	const pages = [
		{href: '/recipes', text: 'Recipes'},
		{href: '/recipeForm', text: 'Add Recipe'}
	];

	return (
		<Container maxWidth='lg' sx={{minHeight: '90vh', paddingX: '0'}} disableGutters>
			<Header pages={pages}/>
			<Outlet />
			<Footer pages={pages}/>
		</Container>
	);
}

export default Wrapper;