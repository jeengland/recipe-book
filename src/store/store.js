import { combineReducers, configureStore } from '@reduxjs/toolkit';

import recipes from './slices/recipesSlice.js';

const reducer = combineReducers({
	recipes
});

const store = configureStore({
	reducer
});

export default store;