const router = require('express').Router();
const db = require('../models/recipes.js');

router.get('/', (req, res) => {
	db.getAllRecipes()
		.then(recipes => {
			res.status(200).json({
				data: recipes
			});
		})
		.catch(err => {
			res.status(400).json({
				error: err
			});
		});
});

module.exports = router;