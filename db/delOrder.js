const sqlite3 = require('sqlite3').verbose();

module.exports  = (id, cb) => {
    let db = new sqlite3.Database(process.env.DB_NAME);
    db.run('DELETE FROM orders WHERE id=?', id, (err) => {
        cb(err);
    });
}
