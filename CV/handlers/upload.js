const bucket = "./bucket/";
const avatar = "./bucket/avatar/";
const documents = "./bucket/documents/";
const allowedTypes = ["image/jpg", "image/jpeg", "image/pjpeg", "image/gif", "image/tif", "image/png"];
const allowedFiles = ["application/pdf"];


var uploadFile = (req, res) => {
	// res.send(req.files.doc.name);
	if(allowedTypes.indexOf(req.files.doc.mimetype)> -1){

	req.files.doc.mv(bucket + req.files.doc.name, (err) => {
		if(err) {
			return res.status(500).send("Could not upload file: " + err);
		} else {
			return res.status(200).send("OK");
		}
	});
	} else {
		return res.status(400).send("File type not allowed")
	} 
}

var uploadAvatar = (req, res)=> {
	if(allowedTypes.indexOf(req.files.doc.mimetype) > -1) {
		req.files.doc.mv(avatar + req.files.doc.name, (err) => {
			if(err) {
				return res.status(500).send("Could not upload avatar" +err);

			} else {
				return res.status(200).send("Avatar uploaded");
				console.log(req.files.doc.name);
			}
		})
	} else {
		return res.status(400).send("File type not allowed" + err);
	}
}

var uploadFile = (req, res) => {
	if(allowedFiles.indexOf(req.files.doc.mimetype)> -1) {
		req.files.doc.mv(documents + req.files.doc.name, (err) => {
			if(err) {
				return res.status(500).send("Could not upload file");
			} else {
				return res.status(200).send("File uploaded");
			}
		})
	} else {
		return res.status(400).send("File type not allowed " + err);
	}
}


module.exports = {
	uploadFile,
	uploadAvatar,
	uploadFile
}