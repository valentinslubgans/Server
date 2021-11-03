const collection = require( './dataBaseCreating' );
const bcrypt = require("bcrypt");

async function passwordChanging( req, res, next ){

    collection.findById( req.body.userID, async ( err, docs ) => {
        if (err){
            console.log( err );
            return;
        }

        if ( !docs ){
            console.log( 'Some error with finding by ID' );
            return;
        }
        else {
            const validPassword = await bcrypt.compare( req.body.pass, docs.pass );
            if ( validPassword ) {
                const salt = await bcrypt.genSalt( 10 );
                docs.pass = await bcrypt.hash( req.body.newPass, salt );
                await docs.save();
                res.json({
                    passChange: true,
                    text: "Password has been changed!"
                });
            } else {
                res.json({
                    passChange: false,
                    text: "Old password is not correct!"
                });
            }
        }
    } )

next();
}

module.exports = passwordChanging;