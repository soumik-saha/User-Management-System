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

            if (!err) {
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

            if (!err) {
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

            if (!err) {
                res.render('add-user', { alert: 'User added successfully.' });
            }
            else {
                console.log(err);
            }

            console.log('This data from users table: \n', rows);

        });
    });
}


// Edit User
exports.edit = (req, res) => {
    // res.render('edit-user');

    // Connect to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        // Use the connection
        connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            // What done with the connection, release it
            connection.release();

            if (!err) {
                res.render('edit-user', { rows });
            }
            else {
                console.log(err);
            }

            console.log('This data from users table: \n', rows);

        });
    });
}

// Update User
exports.update = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;

    // Connect to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        // Use the connection
        connection.query('UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
            // What done with the connection, release it
            connection.release();

            if (!err) {
                // res.render('edit-user', { rows });
                // Connect to Database
                pool.getConnection((err, connection) => {
                    if (err) throw err; // not connected!
                    console.log('Connected as ID ' + connection.threadId);

                    // Use the connection
                    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
                        // What done with the connection, release it
                        connection.release();

                        if (!err) {
                            res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
                        }
                        else {
                            console.log(err);
                        }

                        console.log('This data from users table: \n', rows);

                    });
                });

            }
            else {
                console.log(err);
            }

            console.log('This data from users table: \n', rows);

        });
    });
}


// Delete User
exports.delete = (req, res) => {
    // res.render('edit-user');

    // Connect to Database
    // pool.getConnection((err, connection) => {
    //     if (err) throw err; // not connected!
    //     console.log('Connected as ID ' + connection.threadId);

    //     // Use the connection
    //     connection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows) => {
    //         // What done with the connection, release it
    //         connection.release();

    //         if (!err) {
    //             res.redirect('/');
    //         }
    //         else {
    //             console.log(err);
    //         }

    //         console.log('This data from users table: \n', rows);

    //     });
    // });



    // Connect to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        // Use the connection
        connection.query('UPDATE users SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
            // What done with the connection, release it
            connection.release();

            if (!err) {
                // let removedUser = encodeURIComponent('User successfully removed.');
                // res.redirect('/?removed=' + removedUser);
                res.redirect('/');
            }
            else {
                console.log(err);
            }

            console.log('This data from users table: \n', rows);

        });
    });

}


// View Users
exports.viewall = (req, res) => {
    // Connect to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);

        // Use the connection
        connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            // What done with the connection , release it
            connection.release();

            if (!err) {
                res.render('view-user', { rows });
            }
            else {
                console.log(err);
            }

            console.log('This data from users table: \n', rows);

        });
    });
}
