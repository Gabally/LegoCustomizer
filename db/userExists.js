const sqlite3 = require('sqlite3').verbose();

module.exports  = (cb) => {
    let db = new sqlite3.Database(process.env.DB_NAME);
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
