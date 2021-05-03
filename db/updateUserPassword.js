var sqlite3 = require('sqlite3').verbose();
const config = require('../config');
const bcrypt = require('bcrypt');

module.exports  = (oldPassword, password, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    bcrypt.hash(password, 10, (err, hash) => {
        if(err)
        {
            cb(err);
        }
        else
        {
            db.run('UPDATE users SET password=?', hash, (err) => {
                cb(err);
            });
        }
    });
}
