import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Typography } from '@mui/material';

import EggAltIcon from '@mui/icons-material/EggAlt';

Header.propTypes = {
	pages: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.string
		)
	)
};

function Header({ pages }) {
	let navigate = useNavigate();

	return (
		<AppBar position='static' sx={{display: 'flex', flexDirection: 'row', padding: '1rem'}}>
			<EggAltIcon fontSize='large' sx={{marginX: '1rem'}} onClick={() => navigate('/')}/>
			<Box component='nav'>
				{pages.map(page => {
					return (
						<Button variant='text' sx={{color: 'white'}} key={`header-link-${page.text}`} component={Link} to={page.href}>
							<Typography>
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

export default Header;
