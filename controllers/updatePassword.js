const checkPassword = require('../db/checkPassword');
const updatePassword = require('../db/updateUserPassword');

module.exports = (req, res) => {
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
                    updatePassword(password, newPassword, (err)=>{
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