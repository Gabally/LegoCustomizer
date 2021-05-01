const sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports = (email, name, phone, notes, front, back, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS minifigorders (id INTEGER PRIMARY KEY, email TEXT NOT NULL, name TEXT NOT NULL, phone TEXT, notes TEXT NOT NULL, front TEXT NOT NULL, back TEXT NOT NULL)');
        db.run('INSERT INTO minifigorders VALUES (NULL, ?, ?, ?, ?, ?, ?)', [email, name, phone, notes, front, back], (err) => {
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
