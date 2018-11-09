const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());


app.use((req, res, next) => {
    var log = `${new Date()} ${req.method} ${req.url}\n`;
    fs.appendFile('server.log', log, (e) => {if(e)console.log('Error writing the server log file')});
    console.log(log);
    next();
});


/*app.use((req, res, next)=>{
    res.render('maintenance');
});*/

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        bodyText: 'Hello, welcome to my crappie page'
    });
});

//about
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({ errorMessage: "Unable to process the request" });
});

app.listen(port, () => console.log(`Server is up in the port ${port}`));