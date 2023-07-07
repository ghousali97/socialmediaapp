const mySql = require('mysql');
const fs = require('fs');
require('dotenv').config();


//use this in production
//ssl: {
// ca: fs.readFileSync("{ca-cert filename}")
//}
var connectionParams = {
    host: process.env.DB_URL,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    ssl: {
        rejectUnauthorized: false

    }
};

var db = mySql.createConnection(connectionParams);




db.connect((err, connection) => {
    if (err) {
        console.log("Connection to database failed");

    } else {
        console.log("Successfully conntected to the database");
    }
});


module.exports = db;