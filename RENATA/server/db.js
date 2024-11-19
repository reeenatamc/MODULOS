const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia por tu usuario de MySQL
    password: 'UTPL2023', // Cambia por tu contraseña de MySQL
    database: 'payments_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = db;
