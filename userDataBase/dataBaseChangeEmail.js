const collection = require( './dataBaseCreating' );
const bcrypt = require("bcrypt");

async function emailChanging( req, res, next ){

    collection.find( { 'email' : req.body.newEmail }, async ( err, docs ) => {
        if (err){
            console.log( err );
            return;
        }

        if (docs.length > 0) {
            res.json({
                emailChange: false,
                text: "Email is already taken!"
            });
            return;
        } else {

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
                        docs.email = req.body.newEmail;
                        await docs.save();
                        res.json({
                            emailChange: true,
                            text: "Email has been changed!"
                        });
                    } else {
                        res.json({
                            emailChange: false,
                            text: "Password is not correct!"
                        });
                    }
                }
            } )

        }
    } )

next();
}

module.exports = emailChanging;