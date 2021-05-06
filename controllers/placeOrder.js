const insertOrder = require('../db/insertOrder');
const newOrderEmail = require('../emails/newOrderEmail');
const getNotifyEmails = require('../db/getNotifyEmails');
const { body, validationResult } = require('express-validator');

module.exports = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(400);
    }
    const email = req.body.email;
    const date = req.body.date;
    const notes = req.body.notes;
    try {
      insertOrder(email, date, notes, (err) => {
          if (err)
          {
            res.status(500)
            .json({response: 'Si è verificato un errore interno'});
          }
          else
          {
            res.status(201)
            .json({response: 'Il tuo ordine è stato ricevuto'});
            let d = new Date();
            let now = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
            getNotifyEmails((err, emails) => {
              if(err)
              {
                console.error(err);
              }
              else
              {
                newOrderEmail(now, email, date, notes, emails);
              }
            });
          }
      });
    } catch(e) {
      console.error(e);
      res.sendStatus(500);
    }
}