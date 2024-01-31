<!--
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: registerNurse.php
    File Description: this file adds a new nurse into the database. The admin will fill out the information for the new nurse
                      and then that nurse will be added into the database using an INSERT sql query

    Last Updated: 11/19/23

-->

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <link rel="stylesheet" type="text/css" href="adminStyle.css">
</head>

<body>
    <div id="form">
        <button id="btn" onclick = "window.location.href='adminDashboard.php'">Back to Dashboard</button>
        <h1>-- Register Nurse --</h1>
        <h2>Please fill out the following information to add a new nurse to the database. </h2>
        <form id="form1" action="registerNurse.php" method="POST">
            <label for="FirstName">First Name ----- </label>
            <input type="text" id="FirstName" name="FirstName" required><br><br>

            <label for="initial">Middle Initial --- </label>
            <input type="text" id="initial" name="MiddleInitial" required><br><br>

            <label for="LastName">Last Name ----- </label>
            <input type="text" id="LastName" name="LastName" required><br><br>

            <label for="ID">ID # -------------- </label>
            <input type="text" id="ID" name="ID" required><br><br>

            <label for="age">Age -------------- </label>
            <input type="text" id="age" name="Age" required><br><br>

            <label for="gender">Gender --------- </label>
            <input type="text" id="gender" name="Gender" required><br><br>

            <label for="phone">Phone # -------- </label>
            <input type="text" id="phone" name="Phone" required><br><br>

            <label for="address">Address -------- </label>
            <input type="text" id="address" name="Address" required><br><br>

            <label for="nurseUsername">Username ----- </label>
            <input type="text" id="nurseUsername" name="NurseUsername" required><br><br>

            <label for="nursePassword">Password ------ </label>
            <input type="password" id="nursePassword" name="NursePassword" required><br><br>

            <input id="editbtn" type="submit" name="submit" value="Register Nurse">
        </form>
    </div>
</body>
</html>
 

<?php
    session_start();
    $successMessage = "";
    
    if (isset($_POST['submit'])) {
        // Get data from the form
        $FirstName = $_POST['FirstName'];
        $MiddleInitial = $_POST['MiddleInitial'];
        $LastName = $_POST['LastName'];
        $ID = $_POST['ID'];
        $Age = $_POST['Age'];
        $Gender = $_POST['Gender'];
        $Phone = $_POST['Phone'];
        $Address = $_POST['Address'];
        $NurseUsername = $_POST['NurseUsername'];
        $NursePassword = $_POST['NursePassword'];

        include('connection.php');

        $sql = "INSERT INTO `nurse`(`Fname`, `MI`, `Lname`, `Employee ID`, `Age`, `Gender`, `Phone #`, `Address`, `Username`, `Password`) VALUES ('$FirstName', '$MiddleInitial', '$LastName', '$ID', '$Age', '$Gender', '$Phone', '$Address', '$NurseUsername', '$NursePassword')";

        if (mysqli_query($conn, $sql)) {
            echo '<p style="text-align: center; color: green; margin-top: 20px;">Nurse registration was successful!</p>';
            exit();
        } else {
            echo '<p style="text-align: center; color: red; margin-top: 20px;">Error: ' . mysqli_error($conn) . '</p>';
        }

        // Close the database connection
        mysqli_close($conn);
    }
?>