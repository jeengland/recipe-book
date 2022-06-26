import { combineReducers, configureStore } from '@reduxjs/toolkit';

import recipes from './slices/recipesSlice.js';

const reducer = combineReducers({
	recipes
});

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['recipes/updateRecipe/fulfilled', 'recipes/deleteRecipe/fulfilled'],
			},
		}),
});

export default store;