const fetchMinifigOrder = require("../db/fetchMinifigOrder");

module.exports = (req, res) => {
    const id = req.query.id;
    try {
        fetchMinifigOrder(id, (order, err) => {
          if (err)
          {
            res.sendStatus(500);
          }
          else
          {
            res.status(200)
            .json({order: order});
          }
      });
    } catch(e) {
      console.error(e);
      res.sendStatus(500);
    }
}