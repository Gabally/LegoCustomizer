const delOrder = require("../db/delOrder");

module.exports = (req, res) => {
    const id = req.query.id;
    try {
        delOrder(id, (err) => {
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