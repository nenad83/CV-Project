var users = require("../models/users");
var bcrypt = require("bcryptjs");

var getAllUsers = (req, res)=> {
	users.getAllUsers((err, data)=> {
		if(err){
			res.status(500).send("Internal server error!" + err);
		}else {
			res.send(data);
		}
	});

};


var getUserByName = (req, res) => {
	var name = req.params.name;
	users.getUsersByName(name, (err, data) => {
		if(err){
			res.status(500).send(err);
		}else {
			res.send(data)
		}
	});
}

var createUser = (req, res) => {
	// if(req.body.email == userData.email){
	// 	res.status(400).send("User alredy registered");
	// } else {
	// var emailExists = req.body.email != userData.email;
    var valid = req.body.firstName != undefined && req.body.firstName != ""
                && req.body.lastName != undefined && req.body.lastName != ""
                && req.body.email != undefined && req.body.email != "" 
                // && req.body.email != userData.email
                && req.body.password != undefined && req.body.password != "";
    if(valid) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            var userData = req.body;
            userData.password = hash;
            userData.role = 'user';
            users.createUser(userData, (err) => {
                if(err) {
                    res.send(err);
                } else {
                    res.status(201).send("OK");
              
                }
            });
        });
    } else {
        res.status(400).send('Bad request')
    }
    // }
}

var deleteUser = (req, res) => {
	var name = req.params.name;
	users.deleteUser(req.body, (err) => {
		if(err) {
			res.send(err);
		} else {
			res.status(201).send("OK")
		}
	})
}

var deleteById = (req, res) => {
	users.deleteById (id, (err) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(204).send("OK")
		}
	})
}

var updateById = (req, res) => {
	var id = req.params.id;
	var userData = req.body;
	users.updateById (id, userData, (err) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(201).send("OK")
		}
	})
}

module.exports = {
	getAllUsers,
	getUserByName,
	createUser,
	deleteUser,
	deleteById,
	updateById
};