const express = require('express');
const routes = require('./routes');
const pageroutes = require('./pageroutes');
const path = require('path');
const session = require('express-session');
const util = require('./utils');

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

app.listen(5000, () => console.log('App listening on port 5000!'));