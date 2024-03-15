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
                if (result.length > 0) {
                  //const { fname, lname } = result[0]; // Extract first and last name from the result
                  console.log(result);
                  res.status(200).send({ message: "Successfully logged in!" });
                } else {
                    // Send HTTP status code 401 for unauthorized access
                    res.status(401).send({ message: "Wrong email or password or both!" });
                }
            }
        }
    )
});

app.post('/updateUserDetails', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const height = req.body.height;
    const weight = req.body.weight;
    const age = req.body.age;

    // Check if a user with the provided fname and lname exists
    con.query("SELECT * FROM users WHERE fname = ? AND lname = ?", [fname, lname], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).send({ message: "Internal server error" });
            return;
        }

        if (result.length > 0) {
            // If user exists, update their information
            con.query("UPDATE users SET email = ?, password = ?, gender = ?, height = ?, weight = ?, age = ? WHERE fname = ? AND lname = ?", 
                [email, password, gender, height, weight, age, fname, lname], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error("Error updating user details:", updateErr);
                        res.status(500).send({ message: "Error updating user details" });
                    } else {
                        res.send({ message: "User details updated successfully" });
                    }
                });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    });
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