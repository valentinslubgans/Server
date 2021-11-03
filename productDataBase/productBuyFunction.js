const collection = require('./dataBaseCreatingForProdusts');
const fs = require('fs');

async function productBuyingFunction( req, res, next) {

    let productMap = new Map( Object.entries( req.body ) );

    let errorText = "";

    productMap.forEach( (value, key) => {
        collection.findById( key, ( err, docs ) => {
            if (err) {
                console.log( err );
                return;
            }

            if (!docs){
                errorText += value[0].productName + " not found <br>";
                return;
            }

            if ( docs.productQuantity < value[1]) {
                errorText += docs.productName + " is not enought <br>";
                return;
            }

            docs.productQuantity -= value[1];
            docs.save();

            if ( docs.productQuantity == 0 ){
                const path = "./productDataBase/uploadedFiles/" + docs.productPictureName;
                fs.unlink( path, ( err ) => {
                    if ( err ) {
                        console.log( err );
                        return;
                    }
                docs.remove(); 
                });
            }
        })
    });

    if ( errorText ) {
        res.json({
            error: true,
            text: errorText
        });
    } else {
        res.json({
            error: false,
            text: "Order has been sent successfully"
        });
    }

    next();
}

module.exports = productBuyingFunction;