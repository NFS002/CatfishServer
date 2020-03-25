let impl = require('./impl')

module.exports = {
    allowCors: function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    },

    postCommentUri: '/postComment',
    postComment: function (req, res, next) {
        impl.postComment(req, res);
    },


    findCommentsUri: '/findComments/:url',
    findComments: function (req, res, next) {
        impl.findComments(req, res);
    }
}