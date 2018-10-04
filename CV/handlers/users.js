var users = require("../models/users");


var getAllUsers = (req, res) => {
	users.getAllUsers((err, data) => {
		if(err) {
			res.status(500).send("Internal server error");
		} else {
			res.send(data);
		}
	});
};

var deleteUserById = (req, res) => {
	var id = req.params.id;
	users.deleteUserById = (id, (err) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.send("OK");
		}
	});
};

var createUser = (req, res) => {
	users.createUser(req.body, (err) => {
		if(err) {
			res.send(err);
		} else {
			res.status(201).send("User Created");
		}
	})
}


module.exports = {
	getAllUsers,
	deleteUserById,
	createUser
};