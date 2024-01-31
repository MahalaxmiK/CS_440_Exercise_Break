<!--

    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: updatePatientInfo.php
    File Description: Patient has the ability to choose whatever field of information in their database 
                    they would like to update.

    Last Updated: 11/25/23

-->

<!DOCTYPE html>
<html>
<head>
    <title>Patient Dashboard</title>
    <link rel="stylesheet" type="text/css" href="patient.css">
</head>

<body>
    <div id="form">
        <form id="form1" method="POST">
            <button id="btn" onclick = "window.location.href='patientDashboard.php'">Back to Dashboard</button>
            <h1>-- Update Patient Information --</h1><br><br>

            <label for="updateField">Field to Update: </label>
            <select id="updateField" name="updateField" required>
                <option value="" disabled selected>Select Field to Update:</option>
                <option value="Fname">First Name</option>
                <option value="MI">Middle Initial</option>
                <option value="Lname">Last Name</option>
                <option value="SSN">SSN</option>
                <option value="Age">Age</option>
                <option value="Gender">Gender</option>
                <option value="Race">Race</option>
                <option value="Occupation Class">Occupation Class</option>
                <option value="Medical History Description">Medical History Description</option>
                <option value="Username">Username</option>
                <option value="Password">Password</option>
            </select><br><br><br>

            <label for="newValue">New Value: </label>
            <input type="text" id="newValue" name="newValue" required><br><br>

            <input id="editbtn" type="submit" name="submitBtn" value="Update Info">
        </form>
    </div>
</body>
</html>
 
<?php
    session_start();
    $PatientID = $_SESSION['patientID'];

    if (isset($_POST['submitBtn'])) {
        // Get data from the form
        $updateField = $_POST['updateField'];
        $newValue = $_POST['newValue'];

        include('connection.php'); // Include database connection

        // Check if the nurse exists
        $checkSql = "SELECT * FROM patient WHERE `SSN` = '$PatientID'";
        $result = mysqli_query($conn, $checkSql);
        $row = mysqli_fetch_assoc($result);

        if ($row) {
            // Nurse found, proceed with update
            $updateSql = "UPDATE patient SET `$updateField` = '$newValue' WHERE `SSN` = '$PatientID'";
            if (mysqli_query($conn, $updateSql)) {
                echo '<p style="text-align: center; color: green; margin-top: 20px;">Patient information updated successfully.</p>';
            } else {
                echo '<p style="text-align: center; color: red; margin-top: 20px;">Error updating your information: ' . mysqli_error($conn) . '</p>';
            }
        } else {
            echo '<p style="text-align: center; color: red; margin-top: 20px;">Nurse not found.</p>';
        }

        // Close the database connection
        mysqli_close($conn);
    }
?>