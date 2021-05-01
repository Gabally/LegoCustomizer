const delMinifigOrder = require("../db/delMinifigOrder");
const utils = require("../utils");
const path = require("path");

const cleanFiles = (front, back) => {
  utils.cleanUpFile(path.join(__dirname, "..", "public", "uploads", front));
  utils.cleanUpFile(path.join(__dirname, "..", "public", "uploads", back));
}

module.exports = (req, res) => {
    const id = req.query.id;
    try {
        delMinifigOrder(id, (err, row) => {
          cleanFiles(row.front, row.back);
          if (err)
          {
            res.sendStatus(500);
          }
          else
          {
            res.sendStatus(200);
          }
      });
    } catch(e) {
      console.error(e);
      res.sendStatus(500);
    }
}