const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

// Require router
const authRouter = require('../auth/authRouter');
const knex = require('../data/dbConfig');

const server = express();

const sessionConfig = {
	name: 'monkey',
	secret: 'secret monkey indeed',
	saveUninitialized: true, // Laws against setting cookies automatically
	reSave: false,

	store: new KnexSessionStore({
		knex,
		createtable: true,
		clearInterval: 1000 * 60 * 10,
		sidfieldname: 'sid',

		//optional
		tablename: 'sessions'
	}),

	cookie: {
		maxAge: 1000 * 60 * 10,
		secure: false, //ok during development , TRUE in production
		httpOnly: true
	}
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfig));

// Call authRouter
server.use('/api', authRouter);
server.use('/api/users', authRouter);

// Global test endpoint
server.get('/', (req, res) => {
	res.send(`<h3>Let's Get into this App!</h3>`);
});

module.exports = server;