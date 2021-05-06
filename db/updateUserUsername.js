const sqlite3 = require('sqlite3').verbose();

module.exports  = (username, cb) => {
    let db = new sqlite3.Database(process.env.DB_NAME);
    db.run('UPDATE users SET username=?', username, (err) => {
        cb(err);
    });
}
