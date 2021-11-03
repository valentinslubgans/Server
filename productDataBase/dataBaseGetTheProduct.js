const collection = require('./dataBaseCreatingForProdusts');

async function getTheProduct( req, res, next ) {
    const productsList = await collection.find();
    res.json( productsList );
next();
}

module.exports = getTheProduct;