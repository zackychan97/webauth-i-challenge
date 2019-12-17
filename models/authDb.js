const db = require('../data/dbConfig.js');
module.exports = {
	get,
	getBy,
    add,
    findById
};

function get() {
	return db('users').select("id", "username");
}

function getBy(username) {
	return db('users')
		.select('id', 'username', 'password') 
		.where(username);
}

function add(user) {
	return db('users')
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
		
}

function findById(id) {
    return db("users")
      .select("id", "username")
      .where({ id })
      .first();
  }