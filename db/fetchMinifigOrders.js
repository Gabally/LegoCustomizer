const sqlite3 = require('sqlite3').verbose();

module.exports  = ( cb) => {
    let db = new sqlite3.Database(process.env.DB_NAME);
    db.all('SELECT * FROM minifigorders', (err, row) => {
        cb(err, row);
    }); 
}
