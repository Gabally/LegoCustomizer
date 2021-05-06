const userExists = require('../db/userExists');
const setUserCredentials = require('../db/setUserCredentials');
const { body, validationResult } = require('express-validator');

module.exports = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(400);
    }
    const username = req.body.username;
    const password = req.body.password;
    try {
        userExists((err, exists)=>{
            if (exists)
            {
                res.sendStatus(401);
            }
            else
            {
                setUserCredentials(username, password, (err) => {
                    if (err)
                    {
                        res.sendStatus(500);
                    }
                    else
                    {
                        res.sendStatus(200);
                    }
                });
            }
        });
    } catch(e) {
      console.error(e);
      res.sendStatus(500);
    }
}