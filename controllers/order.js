const fetchOrder = require("../db/fetchOrder");

module.exports = (req, res) => {
    const id = req.query.id;
    try {
        fetchOrder(id, (order, err) => {
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