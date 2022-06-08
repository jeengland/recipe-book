module.exports = {
	development: {
		client: 'sqlite3',
		useNullAsDefault: true, // needed for sqlite
		connection: {
			filename: './database/recipes.db3',
		},
		migrations: {
			directory: './database/migrations'
		},
		seeds: {
			directory: './database/seeds'
		}
	},
};