var jwt = require('jsonwebtoken');
var users = require("../models/users");
var bcrypt = require("bcryptjs");


var companyRegister = (req, res)=> {
	res.send("Registriraj se kako kompanija");
};

var userRegister = (req, res)=> {
	res.send("Registriraj se kako user");
};

var login = (req, res) => {
    users.getUserByEmail(req.body.email, (err, userData) => {
        bcrypt.compare(req.body.password, userData.password)
        .then((valid) => {
            if(valid) {
                var ud = {
                    uid: userData._id,
                    email: userData.email,
                    name: userData.firstName + ' ' + userData.lastName,
                    role: userData.role
                };
                var token = jwt.sign(ud, 'pero_e_haker');
                return res.send(token);
            } else {
                return res.status(403).send("Unauthorized");
            }
        }).catch((err) => {
            return res.status(500).send("Internal server error");
        })
    });
};

var logout = (req, res)=> {
	res.send(req.user);
};

var getUsersByEmail = (req, res) => {
	var email = req.params.email;
	users.getUsersByEmail((err, data) => {
		if(err){
			res.status(500).send(err);
		} else {
			res.send(data);
		}
	});
};

module.exports = {
	companyRegister,
	userRegister,
	login,
	logout,
	getUsersByEmail
};