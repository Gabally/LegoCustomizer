const insertMinifigOrder = require('../db/insertMinifigOrder');
const utils = require('../utils');
const path = require('path');
const getNotifyEmails = require('../db/getNotifyEmails');
const newTorsoEmail = require('../emails/newTorsoEmail');

const cleanFiles = (front, back) => {
  utils.cleanUpFile(path.join(__dirname, '..', 'public', 'uploads', front));
  utils.cleanUpFile(path.join(__dirname, '..', 'public', 'uploads', back));
}

module.exports = (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const notes = req.body.notes;
    const frontB64 = req.body.front;
    const backB64 = req.body.back;
    const front = `${utils.generateUUID()}.png`;
    const back = `${utils.generateUUID()}.png`;
    try {
        utils.writeB64Image(frontB64, path.join(__dirname, '..', 'public', 'uploads', front));
        utils.writeB64Image(backB64, path.join(__dirname, '..', 'public', 'uploads', back));
        insertMinifigOrder(email, name, phone, notes, front, back, (err) => {
          if (err)
          {
            cleanFiles(front, back);
            res.status(500)
            .json({response: 'Si è verificato un errore interno'});
          }
          else
          {
            res.status(201)
            .json({response: 'Il tuo ordine è stato ricevuto'});
            getNotifyEmails((err, emails) => {
              if(err)
              {
                console.error(err);
              }
              else
              {
                let d = new Date();
                let now = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
                newTorsoEmail(now, email, name, phone, notes, frontB64.replace(/^data:image\/png;base64,/, ""), backB64.replace(/^data:image\/png;base64,/, ""), emails);
              }
            });
          }
      });
    } catch(e) {
      cleanFiles(front, back);
      console.error(e);
      res.sendStatus(500);
    }
}