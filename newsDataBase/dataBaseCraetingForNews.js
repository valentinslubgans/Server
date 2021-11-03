const mongoose = require('mongoose');

const conn = mongoose.createConnection( 'mongodb://localhost:27017/newsDataBase' );

const newsSchema = new mongoose.Schema({
  authorID: {type: String},
  authorName: {type: String},
  newsPostingDate: {type: String},
  newsHeader: {type: String},
  newsText: {type: String}
});

const collection = conn.model( 'news', newsSchema );

module.exports = collection;