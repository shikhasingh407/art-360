/*
 MongoDB 2.4 database added.  Please make note of these credentials:

 Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
 Database Name:  dump
 Password:       rr2RlNQArDKq
 Username:       admin

 */
var express = require("express");
var multer = require('multer');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var externalArtUploadJs = require("./Server/Model/ArtUpload.js");

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());

/* Configure the database*/
var connectionUrl = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/ArtGalleryFramework';
mongoose.connect(connectionUrl);
var artModel = mongoose.model('ArtInformation', externalArtUploadJs.ArtUploadSchema);

/*Configure the multer.*/
app.use(multer({dest: './uploads/'}).array('uploadedData'));


app.get('/process', function (req, res) {
  res.json(process.env);
});

app.post('/rest/upload', function (req, res) {
  var artData = JSON.parse(req.body.artData);
  artData.uploadedImages = [];
  for (var i = 0; i < req.files.length; i++) {
    var image = {
      imageData: fs.readFileSync(req.files[i].path),
      imageName: req.files[i].originalname,
      fileName: req.files[i].filename,
      path: req.files[i].path,
      size: req.files[i].size,
      encoding: req.files[i].encoding
    };
    artData.uploadedImages.push(image);
    console.log(image);
  }

  var newArtObject = new artModel(artData);
  newArtObject.save(function (error, data) {
    if (error) {
      res.send({error: error});
    } else {
      res.json(data);
    }
  });

});


app.get('/rest/allArts', function (req, res) {
  var artistName = req.query['artistName'];
  artModel.find({'artistName': artistName}, function (error, art) {
    if (!error) {
      res.send(art);
    } else {
      res.send(error)
    }

  });
});

/*Run the server.*/
var ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipAddress);