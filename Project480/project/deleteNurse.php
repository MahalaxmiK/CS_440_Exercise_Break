
<!--
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: deleteNurse.php
    File Description: file that allows the admin to delete a nurse by inputting their ID#

    Last Updated: 11/22/23

-->

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <link rel="stylesheet" type="text/css" href="adminStyle.css">
</head>

<body>
    <form id="form" action="deleteNurse.php" method="POST">
        <button id="btn" onclick = "window.location.href='adminDashboard.php'">Back to Dashboard</button>
        <h1>-- Delete Nurse --</h1><br><br>
        <label for="nurseID">Enter Employee ID to Delete: </label>
        <input type="text" id="nurseID" name="nurseID" required><br><br>

        <input id="editbtn" type="submit" name="submit" value="Delete Nurse --">
    </form>

    <div id="result"></div>

</body>
</html>

<?php
        session_start();

        if (isset($_POST['submit'])) {
            // Get data from the form
            $NurseID = $_POST['nurseID'];

            include('connection.php'); // Include database connection

            // Check if the nurse exists
            $checkSql = "SELECT * FROM nurse WHERE `Employee ID` = '$NurseID'";
            $result = mysqli_query($conn, $checkSql);
            $row = mysqli_fetch_assoc($result);

            if ($row) {
                // if nurse found, delete
                $deleteSql = "DELETE FROM nurse WHERE `Employee ID` = '$NurseID'";
                if (mysqli_query($conn, $deleteSql)) {
                    echo '<p style="text-align: center; color: green; margin-top: 20px;">Nurse deleted successfully.</p>';
                } else {
                    echo '<p style="text-align: center; color: red; margin-top: 20px;">Error deleting nurse: ' . mysqli_error($conn) . '</p>';
                }
            } else {
                echo '<p style="text-align: center; color: red; margin-top: 20px;">Nurse not found.</p>';
            }

            // Close the database connection
            mysqli_close($conn);
        }
        ?>