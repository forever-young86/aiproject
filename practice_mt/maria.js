const mysql = require("mysql");

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'mylist'
});

conn.connect((err) => {
    if (err) {
        console.error('MariaDB connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MariaDB as id ' + conn.threadId);
});

module.exports = conn;