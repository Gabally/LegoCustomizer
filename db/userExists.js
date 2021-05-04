var sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports  = (cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.get('SELECT * FROM users', (err, row) => {
        if(row)
        {
            cb(err, true);
        }
        else
        {
            cb(err, false);
        }
    });
}
