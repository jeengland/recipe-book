import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Recipe from './components/recipe.js';

import { fetchRecipes } from './store/slices/recipesSlice.js';

function getData() {
	return fetch('http://localhost:3000/api/recipes')
		.then(data => data.json());
}

function App() {
	const { recipes, isLoading } = useSelector(state => state.recipes);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	if (isLoading) {
		return (
			<h1>Loading</h1>
		);
	}

	return (<div>
		<Recipe data={JSON.parse(recipes.data[0].data)}/>
	</div>);
}

export default App;
