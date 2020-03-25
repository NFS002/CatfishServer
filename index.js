let express = require('express');
let bodyParser = require("body-parser");
let client = require('./mongo-pool')
let api = require('./api')
let fs = require('fs')
let https = require('https')
let app = express();

const address = '0.0.0.0';
const port = 80;
const CERT_PATH = '/etc/letsencrypt/live/catfish.skydesign.blue/'

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(api.redirect_to_https);

app.use(api.allowCors);

app.post(api.postCommentUri, api.postComment);

app.get(api.findCommentsUri, api.findComments);


https.createServer({
  key: fs.readFileSync(CERT_PATH + 'privkey.pem'),
  cert: fs.readFileSync(CERT_PATH + 'cert.pem'),
  ca: fs.readFileSync(CERT_PATH + 'chain.pem')
}, app).listen(443, () => {
   console.log(`Listening on ${address}:${port}`)
   client.initPool()
})


