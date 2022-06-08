exports.up = function(knex) {
	return knex.schema
		.createTable('recipes', tbl => {
			tbl.string('id').notNullable().unique().index().primary();
			tbl.string('data').notNullable().unique().index();
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists('sellers');
};