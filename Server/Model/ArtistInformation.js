var exports = module.exports = {};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.ArtistInformationSchema = new Schema({
  email: { type: String, unique: true},
  password: String,
  name: String,
  address: String,
  phone: Number,
  dob: { type: Date, default: Date.now },
  displayPics: [],
  isActive: { type: Boolean, default: true }
}, {collection: 'ArtistInformation'});
