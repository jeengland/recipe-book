import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../api/index.js';

const slice = createSlice({
	name: 'recipes',
	initialState: {
		recipes: [],
		isLoading: false,
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
			state.recipes = action.payload;
			state.isLoading = false;
		}
	}
});

export default slice.reducer;

const { recipesSuccess, startLoading, hasError } = slice.actions;

export const fetchRecipes = () => async dispatch => {
	dispatch(startLoading());
	try {
		await api.get('/api/recipes')
			.then(res => dispatch(recipesSuccess(res.data)));
	} catch (err) {
		dispatch(hasError(err.message));
	}
};
