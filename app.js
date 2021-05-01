const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(express.json({limit: "15mb"}));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'customtorsogenerator.html'));
});

app.get('/orderform', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'order.html'));
});

app.use('/api', routes);

app.listen(5000, () => console.log('App listening on port 5000!'));