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
                req.setEncoding({err: err});
            } else {
                console.log(result);
                if (result.length > 0) {
                    res.send({message: "Successfully logged in!"});
                } else {
                    res.send({message: "Wrong email or password or both!!"})
                }
            }
        }
    )
})

app.listen(3000, () => {
    console.log("Running Exercise Break App Server!!");
})