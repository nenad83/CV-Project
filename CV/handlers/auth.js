var jwt = require('jsonwebtoken');
var users = require("../models/users");
var bcrypt = require("bcryptjs");
let validator = require("fastest-validator");


var companyRegister = (req, res)=> {
	res.send("Registriraj se kako kompanija");
};

var userRegister = (req, res)=> {
	res.send("Registriraj se kako user");
};

var login = (req, res) => {
    var schema = {
        email: {type: "email", empty: false},
        password: {type: "string", empty: false, min: 3, max: 16}
    }
    var v = new validator();
    let valid = v.validate(req.body, schema);

    if(valid === true) {
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

    }else {
        res.status(400).send(valid);
    }
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