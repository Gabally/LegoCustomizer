const sqlite3 = require('sqlite3').verbose();

module.exports  = (id, cb) => {
    let db = new sqlite3.Database(process.env.DB_NAME);
    db.get('SELECT * FROM minifigorders WHERE id=?', id, (err, row) => {
        cb(err, row);
    });
}
