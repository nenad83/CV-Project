var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('express-jwt');
var mongoose = require("mongoose");
var mongo = require("./db/mongo");
var fileUpload = require("express-fileupload");
var root = require("./handlers/root");
var auth = require("./handlers/auth");
var cvs = require("./handlers/cvs");
var users = require("./handlers/users");
var upload = require("./handlers/upload");



mongo.Init();

var app = express();
app.use(bodyParser.json());

app.use(jwt({
		secret: "pero_e_haker"
	}).unless({
	path:[ 
		{url: "/users", methods: ["POST"]},
		{url: "/login", methods: ["POST"]},
		// {url: "/email", methods: ["GET"]},
		{url: "/users", methods: ["GET"]},
		{url: "/upload", methods: ["POST"]},
		{url: "/upload/avatar", methods: ["POST"]},
		{url: "/upload/file", methods: ["POST"]}
	]
	})
);

app.use(fileUpload({
  limits: { 
  	fileSize: 50 * 1024 * 1024 },
}));

app.get("/", root.home);

app.post("/login", auth.login);
app.post("/logout", auth.logout);
// app.get("/email", auth.getUsersByEmail);

app.get("/cvs", cvs.getAllCvs);
app.get("/cvs/name/:name", cvs.getCvsByName);
app.delete("/cvs/delete/:id", cvs.deleteCvsById);
app.post("/cvs/create", cvs.createCv);
app.put("/cvs/:id", cvs.updateById);


app.get("/users", users.getAllUsers);
app.post("/users", users.createUser);

app.post("/upload", upload.uploadFile);
app.post("/upload/avatar", upload.uploadAvatar);
app.post("/upload/file", upload.uploadFile);



app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token');
  }
});





app.listen(3000);