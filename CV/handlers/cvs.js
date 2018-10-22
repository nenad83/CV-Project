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
		    phone: {type: "string", empty: false},
		    current_residence: {type: "object", props: {
		        country: {type: "string", empty: false},
		        city: {type: "string", empty: false},
		        zip_code: {type: "number", positive: true, integer: true, empty: false}
		    }},
		    education: {type: "array", items: {
		        type: "object",
		        props: {
		            school_name: {type: "string", empty: false},
		            level: {type: "string", empty: false},
		            degree: {type: "string", empty: false},
		            start_at: {type: "number", empty: false},
		            finish_at: {type: "number", empty: false}
		        }
		    }},
		    work_experience: {type: "array", items: {
		        type: "object",
		        props: {
		            position: {type: "string"},
		            job_description: {type: "string"},
		            tags: {
		                type: "array",
		                items: {type: "string"}
		            },
		            company: {type: "string"},
		            start_at: {type: "number"},
		            finish_at: {type: "number"}
		        }
		    }}
		};

	let v = new validator();
    var valid = v.validate(req.body, schema); 

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
	var cvData = formatDates(req.body);
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


var formatDates = (cvData) => {
    if(cvData.birth_date != undefined && cvData.birth_date != null){
        cvData.birth_date = new Date(cvData.birth_date);
    }
    if(cvData.education != undefined && cvData.education != null){
        for(var i = 0; i < cvData.education.length; i++){
            if(cvData.education[i].start_at != undefined && cvData.education[i].start_at != null){
                cvData.education[i].start_at = new Date(cvData.education[i].start_at);
            }
            if(cvData.education[i].finish_at != undefined && cvData.education[i].finish_at != null){
                cvData.education[i].finish_at = new Date(cvData.education[i].finish_at);
            }
        }
    }
    if(cvData.work_experience != undefined && cvData.work_experience != null){
        for(var i = 0; i < cvData.work_experience.length; i++){
            if(cvData.work_experience[i].start_at != undefined && cvData.work_experience[i].start_at != null){
                cvData.work_experience[i].start_at = new Date(cvData.work_experience[i].start_at);
            }
            if(cvData.work_experience[i].finish_at != undefined && cvData.work_experience[i].finish_at != null){
                cvData.work_experience[i].finish_at = new Date(cvData.work_experience[i].finish_at);
            }
        }
    }
    return cvData;
}


module.exports = {
	getAllCvs,
	deleteCvsById,
	createCv,
	updateById,
	getCvsByName
};