var mongoose = require("mongoose");

var Users = mongoose.model(
	"users",
	new mongoose.Schema({
		     "first_name": String,
    		 "last_name": String,
     		 "birth_date": Number,
    		 "email": String,
     		 "phone": Number,
     		 "current_residence": {
        		 "country": String,
        	 	"city": String,
         		"zip_code": String
     },
    	     "education": [
         {
             "school_name": String,
             "level": String,
             "degree": String,
             "start_at": Number,
             "finish_at": Number
         }
     ]

	})
);


var getAllUsers = (cb) => {
	Users.find({}, (err, data) => {
		if(err) {
			return cb(err, null);
		} else {
			return cb(null, data)
		};
	});
};

var deleteUserById = (id, cb) => {
	Users.deleteOne({_id: id}, (err, data) => {
		if(err) {
			return cb(err, null);
		} else {
			return cb(null, data)
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
	})
}


module.exports = {
	getAllUsers,
	deleteUserById,
	createUser
}