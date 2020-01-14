const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SourceSchema = new Schema({
  id: String,
  name: String,
  description: String,
  url: String,
  category: String,
  language: String,
  country: String
})

module.exports = mongoose.model("Source", SourceSchema);