const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb1"
});

conn.connect(function(err) {
    if (err) {
        console.log(err);
    }else{
        console.log("Connected to database");
    }
});

module.exports = conn;