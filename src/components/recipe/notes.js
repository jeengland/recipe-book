import React from 'react';
import { useSelector } from 'react-redux';

import { Card, CardContent, CardHeader, List, ListItem, Typography } from '@mui/material';

function Notes() {
	const { recipes } = useSelector(state => state.recipes);

	const notes = JSON.parse(recipes.data[0].notes);

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
							<ListItem key={'note' + i} sx={{ listStyle: 'disc' }}>
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

