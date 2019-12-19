module.exports = (req, res, next) => {

	if (req.session && req.session.user) { 
	  next(); 
	}else {
	  res.status(401).json({ message: 'Provide Valid Credentials' });
	}
  };



// const bcrypt = require('bcryptjs');

// const userDb = require('../models/authDb');

// module.exports = function(req, res, next) {
// 	const { username, password } = req.headers;

// 	if (username && password) 
// 	// (req.session && req.session.user) { next(); }
// 	{
// 		userDb
// 			.getBy({ username })
// 			.first()
// 			.then(user => {
// 				if (user && bcrypt.compareSync(password, user.password)) {
// 					next();
// 				} else {
// 					res.status(401).json({ message: 'Wrong Credentials' });
// 				}
// 			})
// 			.catch(err => {
// 				res.status(500).json(err);
// 			});
// 	} else {
// 		res.status(400).json({ message: 'Provide Valid Credentials' });
// 		// res.status(401).json({message: 'You Shall Not Pass!'})
// 	}
// };