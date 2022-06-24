import React from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Card, CardContent, CardHeader, List, ListItem, Typography } from '@mui/material';

Notes.propTypes = {
	id: PropTypes.string
};

function Notes({ id }) {
	const { recipes } = useSelector(state => state.recipes);

	const notes = JSON.parse(recipes[id].notes);

	if (notes.length === 0) {
		return undefined;
	}
	
	return (
		<Card sx={{p: '.5rem', mt: '2rem', pb: '0'}}>
			<CardHeader title='Notes' sx={{ pb: '.2rem'}}/>
			<CardContent sx={{pt: '.2rem', pl: '1.5rem'}}>
				<List>
					{notes.map((note, i) => {
						return (
							<ListItem key={'note' + i} sx={{ listStyle: 'disc', py: '0' }}>
								<Typography fontSize='large'>
									<Typography as='span' fontSize='26px' sx={{display: 'inline'}}>•</Typography> {note}
								</Typography>
							</ListItem>
						);
					})}
				</List>
			</CardContent>	
		</Card>
	);
}

export default Notes;

