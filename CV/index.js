var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongo = require("./db/mongo");
var root = require("./handlers/root");
var auth = require("./handlers/auth");
var users = require("./handlers/users");


mongo.Init();


app.get("/", root.home);

app.post("/login", auth.login);
app.post("/logout", auth.logout);

app.get("/users", users.getAllUsers);
app.delete("/users/delete/:id", users.deleteUserById);
app.post("/users/create", users.createUser);





app.listen(3000);