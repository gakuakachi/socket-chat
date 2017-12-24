require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const publicPath = path.join(__dirname, '../public');

var app = express();

var port = process.env.PORT;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(`${publicPath}/index.html`);
});

app.listen(port, () => {
  console.log(`Started on ${ port }`);
});

module.exports = {app};

