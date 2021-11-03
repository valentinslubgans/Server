const collection = require('./dataBaseCreating');
const bcrypt = require("bcrypt");

function userLogin(req, res, next) {

    collection.find({ 'name': req.body.name }, async (err, docs) => {

        if (err) { console.log(err); }

        else {
            if (docs.length == 0) {
                res.json({
                    login: false,
                    text: 'Login name or password incorrect!'
                });
            } else {
                const validPassword = await bcrypt.compare(req.body.pass, docs[0].pass);
                if (validPassword) {
                    res.json({
                        login: true,
                        userID: docs[0]._id,
                        userName: docs[0].name,
                        text: 'Login successfully'
                    });
                } else {
                    res.json({
                        login: false,
                        text: 'Login name or password incorrect!npm start'
                    });
                }
            }
        }

    })
next();    
};
module.exports = userLogin;