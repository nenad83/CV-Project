var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

var mongo = require('./db/mongo');

var auth = require('./handlers/auth');
var root = require('./handlers/root');
var users = require('./handlers/users');
var cv = require('./handlers/cvs');

mongo.Init();

var app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt({
        secret: 'pero_e_haker'
    }).unless({
        path: [
            {url: '/login', methods: ['POST']},
            {url: '/users', methods: ['POST']}
        ]
    })
);

app.get('/', root);

app.post('/login', auth.login);
app.get('/logout', auth.logout); // logout(req, res);

app.get('/users', users.getAllUsers);
app.get('/users/name/:name', users.getUserByName);
app.get('/users/:id', users.getUserById);
app.post('/users', users.createUser);
app.delete('/users/:id', users.deleteById);
app.put('/users/:id', users.updateById);

app.post('/cv', cv.createCV);
app.put('/cv/:id', cv.updateCVById);
app.delete('/cv/:id', cv.deleteCVById);
app.get('/cv', cv.getAllCVs);
app.get('/cv/:id', cv.getCVById);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
    }
});

app.listen(80);

