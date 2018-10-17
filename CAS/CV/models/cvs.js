var mongoose = require("mongoose");

var CVS = mongoose.model(
	"cvs",
	new mongoose.Schema({
	    "first_name": String,
		"last_name": String,
 		"birth_date": Number,
		"email": String,
 		"phone": String,
 		"current_residence": {
    		"country": String,
    	 	"city": String,
     		"zip_code": Number
    	},
    	"education": [
	        {
	            "school_name": String,
	            "level": String,
	            "degree": String,
	            "start_at": Date,
	            "finish_at": Date
	        }
    	],
    	"work_expiriance": [
	     	{
	     		"position": String,
	     		"job_description": String,
	     		"tags": [String],
	     		"company": String,
	     		"start_at": Date,
	     		"finish_at": Date
			}
     	]

	})
);


var getAllCvs = (cb) => {
	CVS.find({},{password: -1}, (err, data) => {
		if(err) {
			return cb(err, null);
		} else {
			return cb(null, data)
		};
	});
};

var getCvByEmail = (email, cb) => {
	CVS.find({email: email}, {password: 1, role: 1, first_name: 1, last_name: 1, email: 1}, (err, data) => {
		if(err) {
			return cb(err, null);
		} else {
			return cb(null, data);
		}
	})
};

var getCvsByName = (name, cb) => {
	CVS.find({first_name: name}, (err, data) => {
		if(err) {
			return cb(err, null);
		} else {
			return cb(null, data)
		};
	});
};

var deleteCvsById = (id, cb) => {
	CVS.deleteOne({_id: id}, (err, data) => {
		if(err) {
			return cb(err, null);
		} else {
			return cb(null, data)
		}
	});
};

var createCv = (userData, cb) => {
	var user = new CVS(userData);
	user.save((err, data) => {
		if(err) {
			return cb(err);
		} else {
			return cb(null);
		}
	})
}


var updateById = (id, data, cb) => {
	CVS.updateOne({_id: id}, data, (err) => {
		if(err) {
			return cb(err);
		} else {
			return cb(null);
		}
	})
}

module.exports = {
	getAllCvs,
	deleteCvsById,
	createCv,
	updateById,
	getCvsByName,
	getCvByEmail
};