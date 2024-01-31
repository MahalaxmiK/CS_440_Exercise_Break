<!--
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: registerPatient.php
    File Description: this file adds a new patient into the database. The patient fills out their information 
                      and upon submission will be added into the database using an INSERT sql query

    Last Updated: 11/22/23

-->

<!DOCTYPE html>
<html>
<head>
    <title>Patient Registration</title>
    <link rel="stylesheet" type="text/css" href="patient.css">
</head>

<body>
    <div id="form">
        <button id="btn" onclick = "window.location.href='index2.php'">Back to Login</button>
        <h1>-- New Patient Registration --</h1>
        <h2>Welcome! Please fill out the following information to add yourself to our database. </h2>
        <form id="form1" action="registerPatient.php" method="POST">
            <label for="FirstName">First Name ----- </label>
            <input type="text" id="FirstName" name="FirstName" required><br><br>

            <label for="initial">Middle Initial --- </label>
            <input type="text" id="initial" name="MiddleInitial" required><br><br>

            <label for="LastName">Last Name ----- </label>
            <input type="text" id="LastName" name="LastName" required><br><br>

            <label for="SSN">SSN # ---------- </label>
            <input type="text" id="ssn" name="SSN" required><br><br>

            <label for="age">Age ------------- </label>
            <input type="text" id="age" name="Age" required><br><br>

            <label for="gender">Gender --------- </label>
            <input type="text" id="gender" name="Gender" required><br><br>

            <label for="race">Race ------------- </label>
            <input type="text" id="race" name="Race" required><br><br>

            <label for="Occupation">Occupation Class </label>
            <input type="text" id="occupation" name="OccupationClass" required><br><br>

            <label for="MedicalHistory">Medical History </label>
            <input type="text" id="medicalHistory" name="MedicalHistory" required><br><br>

            <label for="phone">Phone # -------- </label>
            <input type="text" id="phone" name="Phone" required><br><br>

            <label for="address">Address -------- </label>
            <input type="text" id="address" name="Address" required><br><br>

            <label for="patientUsername">Username ----- </label>
            <input type="text" id="patientUsername" name="PatientUsername" required><br><br>

            <label for="patientPassword">Password ------ </label>
            <input type="password" id="patientPassword" name="PatientPassword" required><br><br>

            <input id="editbtn" type="submit" name="submit" value="Confirm Registration">
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
        $SSN = $_POST['SSN'];
        $Age = $_POST['Age'];
        $Gender = $_POST['Gender'];
        $Race = $_POST['Race'];
        $Occupation = $_POST['OccupationClass'];
        $MedicalHistory = $_POST['MedicalHistory'];
        $Phone = $_POST['Phone'];
        $Address = $_POST['Address'];
        $PatientUsername = $_POST['PatientUsername'];
        $PatientPassword = $_POST['PatientPassword'];


        include('connection.php'); // Include database connection

        $sql = "INSERT INTO `patient`(`Fname`, `MI`, `Lname`, `SSN`, `Age`, `Gender`, `Race`, `Occupation Class`, `Medical History Description`, `Phone #`, `Address`, `Username`, `Password`) VALUES ('$FirstName', '$MiddleInitial', '$LastName', '$SSN', '$Age', '$Gender', '$Race', '$Occupation', '$MedicalHistory', '$Phone', '$Address', '$PatientUsername', '$PatientPassword')";

        if (mysqli_query($conn, $sql)) {
            echo '<p style="text-align: center; color: green; margin-top: 20px;">Your registration was successful! New Patient added!</p>';
            exit();
        } else {
            echo '<p style="text-align: center; color: red; margin-top: 20px;">Error:  ' . mysqli_error($conn) . '</p>';
        }

        // Close the database connection
        mysqli_close($conn);
    }
?>