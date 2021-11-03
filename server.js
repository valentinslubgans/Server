const express = require('express');
const multer  = require('multer');
const storage = multer.diskStorage( {
  destination: ( req, file, cb ) => cb( null, './productDataBase/uploadedFiles' ), 
  filename: ( req, file, cb ) => cb( null, Math.round(Math.random() * 1E9) + "_" + file.originalname )
} );
const upload = multer({ storage: storage })
const cors = require('cors');
const app = express();
const port = 5000;

const userRegister = require( './userDataBase/dataBaseRegistration' );
const userLogin = require( './userDataBase/dataBaseLogin' );
const userPassChange = require( './userDataBase/dataBaseChangePass' );
const emailChanging = require( './userDataBase/dataBaseChangeEmail' );
const newsPosting = require( './newsDataBase/dataBaseNewsPosting' );
const newsReading = require( './newsDataBase/dataBaseNewsReading' );
const newsDelete = require( './newsDataBase/dataBaseNewsDelete' );
const productSave = require( './productDataBase/dataBaseProducSave' );
const productGet = require( './productDataBase/dataBaseGetTheProduct' );
const productPictureDownload = require( './productDataBase/productPicktureDownload' );
const productDelete = require( './productDataBase/dataBaseProductRemove' );
const productBuy = require( './productDataBase/productBuyFunction' );

//запускаем сервер
app.use( cors({ 
  origin: 'http://localhost:3000'
}) );

app.use( express.json() );


//регистрация
app.post( '/reg', userRegister, ( req, res ) => {
  console.log( 'Registration' );
} );

//логин
app.post( '/login', userLogin, ( req, res ) => {
  console.log( "Login" );
} );

//смена пароля
app.post( '/passChange', userPassChange, ( req, res ) => {
  console.log( "Password changing" );
} );

//смена Email
app.post( '/emailChange', emailChanging, ( req, res ) => {
  console.log( "Email changing" );
} );

//Добавить новость
app.post( '/newsPosting', newsPosting, ( req, res ) => {
  console.log( "New Posting" );
} );

//Чтение новостей
app.post( '/newsReading', newsReading, ( req, res ) => {
  console.log( "News Reading" );
} );

//Удаление новостей
app.post( '/newsDelete', newsDelete, ( req, res ) => {
  console.log( "New Delete" );
} );

//Добавить продукт в базу данных
app.post( '/productAdd', upload.single( 'imageFile' ), productSave, ( req, res ) => {
  console.log( "Product added" );
} );

//Чтение продуктов
app.post( '/productGet', productGet, ( req, res ) => {
  console.log( "Get the product" );
} );

//Загрузка картинки продукта
app.get( '/imageGet/:imageName', productPictureDownload, ( req, res ) => {
  console.log( "Get the image" );
} );

//Загрузка картинки продукта
app.post( '/deleteProduct', productDelete, ( req, res ) => {
  console.log( "Delete the project" );
} );

//Торговая операция
app.post( '/productListToBuy', productBuy, ( req, res ) => {
  console.log( "Buying products via list" );
});



//включение порта
app.listen( port, () => {
  console.log( 'Server is running on port:', port );
});
