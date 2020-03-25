var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://catfish:egz0mtyuj5mFx54d@cluster0-5rdbf.mongodb.net/test?retryWrites=true&w=majority';


var options = {
    numberOfRetries : 5,
    auto_reconnect: true,
    poolSize : 3,
    connectTimeoutMS: 500,
    useUnifiedTopology: true
};

function MongoPool(){}
var p_db;

MongoPool.initPool = function(cb){
  MongoClient.connect(url, options, function(err, db) {
    if (err) throw err;
    else console.log("Connected to database")
    p_db = db.db('catfishdb')
    if(cb && typeof(cb) == 'function')
        cb(p_db);
  });
  return MongoPool;
}

MongoPool.getInstance = function getInstance(cb){
  if(!p_db){
    this.initPool(cb)
  }
  else{
    if(cb && typeof(cb) == 'function')
      cb(p_db);
  }
}

module.exports = MongoPool;