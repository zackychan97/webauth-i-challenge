const express = require('express');
const bcrypt = require('bcryptjs');

const userDb = require('../models/authDb');
const restricted = require('../middleware/restricted');

const router = express.Router();

// Register--------------------------------------------
router.post('/register', (req, res) => {
	let user = req.body;

	const hash = bcrypt.hashSync(user.password, 8);

	user.password = hash;

	userDb
		.add(user)
		.then(stored => {
			res.status(200).json(stored);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// Login-------------------------------------------------
router.post('/login', (req, res) => {
	let { username, password } = req.body;

	// check that the password

	userDb
		.getBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				req.session.user = user;
				res.status(200).json({ message: `Welcome ${user.username}!` });
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

// Logout---------------------------------------------------
router.get('/logout', (req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				res.json({
					message:
						'you can checkout any time you like, but you can never leave.'
				});
			} else {
				res.status(200).json({ message: 'You have logged out.' });
			}
		});
	} else {
		res.status(200).json({ message: 'You were never here.' });
	}
});

// Global GET with restricted middleware------------------------------
router.get('/restricted/users', restricted, (req, res) => {
	userDb
		.get()
		.then(found => {
			res.status(200).json(found);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;