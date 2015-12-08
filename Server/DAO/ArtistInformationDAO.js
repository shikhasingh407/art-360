(function () {
  var exports = module.exports = {};
  var express = require("express");
  var multer = require('multer');
  var cors = require('cors');
  var bodyParser = require('body-parser');
  var mongoose = require('mongoose');
  var fs = require('fs');

  var externalArtistInformationJs = require("../Model/ArtistInformation.js");
  var artistModel = mongoose.model('ArtistInformation', externalArtistInformationJs.ArtistInformationSchema);

  exports.service = {
    getArtistInformation: getArtistInformation,
    postArtistInformation: postArtistInformation,
    updateArtistInformation: updateArtistInformation,
    deleteArtistInformation: deleteArtistInformation
  };


  function getArtistInformation(req) {
    return artistModel.findOne(req.params, function (error, artist) {
      if (!error) {
        return artist;
      } else {
        return error;
      }
    });
  }

  function postArtistInformation(req) {
    var artistData = getArtistUploadData(req);
    return new artistModel(artistData).save(function (error, data) {
      if (error) {
        return error;
      } else {
        return data;
      }
    });

  }

  function updateArtistInformation(req) {
    console.log("update function");
    var artistData = getArtistUploadData(req);
    var artistDataClone = JSON.parse(JSON.stringify(artistData));
    delete artistDataClone['_id'];
    return artistModel.findOneAndUpdate({_id: artistData._id}, artistDataClone, {new: true}).then(
        function (doc, err) {
          if (!err) {
            console.log(doc);
            return doc;
          }
          else {
            console.log(err);
            return err;
          }
        });
  }

  function deleteArtistInformation(req) {
    console.log("delete function");
    return artistModel.remove(req.params, function (error, artist) {
      if (!error) {
        return "artist removed";
      } else {
        return error;
      }
    });
  }

  function getArtistUploadData(req) {
    var artistData = JSON.parse(req.body.artistData);
    artistData.displayPic = [];
    for (var i = 0; i < req.files.length; i++) {
      var image = {
        imageData: fs.readFileSync(req.files[i].path),
        imageName: req.files[i].originalname,
        fileName: req.files[i].filename,
        path: req.files[i].path,
        size: req.files[i].size,
        encoding: req.files[i].encoding
      };
      artistData.displayPic.push(image);
      console.log(image);
    }

    return artistData;
  }


})();