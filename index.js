var express = require('express');
//var gcloud = require('google-cloud');
//var firebase = require('firebase');
//var multer = require("multer");
//var uploader = multer({ storage: multer.memoryStorage({}) });
var app = express();
var port = process.env.PORT || 3000;


//firebase.initializeApp({
//    serviceAccount: "privatekey.json",
//    databaseURL: "https://swe432-firebase-stuff.firebaseio.com"
//});

/**
 * Google cloud storage part
 */
//var CLOUD_BUCKET="swe432lecture12.appspot.com"; //From storage console, list of buckets
//var gcs = gcloud.storage({
//    projectId: 'swe432-firebase-stuff', //from storage console, then click settings, then "x-goog-project-id"
//    keyFilename: 'privatekey.json' //the key we already set up
//});

//function getPublicUrl (filename) {
//    return 'https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + filename;
//}

var counter = 0;
app.get('/', function (req, res) {
    res.send('Hello World has been said ' + counter + ' times!');
    counter++;
});

app.listen(port, function () {
    console.log('Example app listening on port' + port);
});