const db = require('../dbConfig');

module.exports = {
	getAllRecipes,
	getRecipeById,
	addRecipe,
	updateRecipe,
	removeRecipe
};

function getAllRecipes() {
	return db('recipes');
}

function getRecipeById(id) {
	return db('recipes').where({ id });
}

function addRecipe(recipe) {
	return db('recipes').insert(recipe, 'id');
}

function updateRecipe(id, changes) {
	return db('recipes').where({ id }).update(changes);
}

function removeRecipe(id) {
	return db('recipes').where({ id }).del();
}