const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});

async function testConnecion() {
    try {
        const connection = await db.promise().getConnection();
        console.log("DB connection successful");
        connection.release();
    } catch (error) {
        console.error("Db connection failed",error);
    }
}
testConnecion();
module.exports = db;