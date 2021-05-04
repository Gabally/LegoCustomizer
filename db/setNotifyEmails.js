var sqlite3 = require('sqlite3').verbose();
const config = require('../config');

module.exports  = (emails, cb) => {
    let db = new sqlite3.Database(config.DBNAME);
    db.run('DELETE FROM notifyemails', (e)=>{
        let stmt = db.prepare("INSERT INTO notifyemails VALUES (?)");
        emails.forEach(email => {
            stmt.run(email);
        });
        stmt.finalize();
        cb();
    });
}
