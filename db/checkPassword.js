var sqlite3 = require('sqlite3').verbose();
const config = require('../config');
const bcrypt = require('bcrypt');

module.exports  = (password, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.get('SELECT * FROM users', (err, row) => {
        if(row)
        {
            bcrypt.compare(password, row.password, (err, res) => {
                if (err)
                {
                    cb(err, false);
                }
                else
                {
                    cb(err, res);
                }
            });
        }
        else
        {
            cb(err, false);
        }
    });
}
