const checkUserCredentials = require('../db/checkUserCredentials');
const { body, validationResult } = require('express-validator');

module.exports = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(400);
    }
    const username = req.body.username;
    const password = req.body.password;
    try {
        checkUserCredentials(username, password, (err, correct)=>{
            if(err)
            {
                console.error(err);
                res.sendStatus(500);
            }
            else
            {
                if (correct)
                {
                    req.session.authorized = true;
                    res.sendStatus(200);
                }
                else
                {
                    res.sendStatus(401);
                }
            }
        });
    } catch(e) {
        console.error(e);
        res.sendStatus(500);
    }
}