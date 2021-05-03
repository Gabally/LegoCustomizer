const userExists = require('../db/userExists');
const path = require('path');

module.exports = (req, res) => {
    try {
        userExists((err, exists) => {
          if (err)
          {
            res.sendStatus(500);
          }
          else
          {
            if (exists)
            {
                res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
            }
            else
            {
                res.sendFile(path.join(__dirname, '..', 'views', 'setpassword.html'));
            }
          }
      });
    } catch(e) {
      console.error(e);
      res.sendStatus(500);
    }
}