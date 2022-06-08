import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const NotesSection = styled.section`
	color: goldenrod;
`;

Notes.propTypes = {
	notes: PropTypes.arrayOf(
		PropTypes.string
	)
};

function Notes({ notes }) {
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

