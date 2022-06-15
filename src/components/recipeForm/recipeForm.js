import React, { useState } from 'react';
import styled from '@emotion/styled';
import InputList from './inputList.js';
import SummaryForm from './summaryForm.js';

const RecipeFormWrapper = styled.form`
	color: pink;
`;

function RecipeForm() {
	const [name, setName] = useState(''),
		[summary, setSummary] = useState({prepTime: '0:00', cookTime: '0:00', additionalTime: '0:00', servings: 0}),
		[ingredients, setIngredients] = useState([{amount: '', name: ''}]),
		[directions, setDirections] = useState([{text: ''}]),
		[notes, setNotes] = useState([{text: ''}]),
		[errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();

		const newErrors = {};

		let didError = false;

		const bundle = {
			name,
			summary,
			ingredients
		};

		bundle.directions = directions.map(direction => direction.text).filter(direction => direction.length > 0);
		bundle.notes = notes.map(note => note.text).filter(note => note.length > 0);

		if (!bundle.name) {
			newErrors.name = 'Name cannot be blank';
			didError = true;
		}

		if (bundle.ingredients.length === 0) {
			newErrors.ingredients = 'Recipes must have at least one ingredient';
			didError = true;
		}

		if (bundle.ingredients.filter(ingredient => ingredient.name === '' || ingredient.amount === '').length > 0) {
			newErrors.ingredients = 'All ingredients must have both a name and amount';
			didError = true;
		}

		if (bundle.directions.length === 0 || bundle.directions.length === 1 && !bundle.directions[0]) {
			newErrors.directions = 'Recipe must include at least one step';
			didError = true;
		}

		if (didError) {
			newErrors.general = 'There are errors that require your attention!';

			setErrors(newErrors);
			return;
		}

		console.log('submit', bundle);
	};

	return (
		<>
			<RecipeFormWrapper onSubmit={handleSubmit}>
				{errors.name ? <p>{errors.name}</p> : undefined } 
				<label htmlFor='name'>Name</label>
				<input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)}></input>
				<SummaryForm state={summary} setState={setSummary} />
				<InputList listType='ingredients' state={ingredients} setState={setIngredients} schema={{amount: '', name: ''}} error={errors.ingredients}/>
				<InputList listType='directions' state={directions} setState={setDirections} schema={{text: ''}} error={errors.directions}/>
				<InputList listType='notes' state={notes} setState={setNotes} schema={{text: ''}}/>
				<button type='submit'>Submit</button> 
				{errors.general ? <p>{errors.general}</p> : undefined}
			</RecipeFormWrapper>
		</>
	);
}

export default RecipeForm;