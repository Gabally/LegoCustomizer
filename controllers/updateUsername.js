const checkPassword = require('../db/checkPassword');
const updateUserUsername = require('../db/updateUserUsername');
const { body, validationResult } = require('express-validator');

module.exports = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(400);
    }
    const password = req.body.password;
    const username = req.body.username;
    try {
        checkPassword(password, (err, correct)=>{
            if(err)
            {
                console.error(err);
                res.sendStatus(500);
            }
            else
            {
                if (correct)
                {
                    updateUserUsername(username, (err)=>{
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