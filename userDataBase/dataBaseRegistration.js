const collection = require('./dataBaseCreating');
const bcrypt = require("bcrypt");

function userRegistration(req, res, next) {

  collection.find({ $or: [{ 'name': req.body.name }, { 'email': req.body.email }] }, async (err, docs) => {

    if (err) { console.log(err); }

    else {
      if (docs.length == 0) {

        const salt = await bcrypt.genSalt(10);
        req.body.pass = await bcrypt.hash(req.body.pass, salt);

        const newDir = new collection(req.body);

        newDir.save((err) => {
          if (err) console.log('Some problems while saving data');
          else {
            res.json({
              registration: true,
              text: 'Registration successfully'
            });
          }
        });

      } else {
        let errText = '';
        if (docs[0].name == req.body.name) { errText += `Login name is already taken \n`; }
        if (docs[0].email == req.body.email) { errText += `Email is already taken \n`; }
        res.json({
          registration: false,
          text: errText
        });
      }

    }
  });
next();
}

module.exports = userRegistration;