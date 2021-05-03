var sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports  = (oldPassword, password, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.run('UPDATE users SET password=? WHERE password=?', [password, oldPassword], (err) => {
        cb(err);
    });
}
