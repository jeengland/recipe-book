exports.up = function(knex) {
	return knex.schema
		.createTable('recipes', tbl => {
			tbl.increments('id').notNullable().unique().index().primary();
			tbl.string('name').notNullable().index();
			tbl.string('summary').notNullable();
			tbl.string('directions').notNullable();
			tbl.string('ingredients').notNullable();
			tbl.string('notes');
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists('sellers');
};