var sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports  = ( cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.run('CREATE TABLE IF NOT EXISTS minifigorders (id INTEGER PRIMARY KEY, inserted TEXT NOT NULL, email TEXT NOT NULL, name TEXT NOT NULL, phone TEXT, notes TEXT NOT NULL, front TEXT NOT NULL, back TEXT NOT NULL)', (e)=>{
            db.all('SELECT * FROM minifigorders', (err, row) => {
                cb(err, row);
            }); 
    });
}
