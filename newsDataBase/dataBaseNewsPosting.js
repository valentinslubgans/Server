const collection = require('./dataBaseCraetingForNews');
const bcrypt = require("bcrypt");

async function newsPosting(req, res, next) {

    const newDir = new collection(req.body);

        newDir.save((err) => {
          if (err) console.log('Some problems while saving data');
          else {
            res.json({
              newsposting: true,
              text: 'News posted successfully',
              news: req.body
            });
          }
        });

next();
}

module.exports = newsPosting;