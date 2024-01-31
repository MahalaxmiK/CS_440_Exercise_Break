<!--
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: addVaccine.php
    File Description: this file adds a new vaccine to the database when receiving doses

    Last Updated: 11/24/23

-->

<!DOCTYPE html>
<html>
<head>
    <title>Add Vaccine</title>
    <link rel="stylesheet" type="text/css" href="adminStyle.css">
</head>

<body>
    <div id="form" method = "POST">
        <button id="btn" onclick = "window.location.href='adminDashboard.php'">Back to Dashboard</button>
        <h1>-- Add Vaccine --</h1>
        <h2>Please fill out the following information to add a vaccine to the database </h2>
        <form id="form1" method="POST">
            <label for="vaccineName">Vaccine Name: </label>
            <input type="text" id="vaccineName" name="vaccineName" required><br><br>

            <label for="doses">Number of Doses: </label>
            <input type="number" id="doses" name="doses" required><br><br>

            <button id="editbtn" type="submit" name="submitBtn">Add Vaccine</button>
        </form>
    </div>
</body>
</html>
 

<?php
session_start();
$successMessage = "";

if (isset($_POST['submitBtn'])) {
    // Get data from form
    $vaccineName = $_POST['vaccineName'];
    $doses = $_POST['doses'];

    include('connection.php');

    // Add new vaccine
    $sql = "INSERT INTO vaccine (vaccineName, quantity, onHold) VALUES ('$vaccineName', $doses, '0')";

    if (mysqli_query($conn, $sql)) {
        echo '<p style="text-align: center; color: green; margin-top: 20px;">Vaccine Added Successfully!</p>';
    } else {
        echo '<p style="text-align: center; color: red; margin-top: 20px;">Error Adding Vaccine: ' . mysqli_error($conn) . '</p>';
    }

    mysqli_close($conn);
}
?>