let client = require('./mongo-pool')

module.exports = {
    postComment: function(req, res) {
        client.getInstance( async function(db) {
            try {
                var collection = db.collection('comments');
                var doc = {
                    name: req.body.name,
                    date: new Date().toLocaleDateString(),
                    comments: req.body.comments,
                    url: req.body.url
                }
                await collection.insert(doc);
                res.statusCode = 200;
                res.end();
            }
            catch (e) {
                console.error(e)
                res.statusCode = 500
            }
            finally {
                res.end();
            }
        });
    },


    findComments: function(req, res) {
        client.getInstance( async function(db) {
            let obj = {comments: undefined, votes: 0};
            let collection = db.collection('comments')
            try {
                let reqUrl = req.params.url;
                arr = await collection.find( { url: reqUrl }).toArray()
                obj.comments = arr;
                res.statusCode = 200;
            } 
            catch (e) {
                console.error(e)
                res.statusCode = 500
            }
            finally {
                res.end(JSON.stringify(obj));
            }
        })   
    }
}