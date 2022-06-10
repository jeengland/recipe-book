import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

const NotesSection = styled.section`
	color: goldenrod;
`;

function Notes() {
	const { recipes } = useSelector(state => state.recipes);

	const notes = JSON.parse(recipes.data[0].notes);

	if (notes.length === 0) {
		return undefined;
	}
	
	return (
		<NotesSection>
			<h3>Notes</h3>
			{notes.length === 1 
				? <p>{notes[0]}</p> : 
				<ul>
					{notes.map((note, i) => <li key={'note' + i}>{note}</li>)}
				</ul>
			}
		</NotesSection>
	);
}

export default Notes;

