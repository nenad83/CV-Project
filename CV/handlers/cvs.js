var cvs = require("../models/cvs");
var validator = require("fastest-validator");
var v = new validator();


var getAllCvs = (req, res) => {
	cvs.getAllCvs((err, data) => {
		if(err) {
			res.status(500).send("Internal server error");
		} else {
			res.send(data);
		}
	});
};

var getCvsByName = (req, res) => {
	var name = req.params.name;
	cvs.getCvsByName(name, (err, data) => {
		if(err){
			res.status(500).send(err);
		}else {
			res.send(data)
		}
	});
}

var deleteCvsById = (req, res) => {
	var id = req.params.id;
	cvs.deleteCvsById = (id, (err) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.send("OK");
		}
	});
};

var createCv = (req, res) => {

	 var schema = {
    	first_name: {type: "string", empty: false},
    	last_name: {type: "string", empty: false},
    	birth_date: {type: "number", empty: false},
    	email: {type: "email", empty: false},
    	password: {type: "string", min: 3, max: 16, empty: false},
    	phone: {type: "string", empty: false},
    	current_residence: {
    		type: "array", items: {
    			type: "object", props: {
	    			country: {type: "string", empty: false},
	    			city: {type: "string", empty: false},
	    			zip_code: {type: "string", empty: false}
    			}
    		}
    	},
    	education: {
    		type: "array", items: {
    			type: "object", props: {
	    			school_name: {type: "string"},
			    	level: {type: "string"},
			    	degree: {type: "string"},
			    	start_at: {type: "date"},
			    	finish_at_name: {type: "date"}
    			}
    		}
    	},
    	work_expiriance: {
    		type: "array", items: {
    			type: "object", props: {
	    			postition: {type: "string"},
			    	job_description: {type: "string"},
			    	tags: {type: "string"},
			    	company: {type: "string"},
			    	start_at: {type: "date"},
			    	finish_at: {type: "string"}
			    }
    		}
    	}
    };


	var cvData = formatDates(req.body);

	if(valid === true) {
	cvs.createCv(req.body, (err) => {
		if(err) {
			res.send(err);
		} else {
			res.status(201).send("User Created");
			}
		})
	} else {
		res.status(400).send(valid);
	}
};


var updateById = (req, res) => {
	var id = req.params.id;
	var userData = req.body;
	cvs.updateById (id, userData, (err) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(201).send("OK")
		}
	})
}


module.exports = {
	getAllCvs,
	deleteCvsById,
	createCv,
	updateById,
	getCvsByName
};