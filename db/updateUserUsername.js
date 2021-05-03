var sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports  = (username, password, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.run('UPDATE users SET username=? WHERE password=?', [username, password], (err) => {
        cb(err);
    });
}
