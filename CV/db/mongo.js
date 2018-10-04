var mongoose = require("mongoose");

const options = {
	useNewUrlParser: true
};

var db = null;

var Init = () => {
	mongoose.connect("mongodb://admin:admin1@ds121673.mlab.com:21673/cv", options)

	.then((conn) => {
		db = conn;
	})
	.catch((err) => {
		console.log(err);
	});
};

var DB = () => {
	if(db != null) {
		return db;
	} else {
		console.error("No mongoDB connection to return");
	}
};

module.exports = {
	Init,
	DB
}