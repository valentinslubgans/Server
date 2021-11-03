async function productPicktureDownload( req, res, next ) {

    res.sendFile( req.params.imageName , { root: './productDataBase/uploadedFiles/' }, ( err ) => {
        if ( err ) console.log( err );
    } );

    next();
}



module.exports = productPicktureDownload;