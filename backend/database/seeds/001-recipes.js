exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('recipes').del()
		.then(function () {
		// Inserts seed entries
			return knex('recipes').insert([
				{
					name: 'Farro Salad with Asparagus and Parmesan',
					summary: '{"prepTime":20,"cookTime":55,"additionalTime":720,"servings":12}',
					directions: '["Soak farro in a large bowl of water for at least 12 hours. Drain.","Fill a large pot with lightly salted water and bring to a rolling boil over high heat. Once the water is boiling, stir in the drained farro, and return to a boil. Reduce heat to medium, then cook the farro uncovered, stirring occasionally for 20 minutes. Reduce heat to low, cover, and continue simmering until tender, about 30 more minutes. Drain and allow to cool.","Bring a large pot of lightly salted water to a boil. Add the asparagus, and cook uncovered until tender, about 3 minutes. Drain in a colander, then immediately immerse in ice water for several minutes until cold to stop the cooking process. Once the asparagus is cold, drain well, and chop. Set aside.","Place farro, asparagus, tomatoes, walnuts, cranberries, parsley, and chives in a large bowl. Drizzle the balsamic vinaigrette over and sprinkle about 3/4 cups Parmesan cheese, then toss. Top with the remaining 1/4 cup of Parmesan cheese. Serve at room temperature."]',
					ingredients: '[{"name":"farro","amount":"2 cups"},{"name":"asparagus","amount":"3/4 pound","prep":"trimmed"},{"name":"cherry tomatoes","amount":"1 cup","prep":"halved"},{"name":"walnuts","amount":"3/4 cup","prep":"chopped"},{"name":"dried cranberries","amount":"1/2 cup"},{"name":"fresh parsley","amount":"1/2 cup","prep":"chopped"},{"name":"fresh chives","amount":"1/3 cup","prep":"chopped"},{"name":"balsamic vinaigrette","amount":"1/4 cup"},{"name":"parmesan cheese","amount":"1 cup","prep":"shaved"}]',
					notes: '["If you can\'t find farro, look for spelt or wheat berries, which are available in the health food section of some markets."]'
				}
			]);
		});
};