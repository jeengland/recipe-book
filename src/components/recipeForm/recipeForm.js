import React, { useState } from 'react';
import styled from '@emotion/styled';
import InputList from './inputList.js';
import SummaryForm from './summaryForm.js';

const RecipeFormWrapper = styled.form`
	color: pink;
`;

function RecipeForm() {
	const [summary, setSummary] = useState({prepTime: 0, cookTime: 0, additionalTime: 0, servings: 0});
	const [ingredients, setIngredients] = useState([{amount: '', name: ''}]);
	const [directions, setDirections] = useState([{text: ''}]);
	const [notes, setNotes] = useState([{text: ''}]);

	return (
		<RecipeFormWrapper>
			<SummaryForm state={summary} setState={setSummary} />
			<InputList listType='ingredients' state={ingredients} setState={setIngredients} schema={{amount: '', name: ''}}/>
			<InputList listType='directions' state={directions} setState={setDirections} schema={{text: ''}}/>
			<InputList listType='notes' state={notes} setState={setNotes} schema={{text: ''}}/>
		</RecipeFormWrapper>
	);
}

export default RecipeForm;