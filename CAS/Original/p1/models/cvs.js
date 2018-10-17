var mongoose = require("mongoose");

var CVS = mongoose.model(
    'cvs', 
    new mongoose.Schema({
        "first_name": String,
        "last_name": String,
        "birth_date": Date,
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
        "work_experience": [
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

var addCV = (data, cb) => {
    var cvs = new CVS(data);
    cvs.save((err, data) => {
        if(err){
            return cb(err);
        } else {
            return cb(null);
        }
    });
};

var updateCV = (id, data, cb) => {
    CVS.updateOne({_id: id}, data, (err) => {
        if(err){
            return cb(err)
        } else {
            return cb(null);
        }
    });
}

var deleteById = (id, cb) => {
    CVS.deleteOne({_id: id}, (err) => {
        if(err){
            return cb(err);
        } else {
            return cb(null);
        }
    });
}

var getAllCVs = (cb) => {
    CVS.find({}, (err, data) => {
        if(err){
            return cb(err, null);
        } else {
            return cb(null, data);
        }
    });
}

var getCVById = (id, cb) => {
    CVS.findOne({_id: id}, (err, data) => {
        if(err) {
            return cb(err, null);
        } else {
            return cb(null, data);
        }
    });
}

module.exports = {
    addCV,
    updateCV,
    deleteById,
    getAllCVs,
    getCVById
}