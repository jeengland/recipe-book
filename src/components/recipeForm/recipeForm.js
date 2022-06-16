import React, { useState } from 'react';

import { Container } from '@mui/system';

import InputList from './inputList.js';
import SummaryForm from './summaryForm.js';
import { Button, TextField, Typography } from '@mui/material';


function RecipeForm() {
	const [name, setName] = useState(''),
		[summary, setSummary] = useState({preheat: 0, prepTime: '0:00', cookTime: '0:00', additionalTime: '0:00', servings: 0}),
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

		// #TODO: Add real submit lol
		console.log('submit', bundle);
	};

	return (
		<Container sx={{minHeight: '90vh', paddingY: '1rem'}}>
			<form onSubmit={handleSubmit}>
				<TextField 
					fullWidth value={name} 
					onChange={(e) => setName(e.target.value)} 
					id='name' 
					label='Recipe Name' 
					variant='filled' 
					error={!!errors.name} 
					helperText={errors.name || ' '}
					InputProps={{ style: { fontSize: 24 } }}
					InputLabelProps={{ style: { fontSize: 18 }}}
					sx={{ marginTop: '2rem'}}
				/>
				<SummaryForm state={summary} setState={setSummary} />
				<InputList 
					listType='ingredients' 
					state={ingredients} 
					setState={setIngredients} 
					schema={{amount: '', name: ''}}
					error={errors.ingredients}
					blurb='Amounts and names of all ingredients needed'
				/>
				<InputList 
					listType='directions' 
					state={directions} 
					setState={setDirections} 
					schema={{text: ''}} 
					error={errors.directions} 
					blurb='Everything needed to ensure a successful meal'
					fullWidth
				/>
				<InputList 
					listType='notes' 
					state={notes} 
					setState={setNotes} 
					schema={{text: ''}} 
					blurb='Anything else worth noting'
					fullWidth
				/>
				<Typography color='#d32f2f' sx={{marginY: errors.general ? '.5rem' : '3rem'}}>
					{errors.general ? errors.general : ' '}
				</Typography>
				<Button 
					size='large' 
					type='submit' 
					variant='contained' 
					color={errors.general ? 'error' : 'primary'}
				>
					Submit
				</Button> 
			</form>
		</Container>
	);
}

export default RecipeForm;