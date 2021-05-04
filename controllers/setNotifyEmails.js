const setNotifyEmails = require('../db/setNotifyEmails');

module.exports = (req, res) => {
    const emails = req.body.emails;
    try {
        setNotifyEmails(emails, () => {
                res.sendStatus(200);
        });
    } catch(e) {
      console.error(e);
      res.sendStatus(500);
    }
}