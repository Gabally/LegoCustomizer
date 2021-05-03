var sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports  = (id, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.run('CREATE TABLE IF NOT EXISTS minifigorders (id INTEGER PRIMARY KEY, inserted TEXT NOT NULL, email TEXT NOT NULL, name TEXT NOT NULL, phone TEXT, notes TEXT NOT NULL, front TEXT NOT NULL, back TEXT NOT NULL)', (e)=>{
        db.get('SELECT * FROM minifigorders WHERE id=?', id, (err, row) => {
            cb(err, row);
        });
    });
}
