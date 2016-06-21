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
var externalArtistInformationJs = require("./Server/Model/ArtistInformation.js");
var externalResources = require("./Server/resources/resources.js");

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var facebookConfig = {
  clientID     : process.env.FACEBOOK_CLIENT_ID_PROJECT,
  clientSecret : process.env.FACEBOOK_CLIENT_SECRET_PROJECT,
  callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

passport.use(new FacebookStrategy(facebookConfig, facebookLogin));

/* Configure the database*/
mongoose.connect(externalResources.reources['connectionUrl']);
var artModel = mongoose.model('ArtInformation', externalArtUploadJs.ArtUploadSchema);
var artistModel = mongoose.model('ArtistInformation', externalArtistInformationJs.ArtistInformationSchema);

/*Configure the multer.*/
app.use(multer({dest: './uploads/'}).array('uploadedData'));


app.get('/process', function (req, res) {
  res.json(process.env);
});

/*Run the server.*/
var ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipAddress);


// CRUD FUNCTION CALLS FOR ART

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

// functions for passport authentications:

app.get("/auth/facebook",passport.authenticate('facebook'), facebookLogin);
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));

function facebookLogin(token, refreshToken, profile, done){
  artistModel
      .findOne({'facebook.id': profile.id})
      .then(
          function(fbuser){
            if(fbuser) {
              return done(null, fbuser);
            }
            else {
              fbuser = {
                username: profile.displayName.replace(/ /g,''),
                facebook: {
                  token: token,
                  id: profile.id,
                  displayName: profile.displayName
                },
                  email: "example@ex.com",
                  name: profile.displayName.replace(/ /g,'')
              };
                console.log(fbuser);
                artistModel
                  .create(fbuser)
                  .then(
                      function(artist){

                          console.log("FBUSER CREATED!");
                        done(null,artist);
                      }
                  );
            }
          }
      )
}

function localStrategy(username,password,done){
  console.log("1");
  artistModel
      .findOne({email : username})
      .then(
          function(artist){
            if(artist && password == artist.password) {
              done (null, artist);
            }
            else{
              done(null,false);
            }

          },
          function(error){
            done(error);
            console.log("4")
          }
      );
}

function serializeUser(artist, done) {
  done(null, artist);
  console.log("4")
}

function deserializeUser(artist, done) {
  console.log("5");
  artistModel
      .findById(artist._id)
      .then(
          function(artist){
            done(null, artist);
            console.log(6);
          },
          function(error){
            done(error, null);
            console.log("7");
          }
      );
}


// CRUD FUNCTION CALLS FOR ARTIST

var externalArtistDAO = require('./Server/DAO/ArtistInformationDAO.js');

app.get('/rest/artists/:email', function(req, res) {
  externalArtistDAO.service.getArtistInformation(req).then(function (response) {
    res.send(response);
  });
});

app.get('/rest/artist/:id', function(req, res) {
    externalArtistDAO.service.findArtistById(req).then(function (response) {
        res.send(response);
    });
});

app.get('/rest/artist/', function(req, res) {
  externalArtistDAO.service.findArtistById(req).then(function (response) {
    res.send(response);
  });
});

app.post('/rest/logout', function(req, res) {
    req.logout();
    res.send(200);
});

app.get('/rest/loggedin', function(req, res) {
    if(req.isAuthenticated()){
        console.log(req);
        res.json(req.user);
    }
    else {
        res.send('0');
    }
});


app.post('/rest/artist/', function(req) {
  externalArtistDAO.service.createArtist(req).then(function (response) {
    res.send(response);
  });
});

app.post('/rest/login', passport.authenticate('local'), function(req, res) {
  var user = req.user;
  console.log(user);
  return res.json(user);
});



app.post('/rest/artists', function(req, res) {
  externalArtistDAO.service.postArtistInformation(req).then(function(response) {
    res.send(response);
  });
});

app.put('/rest/artists', function(req, res) {
  externalArtistDAO.service.updateArtistInformation(req).then(function(response) {
    res.send(response);
  });
});


app.delete('/rest/artists', function(req, res) {
  externalArtistDAO.service.deleteArtistInformation(req).then(function(response) {
    res.send(response);
  });
});