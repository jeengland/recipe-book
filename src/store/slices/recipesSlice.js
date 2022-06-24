import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index.js';

const slice = createSlice({
	name: 'recipes',
	initialState: {
		recipes: [],
		uploadedRecipe: '',
		isLoading: false,
		isUploading: false,
		error: false
	},
	reducers: {
		startLoading: state => {
			state.isLoading = true;
		},
		hasError: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		recipesSuccess: (state, action) => {
			const newRecipes = {};

			for (let i in action.payload.data) {
				let recipe = action.payload.data[i];
				newRecipes[recipe.id] = recipe;
			}

			state.recipes = newRecipes;
			state.isLoading = false;
		},
		startUploading: (state) => {
			state.isUploading = true;
		},
		uploadSuccess: (state, action) => {
			state.uploadedRecipe = action.payload;
			state.isUploading = false;
		}
	}
});

export default slice.reducer;

const { recipesSuccess, startLoading, startUploading, uploadSuccess, hasError } = slice.actions;

export const fetchRecipes = () => async dispatch => {
	dispatch(startLoading());
	try {
		await api.get('/api/recipes')
			.then(res => dispatch(recipesSuccess(res.data)));
	} catch (err) {
		dispatch(hasError(err.message));
	}
};

export const uploadRecipe = (recipe) => async dispatch => {
	dispatch(startUploading());
	try {
		await api.post('/api/recipes', recipe)
			.then(res => dispatch(uploadSuccess(res.data)))
			.then(fetchRecipes());
	} catch (err) {
		dispatch(hasError(err.message));
	}
};