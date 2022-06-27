import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';

import InputList from './inputList.js';
import SummaryForm from './summaryForm.js';
import { uploadRecipe, fetchRecipes } from '../../store/slices/recipesSlice';
import { timeStampToMinutes } from '../../utils/timeUtils';


function RecipeForm() {
	const [name, setName] = useState(''),
		[summary, setSummary] = useState({preheat: 0, prepTime: '0:00', cookTime: '0:00', additionalTime: '0:00', servings: 0}),
		[ingredients, setIngredients] = useState([{amount: '', name: ''}]),
		[directions, setDirections] = useState([{text: ''}]),
		[notes, setNotes] = useState([{text: ''}]),
		[errors, setErrors] = useState({});

	const dispatch = useDispatch(),
		navigate = useNavigate();

	const error = useSelector(state => state.error);
	let isUploading = false;

	useEffect(() => {
		if (error) {
			isUploading = false;
		}
	}, [error]);

	const handleSubmit = (e) => {
		e.preventDefault();

		isUploading = true;

		const newErrors = {};

		let didError = false;

		const bundle = {
			name,
			ingredients,
			summary: {}
		};

		for (let entry in summary) {
			if (typeof summary[entry] === 'string') {
				const value = timeStampToMinutes(summary[entry]);

				if (value) {
					bundle.summary[entry] = value;
				}
			} else {
				const value = summary[entry];
				if (value) {
					bundle.summary[entry];
				}
			}
		}

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
			didError = true
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

		for (let key in bundle) {
			if (typeof bundle[key] !== 'string') {
				bundle[key] = JSON.stringify(bundle[key]);
			}
		}

		dispatch(uploadRecipe(bundle))
			.then((res) => {
				if (res.error) {
					setErrors({general: 'Error deleting, please try again'});
				} else if (res.meta.requestStatus === 'fulfilled') {
					var nextId = res.payload.data[0];
					dispatch(fetchRecipes())
						.then(() => {
							navigate(`/recipe/${nextId}`);
						});

				} else {
					setErrors({general: 'Unknown error, please try again'});
				}
			});
	};

	return (
		<Container sx={{minHeight: '90vh', paddingY: '1rem'}}>
			<Typography variant='h4' as='h2'>Add Recipe</Typography>
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
					onClick={(e) => e.preventDefault}
					color={errors.general ? 'error' : 'primary'}
					disabled={isUploading}
				>
					Submit
				</Button> 
			</form>
		</Container>
	);
}

export default RecipeForm;