
<!--
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: index2.php
    File Description: creates the login page and takes in the username, password, and user type

    Last Updated: 11/23/23

-->

<?php 
    include("connection.php");
    include("login.php");
?>
   
<!DOCTYPE html>
<html lang = "en">
<head>
    <meta charset = "UTF-8">
    <meta http-equiv = "X-UA-Compatible" content = "IE=edge">
    <meta name ="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="LoginStyle.css">
    <style>
        .newUser {
            color:rgb(0, 0, 0);
            background-color:rgb(255, 180, 180);
            padding: 4px 4px;
            align-self: right;
            border-radius: 5px;
            float: right;
        }
    </style>
</head>
<body>
    <div id="form">
        <h1>UI Health Login!!</h1>
        <form name="form" method="POST">
            <label>Username: </label>
            <input type="text" id="user" name="user"></br></br>
            <label>Password: </label>
            <input type="password" id="pass" name="pass"></br></br>
            <label for="userType">Select User Type:</label>
            <select id="userType" name="userType">
                <option value="" disabled selected>Select an option</option>
                <option value="admin">Admin</option>
                <option value="nurse">Nurse</option>
                <option value="patient">Patient</option>
            </select><br><br>
            <input type="submit" id="btn" value="Login" name = "submit"/><br><br>
        </form>
        <button class="newUser" onclick = "window.location.href='registerPatient.php'">New User</button>
    </div>
    <script>
        function isvalid() {
            var user = document.form.user.value;
            var pass = document.form.pass.value;
            var userType = document.form.userType.value;

            if (user.length === 0 || pass.length === 0) {
                alert("Username and password fields are required.");
                return false;
            } else if (userType === "default") {
                alert("Please select a user type.");
                return false;
            }
        }   
    </script>   

</body>
</html>