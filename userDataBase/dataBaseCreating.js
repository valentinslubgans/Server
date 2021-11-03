const mongoose = require('mongoose');

const conn = mongoose.createConnection( 'mongodb://localhost:27017/usersDataBase' );

const userSchema = new mongoose.Schema({
  name: {type: String},
  pass: {type: String},
  email: {type: String}
});

const collection = conn.model( 'user', userSchema );

module.exports = collection;