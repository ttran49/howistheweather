var express = require('express');
var gcloud = require('google-cloud');
var firebase = require('firebase');
var multer = require("multer");
var sys = require('util');
var rp = require('request-promise');
var uploader = multer({ storage: multer.memoryStorage({}) });
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var port = process.env.PORT || 5000;


firebase.initializeApp({
    serviceAccount: "privatekey.json",
    databaseURL: "https://swe432-firebase-stuff.firebaseio.com"
});

/**
 * Google cloud storage part
 */
var CLOUD_BUCKET="swe432lecture12.appspot.com"; //From storage console, list of buckets
var gcs = gcloud.storage({
    projectId: '1069239150549', //from storage console, then click settings, then "x-goog-project-id"
    keyFilename: 'privatekey.json' //the key we already set up
});

function getPublicUrl (filename) {
    return 'https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + filename;
}

var bucket = gcs.bucket(CLOUD_BUCKET);

//From https://cloud.google.com/nodejs/getting-started/using-cloud-storage
function sendUploadToGCS (req, res, next) {
    if (!req.file) {
        return next();
    }

    var gcsname = Date.now() + req.file.originalname;
    var file = bucket.file(gcsname);


    var stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', function (err) {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', function () {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        var options = {
            entity: 'allUsers',
            role: gcs.acl.READER_ROLE
        };
        file.acl.add(options, function(a,e){next();});//Make file world-readable; this is async so need to wait to return OK until its done
    });

    stream.end(req.file.buffer);
}

app.get('/git', function (req, res) {
    res.send('Hello World has been said ' + counter + ' times!');
    counter++;
});

app.get('/resultpage.html/:location', function (req, res){
    var location= req.params.location;
    var output;
    
    //getting current weather
    var currentWeather = {
        uri: "http://api.wunderground.com/api/b40fe05c89327f5c/conditions/q/"+location +".json",
        json: true // Automatically parses the JSON string in the response
    };
    rp(currentWeather)
        .then(function (repos) {
            var response= repos.current_observation;
            //nested
            var forecastWeather= {
                uri: "http://api.wunderground.com/api/b40fe05c89327f5c/forecast10day/q/"+location+".json",
                json: true // Automatically parses the JSON string in the response
                };
                rp(forecastWeather)
                    .then(function (repo){
                        var forecast=repo.forecast.simpleforecast.forecastday;
                        output={"location": response.display_location.full, "temp": response.temperature_string, "icon": response.icon_url,"last_update": response.observation_time, "future":forecast};
                        console.log(output);
                        
                        //send the response
                        res.send(output);
                        
                    })
                    .catch(function(err){
                        console.log("failed  ---!");
                        res.status(500).send(err);
                    });
        })
        .catch(function(err){
            console.log("failed");
            res.status(500).send(err);
        });

});

var fireRef = firebase.database().ref('Auth');

//upload a pic
app.post('/resultpage.html', uploader.single("img"), sendUploadToGCS, function (req, res, next) {
    var img;
    var username=req.body.user;
    if(req.file)
        img = getPublicUrl(req.file.cloudStorageObject);
    fireRef.child(username).set(
        {imgage: img}
    ).catch(function(){
        res.status(403);
        res.send();
    });
});

app.use(express.static('public'));

app.listen(port, function () {
    console.log('Example app listening on port' + port);
});