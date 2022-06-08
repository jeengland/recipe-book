const knex = require('knex');
const config = require('../knexfile.js');

// @ts-ignore
module.exports = knex(config.development);