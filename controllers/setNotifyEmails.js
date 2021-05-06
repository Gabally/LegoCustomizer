const setNotifyEmails = require('../db/setNotifyEmails');
const { body, validationResult } = require('express-validator');

module.exports = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(400);
    }
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