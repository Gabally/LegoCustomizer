var sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports  = ( cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, inserted TEXT NOT NULL, email TEXT NOT NULL, date TEXT NOT NULL, note TEXT NOT NULL)', (e) =>{
        db.all('SELECT * FROM orders', (err, row) => {
            cb(err, row);
        });
    });
}
