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
    // res.render('home'); 


    // Connect to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        
        // Use the connection
        connection.query('SELECT * FROM users', (err, rows) => {
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