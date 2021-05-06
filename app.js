require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const pageroutes = require('./pageroutes');
const path = require('path');
const session = require('express-session');
const util = require('./utils');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(express.json({limit: '10mb'}));

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

let db = new sqlite3.Database(process.env.DB_NAME);
db.run('CREATE TABLE IF NOT EXISTS users (username TEXT NOT NULL, password TEXT NOT NULL)');
db.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, inserted TEXT NOT NULL, email TEXT NOT NULL, date TEXT NOT NULL, note TEXT NOT NULL)');
db.run('CREATE TABLE IF NOT EXISTS minifigorders (id INTEGER PRIMARY KEY, inserted TEXT NOT NULL, email TEXT NOT NULL, name TEXT NOT NULL, phone TEXT, notes TEXT NOT NULL, front TEXT NOT NULL, back TEXT NOT NULL)');
db.run('CREATE TABLE IF NOT EXISTS notifyemails (email TEXT NOT NULL)');

if(!process.env.SENDGRID_API_KEY)
{
    console.log('You need to se the SENDGRID_API_KEY env variable before starting');
}
if(!process.env.SENDGRID_SENDER)
{
    console.log('You need to se the SENDGRID_SENDER env variable before starting');
}

app.listen(process.env.APP_PORT, () => {
    console.log(`App listening on port ${process.env.APP_PORT}!`)
});