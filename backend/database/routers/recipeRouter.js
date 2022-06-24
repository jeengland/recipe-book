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

router.get('/:id', (req, res) => {
	const { id } = req.params;

	db.getRecipeById(id)
		.then(recipe => {
			if (recipe[0]) {
				res.status(200).json({
					data: recipe[0]
				});
			} else {
				res.status(404).json({
					error: `Could not find recipe by id "${id}"`
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
});

router.post('/', (req, res) => {
	const recipe = req.body;

	db.addRecipe(recipe)
		.then(recipe => {
			res.status(200).json({
				data: recipe
			});
		})
		.catch(err => {
			res.status(400).json({
				error: err
			});
		});
});

router.put('/:id', (req, res) => {
	const { id }  = req.params,
		changes = req.body;

	db.getRecipeById(id)
		.then(recipe => {
			console.log(recipe);
			if (recipe[0]) {
				db.updateRecipe(id, changes)
					.then(updatedRecipe => {
						res.status(200).json({
							data: updatedRecipe
						});
					})
					.catch(err => {
						res.status(400).json({
							error: err
						});
					});
			} else {
				res.status(404).json({ error: `Could not find recipe by id "${id}"` });
			}
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	db.removeRecipe(id)
		.then(deleted => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res.status(404).json({ error: `Could not find recipe by id "${id}"` });
			}
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
});

module.exports = router;