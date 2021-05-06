const sqlite3 = require('sqlite3').verbose();

module.exports = (email, date, note, cb) => {
    let db = new sqlite3.Database(process.env.DB_NAME);
    db.run("INSERT INTO orders VALUES (NULL, date('now'), ?, ?, ?)", [email, date, note], (err) => {
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
}
