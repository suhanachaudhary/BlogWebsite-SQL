
import mysql from "mysql";

export const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "blogs",
  port: 3306
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection error:", err.message);
  } else {
    console.log("Connected to MySQL database.");
    connection.release();
  }
});
