const collection = require('./dataBaseCraetingForNews');

async function newsDelete( req, res, next ) {
    const news = await collection.findById( req.body.newsID );
        if ( news.authorID == req.body.userID ){
            news.remove();
            res.json( "News has been deleted" );
        }
next();
};

module.exports = newsDelete;