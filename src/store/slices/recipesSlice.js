import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/index.js';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', () => {
	return api.get('/api/recipes')
		.then(res => {
			const newRecipes = {};

			for (let i in res.data.data) {
				let recipe = res.data.data[i];

				newRecipes[recipe.id] = recipe;
			}

			return newRecipes;
		});
});

export const uploadRecipe = createAsyncThunk('recipes/uploadRecipe', (recipe) => {
	return api.post('/api/recipes', recipe)
		.then(res => res.data);
});

export const deleteRecipe = createAsyncThunk('recipes/deleteRecipe', (id) => {
	return api.delete(`/api/recipes/${id}`);
});

export const updateRecipe = createAsyncThunk('recipes/updateRecipe', ({changes, id}) => {
	return api.put(`/api/recipes/${id}`, changes);
});

const slice = createSlice({
	name: 'recipes',
	initialState: {
		recipes: [],
		uploadedRecipe: '',
		isLoading: false,
		isUploading: false,
		isDeleting: false,
		error: false
	},
	extraReducers: builder => {
		builder.addCase(fetchRecipes.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(fetchRecipes.fulfilled, (state, action) => {
			state.isLoading = false;
			state.recipes = action.payload;
			state.error = '';
		});
		builder.addCase(fetchRecipes.rejected, (state, action) => {
			state.isLoading = false;
			state.users = {};
			state.error = action.error.message;
		});
		builder.addCase(uploadRecipe.pending, state => {
			state.isUploading = true;
		});
		builder.addCase(uploadRecipe.fulfilled, (state, action) => {
			state.isUploading = false;
			state.uploadedRecipe = action.payload;
			state.error = '';
		});
		builder.addCase(uploadRecipe.rejected, (state, action) => {
			state.isUploading = false;
			state.error = action.error.message;
		});
		builder.addCase(deleteRecipe.pending, state => {
			state.isDeleting = true;
		});
		builder.addCase(deleteRecipe.fulfilled, state => {
			state.isDeleting = false;
			state.error = '';
		});
		builder.addCase(deleteRecipe.rejected, (state, action) => {
			state.isDeleting = false;
			state.error = action.payload.message;
		});
		builder.addCase(updateRecipe.pending, state => {
			state.isUploading = true;
		});
		builder.addCase(updateRecipe.fulfilled, state => {
			state.isUploading = false;
			state.error = '';
		});
		builder.addCase(updateRecipe.rejected, (state, action) => {
			state.isUploading = false;
			state.error = action.error.message;
		});
	}
});

export default slice.reducer;