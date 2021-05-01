var sqlite3 = require("sqlite3").verbose();
const config = require('../config');

module.exports  = ( cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.all("SELECT * FROM orders", (err, row) => {
            cb(row, err);
    });
}
