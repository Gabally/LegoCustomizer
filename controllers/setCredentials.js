const userExists = require('../db/userExists');
const setUserCredentials = require('../db/setUserCredentials');

module.exports = (req, res) => {
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