
<!--
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: updateNurse.php
    File Description: file that allows the admin to update info about the nurse, except their phone# and address

    Last Updated: 11/22/23

-->
<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <link rel="stylesheet" type="text/css" href="adminStyle.css">
</head>

<body>
    <form id="form" method="POST">
        <button id="btn" onclick = "window.location.href='adminDashboard.php'">Back to Dashboard</button>
        <h1>-- Update Nurse Information --</h1><br><br>
        <label for="nurseID">Employee ID: </label>
        <input type="text" id="nurseID" name="nurseID" required><br><br>

        <label for="updateField">Field to Update: </label>
        <select id="updateField" name="updateField">
            <option value="" disabled selected>Select Field to Update:</option>
            <option value="Fname">First Name</option>
            <option value="MI">Middle Initial</option>
            <option value="Lname">Last Name</option>
            <option value="Employee ID">Employee ID</option>
            <option value="Age">Age</option>
            <option value="Gender">Gender</option>
            <option value="Username">Username</option>
            <option value="Password">Password</option>
        </select><br><br>

        <label for="newValue">New Value: </label>
        <input type="text" id="newValue" name="newValue" required><br><br>

        <input id="editbtn" type="submit" name="submitBtn" value="Update Nurse">
    </form>
</body>
</html>
 
<?php
        session_start();

        if (isset($_POST['submitBtn'])) {
            // Get data from the form
            $NurseID = $_POST['nurseID'];
            $updateField = $_POST['updateField'];
            $newValue = $_POST['newValue'];

            include('connection.php'); // Include database connection

            // Check if the nurse exists
            $checkSql = "SELECT * FROM nurse WHERE `Employee ID` = '$NurseID'";
            $result = mysqli_query($conn, $checkSql);
            $row = mysqli_fetch_assoc($result);

            if ($row) {
                // Nurse found, proceed with update
                $updateSql = "UPDATE nurse SET `$updateField` = '$newValue' WHERE `Employee ID` = '$NurseID'";
                if (mysqli_query($conn, $updateSql)) {
                    echo '<p style="text-align: center; color: green; margin-top: 20px;">Nurse information updated successfully.</p>';
                } else {
                    echo '<p style="text-align: center; color: red; margin-top: 20px;">Error updating nurse information: ' . mysqli_error($conn) . '</p>';
                }
            } else {
                echo '<p style="text-align: center; color: red; margin-top: 20px;">Nurse not found.</p>';
            }

            // Close the database connection
            mysqli_close($conn);
        }
        ?>