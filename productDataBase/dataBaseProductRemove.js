const collection = require('./dataBaseCreatingForProdusts');
const fs = require('fs');

async function productDelete( req, res, next ) {
    const product = await collection.findById( req.body._id );
    const path = "./productDataBase/uploadedFiles/" + product.productPictureName;
    fs.unlink( path, (err) => {
        if ( err ) {
            res.json({
                fileRemoved: false,
                text: "Product removing error."
            });
            console.log( "Remove file error: " + err );
            return;
        } else {
            product.remove();
            res.json({
                fileRemoved: true,
                text: "Product has been removed"
            });
        }
    } );

next();
};

module.exports = productDelete;