const fetchMinifigOrders = require("../db/fetchMinifigOrders");

module.exports = (req, res) => {
    try {
        fetchMinifigOrders((orders, err) => {
          if (err)
          {
            res.sendStatus(500);
          }
          else
          {
            res.status(200)
            .json({orders: orders});
          }
      });
    } catch(e) {
      console.error(e);
      res.sendStatus(500);
    }
}