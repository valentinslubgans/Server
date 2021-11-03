const collection = require('./dataBaseCraetingForNews');

async function newsReading( req, res, next ) {
    const news = await collection.find();
    res.json( news );
next();
};

module.exports = newsReading;