import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';

import InputList from './inputList.js';
import SummaryForm from './summaryForm.js';
import { minutesToTimeStamp, timeStampToMinutes } from '../../utils/timeUtils';
import { fetchRecipes, updateRecipe, deleteRecipe } from '../../store/slices/recipesSlice';

function EditForm() {
	const { recipes } = useSelector(state => state.recipes),
		{ id } = useParams(),
		recipeData = recipes[id];

	if (!recipeData) {
		return;
	}

	const summaryData = JSON.parse(recipeData.summary, (key, value) => {
		switch(key) {
		case 'prepTime':
		case 'cookTime':
		case 'additionalTime':
			return minutesToTimeStamp(value);
		default:
			return value;
		}
	});
	
	const directionsData = [];
	JSON.parse(recipeData.directions).forEach(direction => directionsData.push({'text': direction}));

	const notesData = [];
	JSON.parse(recipeData.notes).forEach(note => notesData.push({'text': note}));

	const [name, setName] = useState(recipeData.name),
		[summary, setSummary] = useState({
			preheat: summaryData.preheat || 0, 
			prepTime: summaryData.prepTime || '0:00', 
			cookTime: summaryData.cookTime || '0:00', 
			additionalTime: summaryData.additionalTime || '0:00', 
			servings: summaryData.servings || 0
		}),
		[ingredients, setIngredients] = useState(JSON.parse(recipeData.ingredients)),
		[directions, setDirections] = useState(directionsData),
		[notes, setNotes] = useState(notesData),
		[errors, setErrors] = useState({});

	const dispatch = useDispatch(),
		navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

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

		for (let key in bundle) {
			if (typeof bundle[key] !== 'string') {
				bundle[key] = JSON.stringify(bundle[key]);
			}
		}

		dispatch(updateRecipe({changes: bundle, id}))
			.then((res) => {
				if (res.error) {
					setErrors({general: 'Error uploading, please try again'});
				} else if (res.meta.requestStatus === 'fulfilled') {
					dispatch(fetchRecipes())
						.then(() => navigate(`/recipe/${id}/`));
				} else {
					setErrors({general: 'Unknown error, please try again'});
				}
			});
	};

	const handleDelete = () => {
		dispatch(deleteRecipe(id))
			.then((res) => {
				if (res.error) {
					setErrors({general: 'Error deleting, please try again'});
				} else if (res.meta.requestStatus === 'fulfilled') {
					dispatch(fetchRecipes())
						.then(() => navigate('/recipes'));
				} else {
					setErrors({general: 'Unknown error, please try again'});
				}
			});
	};

	return (
		<Container sx={{minHeight: '90vh', paddingY: '1rem'}}>
			<Typography variant='h4' as='h2'>Edit Recipe</Typography>
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
				<Button 
					size='large'
					type='button'
					variant='contained'
					color='error'
					sx={{ml: '1rem'}}
					onClick={handleDelete}
				>
					Delete
				</Button>
			</form>
		</Container>
	);
}

export default EditForm;