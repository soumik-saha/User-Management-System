const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Access all static files
app.use(express.static('public'))  

// Templating Engine
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Connection Pool
const pool = mysql2.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME,
});

// Connect to Database
pool.getConnection((err, connection) => {
    if(err) throw err; // not connected!
    console.log('Connected as ID ' + connection.threadId);
});




// Router
app.get('/', (req, res) => {
    res.render('home.hbs');
});


app.listen(port, () => console.log('Listening on port', port));



// Start again from : 44:00 