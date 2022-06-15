import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { AppBar, Box, Button, Typography } from '@mui/material';

Footer.propTypes = {
	pages: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.string
		)
	)
};

function Footer({ pages }) {
	return (
		<AppBar position='static' sx={{display: 'flex', flexDirection: 'row', paddingX: '1.5rem', paddingY: '1rem', marginTop: 'calc(5% + 60px)', bottom: 0}}>
			<Box component='footer'>
				{pages.map(page => {
					return (
						<Button sx={{color: 'white'}} variant='text' key={`header-link-${page.text}`} component={Link} to={page.href}>
							<Typography fontSize='sm'>
								{page.text}
							</Typography>
						</Button>
					);
				}
				)}
			</Box>
		</AppBar>
	);
}

export default Footer;
