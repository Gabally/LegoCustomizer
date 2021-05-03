const checkPassword = require('../db/checkPassword');
const updateUserUsername = require('../db/updateUserUsername');

module.exports = (req, res) => {
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
                    updateUserUsername(username, password, (err)=>{
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