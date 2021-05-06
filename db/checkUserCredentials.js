const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

module.exports  = (username, password, cb) => {
    let db = new sqlite3.Database(process.env.DB_NAME);
    db.get('SELECT * FROM users', (err, row) => {
        if(row)
        {
            bcrypt.compare(password, row.password, (err, res) => {
                if (err)
                {
                    cb(err, false);
                }
                else
                {
                    cb(err, (res && row.username === username));
                }
            });
        }
        else
        {
            cb(err, false);
        }
    });
}
