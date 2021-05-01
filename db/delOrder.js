var sqlite3 = require("sqlite3").verbose();
const config = require('../config');

module.exports  = (id, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.run("DELETE FROM orders WHERE id=?", id, (err) => {
        cb(err);
    });
}
