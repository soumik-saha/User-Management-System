const mysql2 = require('mysql2')
require('dotenv').config();

// Connection Pool
const pool = mysql2.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});



// View Users
exports.view = (req, res) => {
    // Connect to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        
        // Use the connection
        connection.query('SELECT * FROM users WHERE status = "active"', (err, rows) => {
            // What done with the connection, release it
            connection.release();

            if(!err) {
                res.render('home', { rows });
            }
            else {
                console.log(err);
            }

            console.log('This data from users table: \n', rows);

        });
    });
}

// Find User by Search
exports.find = (req, res) => {
    // Connect to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        
        let searchTerm = req.body.search;

        // Use the connection
        connection.query('SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // What done with the connection, release it
            connection.release();

            if(!err) {
                res.render('home', { rows });
            }
            else {
                console.log(err);
            }

            console.log('This data from users table: \n', rows);

        });
    });

    

}

// Add New User Form
exports.form = (req, res) => {
    res.render('add-user');
}

// Add New User
exports.create = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;

    // Connect to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        
        let searchTerm = req.body.search;

        // Use the connection
        connection.query('INSERT INTO users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
            // What done with the connection, release it
            connection.release();

            if(!err) {
                res.render('add-user', { alert: 'User added successfully.' });
            }
            else {
                console.log(err);
            }

            console.log('This data from users table: \n', rows);

        });
    });
}