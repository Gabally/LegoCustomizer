const sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports = (email, date, note, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.run("INSERT INTO orders VALUES (NULL, date('now'), ?, ?, ?)", [email, date, note], (err) => {
        db.close();
        if (err)
        {
            console.error(err);
            cb(err);
        }
        else
        {
            cb(undefined);
        }
    });
}
