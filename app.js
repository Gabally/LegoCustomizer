const express = require('express');
const routes = require('./routes');
const pageroutes = require('./pageroutes');
const path = require('path');
const session = require('express-session');
const util = require('./utils');
const config = require('./config');
var sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(express.json({limit: '15mb'}));

app.use(session({
    secret: util.randomString(30),
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'customtorsogenerator.html'));
});

app.get('/orderform', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'order.html'));
});

app.use('/api', routes);
app.use(pageroutes);

let db = new sqlite3.Database(config.DBNAME);
db.run('CREATE TABLE IF NOT EXISTS users (username TEXT NOT NULL, password TEXT NOT NULL)');
db.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, inserted TEXT NOT NULL, email TEXT NOT NULL, date TEXT NOT NULL, note TEXT NOT NULL)');
db.run('CREATE TABLE IF NOT EXISTS minifigorders (id INTEGER PRIMARY KEY, inserted TEXT NOT NULL, email TEXT NOT NULL, name TEXT NOT NULL, phone TEXT, notes TEXT NOT NULL, front TEXT NOT NULL, back TEXT NOT NULL)');
db.run('CREATE TABLE IF NOT EXISTS notifyemails (email TEXT NOT NULL)');

app.listen(5000, () => console.log('App listening on port 5000!'));