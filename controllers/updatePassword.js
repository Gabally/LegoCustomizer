const checkPassword = require('../db/checkPassword');
const updatePassword = require('../db/updateUserPassword');
const { body, validationResult } = require('express-validator');

module.exports = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(400);
    }
    const password = req.body.password;
    const newPassword = req.body.newpassword;
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
                    updatePassword(newPassword, (err)=>{
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