const sqlite3 = require('sqlite3').verbose();

module.exports  = (emails, cb) => {
    let db = new sqlite3.Database(process.env.DB_NAME);
    db.run('DELETE FROM notifyemails', (e)=>{
        let stmt = db.prepare("INSERT INTO notifyemails VALUES (?)");
        emails.forEach(email => {
            stmt.run(email);
        });
        stmt.finalize();
        cb();
    });
}
