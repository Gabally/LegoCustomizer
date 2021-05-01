const insertOrder = require("../db/insertOrder");

module.exports = (req, res) => {
    const email = req.body.email;
    const date = req.body.date;
    const notes = req.body.notes;
    try {
      insertOrder(email, date, notes, (err) => {
          if (err)
          {
            res.status(500)
            .json({response: "Si è verificato un errore interno"});
          }
          else
          {
            res.status(201)
            .json({response: "Il tuo ordine è stato ricevuto"});
          }
      });
    } catch(e) {
      console.error(e);
      res.sendStatus(500);
    }
}