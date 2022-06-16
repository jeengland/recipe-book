
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Recipe from './components/recipe/recipe.js';
import RecipeForm from './components/recipeForm/recipeForm.js';
import Wrapper from './components/baseComponents/wrapper.js';

import { fetchRecipes } from './store/slices/recipesSlice.js';
import { CircularProgress } from '@mui/material';

function App() {
	const { isLoading, recipes } = useSelector(state => state.recipes);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	if (isLoading || recipes.length === 0) {
		return (
			<>
				<CircularProgress />
			</>
		);
	}

	return (
		<Routes>
			<Route path='/' element={<Wrapper/>}>
				<Route path='/' element={<Recipe />}/>
				<Route path='/recipe' element={<Recipe />} />
				<Route path='/recipeForm' element={<RecipeForm />} />
			</Route>
		</Routes>
	);
}

export default App;
