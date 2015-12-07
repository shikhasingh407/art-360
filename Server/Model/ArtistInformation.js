var exports = module.exports = {};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.ArtistInformationSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  address: String,
  phone: Number,
  dob: {type: Date, default: Date.now},
  displayPic: [],
  isActive: {type: Boolean, default: true}
}, {collection: 'ArtistInformation'});
