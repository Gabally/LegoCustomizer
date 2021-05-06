const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

module.exports  = (password, cb) => {
    let db = new sqlite3.Database(process.env.DB_NAME);
    bcrypt.hash(password, 10, (err, hash) => {
        if(err)
        {
            cb(err);
        }
        else
        {
            db.run('UPDATE users SET password=?', hash, (err) => {
                cb(err);
            });
        }
    });
}
