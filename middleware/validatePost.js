module.exports = (req, res, next) => {
	if (!req.body) {
		res.status(404).json({ message: 'Please Provide Credentials' });
	} else {
		next();
	}
};