const collection = require('./dataBaseCreatingForProdusts');

async function productSave(req, res, next) {

  let productData = {
    sellerID: req.body.sellersID ,
    sellerName: req.body.sellerName ,
    productName: req.body.productName ,
    productPrice: req.body.productPrice ,
    productQuantity: req.body.productQuantity ,
    productDescription: req.body.productDescription ,
    productPictureName: req.file.filename
  }

  const newDir = new collection( productData );
  
  newDir.save((err) => {
    if (err) console.log('Some problems while saving data');
    else {
      res.json({
        productSaved: true,
        text: 'Your product has been added to data base',
        product: productData
      });
    }
  });

  next();
}

module.exports = productSave;