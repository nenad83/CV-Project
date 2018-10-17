var cv = require('../models/cvs');

var createCV = (req, res) => {
    var cvData = formatDates(req.body);
    cv.addCV(cvData, (err) => {
        if(err){
            return res.status(500).send(err);
        } else {
            return res.send("OK");
        }
    });
}

var updateCVById = (req, res) => {
    var cvData = formatDates(req.body);
    var id = req.params.id;
    cv.updateCV(id, cvData, (err) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            return res.send("OK");
        }
    });
}

var deleteCVById = (req, res) => {
    var id = req.params.id;
    cv.deleteById(id, (err) => {
        if(err){
            return res.status(500).send(err);
        } else {
            return res.send("ok");
        }
    });
}

var getAllCVs = (req, res) => {
    cv.getAllCVs((err, data) => {
        if(err){
            return res.status(500).send(err);
        } else {
            return res.send(data);
        }
    });
}

var getCVById = (req, res) => {
    var id = req.params.id;
    cv.getCVById(id, (err, data) => {
        if(err){
            return res.status(500).send(err);
        } else {
            return res.send(data);
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
    createCV,
    updateCVById,
    deleteCVById,
    getAllCVs,
    getCVById
}