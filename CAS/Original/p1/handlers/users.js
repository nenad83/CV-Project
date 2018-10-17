var users = require("../models/users");
var bcrypt = require("bcryptjs");

var getAllUsers = (req, res) => {
    users.getAllUsers((err, data) => {
        if(err){
            res.status(500).send("Internal server error! " + err);
        } else {
            res.send(data);
        }
    });
};

var getUserByName = (req, res) => {
    var name = req.params.name;
    users.getUsersByName(name, (err, data) => {
        if(err){
            res.status(500).send("Internal server error! " + err);
        } else {
            res.send(data);
        }
    });
}

var getUserById = (req, res) => {
    var id = req.params.id;
    users.getUserById(id, (err, data) => {
        if(err){
            res.status(404).send("Not found");
        } else {
            res.send(data);
        }
    });
}

var createUser = (req, res) => {
    var valid = req.body.firstname != undefined && req.body.firstname != ""
                && req.body.lastname != undefined && req.body.lastname != ""
                && req.body.email != undefined && req.body.email != ""
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
}

var deleteById = (req, res) => {
    var id = req.params.id;
    users.deleteById(id, (err) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(204).send("OK");
        }
    })
}

var updateById = (req, res) => {
    var id = req.params.id;
    var userData = req.body;
    users.updateById(id, userData, (err) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send("OK");
        }
    });
}

module.exports = {
    getAllUsers,
    getUserByName,
    getUserById,
    createUser,
    deleteById,
    updateById
};

