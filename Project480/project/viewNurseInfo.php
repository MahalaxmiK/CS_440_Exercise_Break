<!--
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: viewNurseInfo.php
    File Description: file that lets the admin view nurse info by inputting the nurse ID

    Last Updated: 11/24/23

-->

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="adminStyle.css">
    <style>
        
        .center-button {
            background-color:rgb(255,255,255);
            display: block;
            padding: 4px 4px;
            margin-left: auto;
            margin-right: auto;
            border-radius: 5px;
        }
    </style>
    <title>Nurse Info</title>
</head>

<body>
    <form id="form" action="viewNurseInfo.php" method="POST">
        <button id="btn" onclick = "window.location.href='adminDashboard.php'">Back to Dashboard</button>
        <h1>-- View Nurse Information --</h1>
        <label for="nurseID">Employee ID: </label>
        <input type="text" id="nurseID" name="nurseID" required><br><br>

        <input id="editbtn" type="submit" name="submit" value="View Information">
    </form>
    <div id="result"></div>

</body>
</html>

<?php
    session_start();
    $successMessage = "";
    
    if (isset($_POST['submit'])) {
        // Get data from the form
        $NurseID = $_POST['nurseID'];

        include('connection.php'); // Include database connection

        $sql = "SELECT * FROM nurse WHERE `Employee ID` = '$NurseID'";
        // mysqli_query($conn, $sql);

        if (mysqli_query($conn, $sql)) {
            $row = mysqli_fetch_assoc(mysqli_query($conn, $sql));

            if ($row) {
                echo '<div style="width: 40%; margin: 0 auto; padding: 20px; border: 5px solid #8dbcc4; margin-top: 10px;">';
                echo '<h2>Nurse Information</h2>';
                echo '<p><strong>First Name:</strong> ' . $row['Fname'] . '</p>';
                echo '<p><strong>Middle Initial:</strong> ' . $row['MI'] . '</p>';
                echo '<p><strong>Last Name:</strong> ' . $row['Lname'] . '</p>';
                echo '<p><strong>Employee ID:</strong> ' . $row['Employee ID'] . '</p>';
                echo '<p><strong>Age:</strong> ' . $row['Age'] . '</p>';
                echo '<p><strong>Gender:</strong> ' . $row['Gender'] . '</p>';
                echo '<p><strong>Phone Number:</strong> ' . $row['Phone #'] . '</p>';
                echo '<p><strong>Address:</strong> ' . $row['Address'] . '</p>';
                // times they have scheduled
                echo '<p><strong>Scheduled Times:</strong></p>';
                $sql2 = "SELECT DISTINCT(`hour`), COUNT(`hour`) as 'total' FROM `nurseSchedule` WHERE `ID` = '$NurseID' GROUP BY 'hour'";
                $result2 = mysqli_query($conn, $sql2);
                while ($row2 = mysqli_fetch_assoc($result2)) {
                    echo  $row2['total'] . ' slot(s) at ' . $row2['hour'] ;
                }
                echo '</div>';
            } else {
                echo '<p style="text-align: center; color: red; margin-top: 20px;">Nurse not found.</p>';
            }
        } else {
            echo 'Error: ' . mysqli_error($conn);
        }


        // Close the database connection
        mysqli_close($conn);
    }
?>
 

