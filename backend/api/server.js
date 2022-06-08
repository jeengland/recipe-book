const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const recipeRouter = require('../database/routers/recipeRouter.js');

const server = express();

// @ts-ignore
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/recipes', recipeRouter);

server.get('/', (req, res) => {
	res.status(200).json({ api: 'up' });
});

module.exports = server;