let express = require('express');
let bodyParser = require("body-parser");
let client = require('./mongo-pool')
let api = require('./api')

let app = express();
const address = '127.0.0.1';
const port = 6699;


app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(api.allowCors);

app.post(api.postCommentUri, api.postComment);

app.get(api.findCommentsUri, api.findComments);

app.listen(port,address, () => {
    console.log(`Listening on ${address}:${port}`)
    client.initPool()
})

