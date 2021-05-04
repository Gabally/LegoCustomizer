const getNotifyEmails = require('../db/getNotifyEmails');

module.exports = (req, res) => {
    try {
        getNotifyEmails((err, emails) => {
            if (err)
            {
                res.sendStatus(500);
            }
            else
            {
                res.json({emails: emails.map(x => x.email)});
            }
        });
    } catch(e) {
      console.error(e);
      res.sendStatus(500);
    }
}