const sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports = (email, date, note, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, email TEXT NOT NULL, date TEXT NOT NULL, note TEXT NOT NULL)');
        db.run('INSERT INTO orders VALUES (NULL, ?, ?, ?)', [email, date, note], (err) => {
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
    });
}
