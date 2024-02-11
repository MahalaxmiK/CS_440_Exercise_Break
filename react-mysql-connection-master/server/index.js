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
    if(err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });

app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const height = req.body.height;
    const weight = req.body.weight;
    const age = req.body.age;

    con.query("INSERT INTO users (email, password, gender, height, weight, age) VALUES (?, ?, ?, ?, ?,?)", [email, password, gender, height, weight, age], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT ASKED DETAILS!"})
            }
        }
    )
})


app.listen(3000, () => {
    console.log("running backend server");
})
