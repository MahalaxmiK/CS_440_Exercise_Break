const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "register"
})

con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully Connected To MySQL database instance!!');
});


app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    con.query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password], 
        (err, result) => {
            if (err) {
                console.error("Error querying the database:", err);
                res.status(500).send({ message: "Internal server error" });
            } else {
                console.log(result);
                if (result.length > 0) {
                    // Send HTTP status code 200 for successful login
                    res.status(200).send({ message: "Successfully logged in!" });
                } else {
                    // Send HTTP status code 401 for unauthorized access
                    res.status(401).send({ message: "Wrong email or password or both!" });
                }
            }
        }
    )
})

app.listen(3000, () => {
    console.log("Running Exercise Break App Server!!");
})