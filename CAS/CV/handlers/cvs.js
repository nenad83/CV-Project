var cvs = require("../models/cvs");


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
	// console.log(req.body);
	cvs.createCv(req.body, (err) => {
		if(err) {
			res.send(err);
		} else {
			res.status(201).send("User Created");
		}
	})
}


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