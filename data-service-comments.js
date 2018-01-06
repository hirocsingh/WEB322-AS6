const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var commentSchema = new Schema({
    "authorName": String,
    "authorEmail": String,
    "subject": String,
    "commentText": String,
    "postedDate": Date,
    "replies": [{
        "comment_id": String,
        "authorName": String,
        "authorEmail": String,
        "repliedDate": Date,
        "commentText": String
    }]
});

let Comment;

module.exports.initialize = function() {
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection("mongodb://asingh:azertyuiop1234@ds133876.mlab.com:33876/web322_week8");
        db.on('error', (err) => {
            console.log("error detected")
            reject(err);
        });
        db.once('open', () => {
            Comment = db.model("comments", commentSchema);

            resolve();
        });
    });
};

module.exports.addComment = function(data) {
    return new Promise((resolve, reject) => {
        data.postedDate = Date.now();
        let newComment = new Comment(data);
        newComment.save((err) => {
            if (err) {
                reject("There was an error saving the comment =>" + err + "<=");
            } else {
                resolve(newComment._id);
            }
        });
    });
}

module.exports.getAllComments = function() {
    return new Promise((resolve, reject) => {
        Comment.find().sort({ "postedDate": 1 }).exec().then((result) => {
            if (!result) {
                throw new Error("No result returned");

            } else {
                resolve(result);
            }
        }).catch((err) => {
            reject("There was an error : " + err);
        });
    });
};

module.exports.addReply = function(data) {
    return new Promise((resolve, reject) => {
        data.repliedDate = Date.now();
        Comment.update({ _id: data.comment_id }, { $addToSet: { replies: data } }).exec().then((result) => {
            if (!result) {
                throw new Error("No result returned");

            } else {
                resolve(result);
            }
        }).catch((err) => {
            reject("There was an error : " + err);
        });
    });
}