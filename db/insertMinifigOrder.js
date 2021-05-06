const sqlite3 = require('sqlite3').verbose();

module.exports = (email, name, phone, notes, front, back, cb) => {
    let db = new sqlite3.Database(process.env.DB_NAME);
    db.run("INSERT INTO minifigorders VALUES (NULL, date('now'), ?, ?, ?, ?, ?, ?)", [email, name, phone, notes, front, back], (err) => {
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
}
