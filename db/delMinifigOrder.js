var sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports  = (id, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.get('SELECT * FROM minifigorders WHERE id=?', id, (err, row) => {
        if (err)
        {
            throw err;
        }
        db.run('DELETE FROM minifigorders WHERE id=?', id, (err) => {
            cb(err, row);
        }); 
    });
}
