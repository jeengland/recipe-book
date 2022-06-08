const db = require('../dbConfig');

module.exports = {
	getAllRecipes
};

function getAllRecipes() {
	return db('recipes');
}