const mongoose = require('mongoose');

const conn = mongoose.createConnection( 'mongodb://localhost:27017/productDataBase' );

const productSchema = new mongoose.Schema({
  sellerID: {type: String},
  sellerName: {type: String},
  productName: {type: String},
  productPrice: {type: String},
  productQuantity: {type: String},
  productDescription: {type: String},
  productPictureName: {type: String}
});

const collection = conn.model( 'product', productSchema );

module.exports = collection;