var mongoose = require('mongoose');

const options = {
    useNewUrlParser: true
}

var Init = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/semos1', options)
    .then((conn) => {
        console.info('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });
};

module.exports = {
    Init
}