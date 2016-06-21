var exports = module.exports = {};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.ArtistInformationSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String},
  name: {type: String, required: true},
  address: String,
  phone: Number,
  dob: {type: Date, default: Date.now},
  displayPic: [],
  facebook: {
    token: String,
    id: String,
    displayName: String
  },
  isActive: {type: Boolean, default: true}
}, {collection: 'ArtistInformation'});
