
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Recipe from './components/recipe.js';

import { fetchRecipes } from './store/slices/recipesSlice.js';

function App() {
	const { isLoading, recipes } = useSelector(state => state.recipes);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	if (isLoading || recipes.length === 0) {
		return (
			<h1>Loading</h1>
		);
	}

	return (<div>
		<Recipe />
	</div>);
}

export default App;
