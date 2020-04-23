const express = require('express');
const port = 3000;
const app = express();
const route = require('./routes/index.js');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'cftvgasjdfk',
    resave: false,
    saveUninitialized: false
}));
  
app.use('/', route);
app.listen(port, () => {
    console.log(`Listening to Port ${port}`);
});
