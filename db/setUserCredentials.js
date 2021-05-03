var sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports  = (username, password, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.run('INSERT INTO users VALUES (?, ?)', [username, password], (err) => {
        cb(err);
    });
}
