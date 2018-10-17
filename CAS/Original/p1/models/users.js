var mongoose = require("mongoose");

var Users = mongoose.model(
    'users', 
    new mongoose.Schema({
        "firstname" : String, 
        "lastname" : String, 
        "email" : String, 
        "password": String,
        "role": String,
        "location" : {
            "country" : String, 
            "city" : String, 
            "municipality" : String
        }
    })
);

var getAllUsers = (cb) => {
    Users.find({}, {password: -1}, (err, data) => {
        if(err){
            return cb(err, null);
        } else {
            return cb(null, data);
        }
    });
};

var getUsersByName = (name, cb) => {
    Users.find({firstname: name}, (err, data) => {
        if(err){
            return cb(err, null);
        } else {
            return cb(null, data);
        }
    });
};

var getUserByEmail = (email, cb) => {
    Users.findOne({email: email}, {password: 1, role: 1, firstname: 1, lastname: 1, email: 1}, (err, data) => {
        if(err){
            return cb(err, null);
        } else {
            return cb(null, data);
        }
    });
};

var getUsersByEmail = (email, cb) => {
    Users.find({email: email}, (err, data) => {
        if(err){
            return cb(err, null);
        } else {
            return cb(null, data);
        }
    });
};

var getUserById = (id, cb) => {
    Users.findById(id, (err, data) => {
        if(err){
            return cb(err, null);
        } else {
            return cb(null, data);
        }
    });
};

var createUser = (userData, cb) => {
    var user = new Users(userData);
    user.save((err, data) => {
        if(err) {
            return cb(err);
        } else {
            return cb(null);
        }
    });
}

var deleteById = (id, cb) => {
    Users.deleteOne({_id: id}, (err) => {
        if (err) {
            return cb(err);
        } else {
            return cb(null);
        }
    });
}

var updateById = (id, data, cb) => {
    Users.updateOne({_id: id}, data, (err) => {
        if (err) {
            return cb(err);
        } else {
            return cb(null);
        }
    });
}

module.exports = {
    getAllUsers,
    getUsersByName,
    getUserById,
    createUser,
    deleteById,
    updateById,
    getUserByEmail,
    getUsersByEmail
};
