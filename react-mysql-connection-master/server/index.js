const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/*
  Team Contribution
*/
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    // password: "Cps45121690!",
    database: "register"
})

con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully Connected To MySQL database instance!!');
});

app.post('/register', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const height = req.body.height;
    const weight = req.body.weight;
    const age = req.body.age;

    con.query("INSERT INTO users (fname, lname, email, password, gender, height, weight, age) VALUES (?, ?, ?, ?, ?, ?, ?,?)", [fname, lname, email, password, gender, height, weight, age],
        (err, result) => {
            if(result){
                res.send(result);
            }else{
              res.send({message: "ENTER CORRECT ASKED DETAILS!"})
            }
        }
    )
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    con.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], 
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

const bodyParser = require('body-parser');
const PORT = 3001;

app.use(bodyParser.json());

app.post('/api/heart-rate', (req, res) => {
  const heartRate = req.body.heartRate;
  // Process the heart rate data as needed
  console.log(`Received heart rate: ${heartRate}`);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/handleSubmit', (req, res) => {
    const email = req.body.email;
    const hasDrink = req.body.hasDrink;
  
    console.log("Received email:", email);
    console.log("Received hasDrink:", hasDrink);
  
    con.query(
      "UPDATE users SET hasDrink = ? WHERE email = ?",
      [hasDrink, email],
      (err, result) => {
        if (err) {
          console.error('Error updating user drink status:', err);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          console.log(result);
          if (result.affectedRows > 0) {
            res.status(200).json({ message: "Successfully added drink status!" });
          } else {
            res.status(404).json({ message: "Wrong Email!" });
          }
        }
      }
    );
});
  
app.post('/submitWantDrink', (req, res) => {
    const email = req.body.email;
    const wantDrink = req.body.wantDrink;
  
    console.log("Received email:", email);
    console.log("Received wantDrink:", wantDrink);
  
    con.query(
      "UPDATE users SET wantDrink = ? WHERE email = ?",
      [wantDrink, email],
      (err, result) => {
        if (err) {
          console.error('Error updating user drink status:', err);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          console.log(result);
          if (result.affectedRows > 0) {
            res.status(200).json({ message: "Successfully added want drink status!" });
          } else {
            res.status(404).json({ message: "Wrong Email!" });
          }
        }
      }
    );
  });

app.listen(3000, () => {
    console.log("Running Exercise Break App Server!!");
})