var sqlite3 = require("sqlite3").verbose();
const config = require('../config');

module.exports  = (id, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.get("SELECT * FROM orders WHERE id=?", id, (err, row) => {
        cb(row, err);
    });
}
