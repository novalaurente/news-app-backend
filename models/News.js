const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  sourceId: String,
  sourceName: String,
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String
})

module.exports = mongoose.model("News", NewsSchema);