<!-- 

Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project

File Name: viewMyNurseInfo
File Description: With use of a sql query and echo messages, the nurse information is displayed on the screen.

Last Updated: 11/24/23 

-->

<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="nurse.css">
    <style>
        /* Center the button horizontally */
        .center-button {
            background-color:rgb(255,255,255);
            display: block;
            padding: 4px 4px;
            margin-left: auto;
            margin-right: auto;
            border-radius: 5px;
        }
    </style>
    <title>Nurse view Info</title>
</head>
<body>
    <br><br><button class="center-button" onclick = "window.location.href='nurseDashboard.php'">back</button>
</body>
</html>

<?php
    session_start();
    $successMessage = "";
    
    // Get data from the form
    $NurseID = $_SESSION['nurseID'];

    include('connection.php'); // Include database connection

    $sql = "SELECT * FROM nurse WHERE `Employee ID` = '$NurseID'";
    // mysqli_query($conn, $sql);

    if (mysqli_query($conn, $sql)) {
        $row = mysqli_fetch_assoc(mysqli_query($conn, $sql));

        if ($row) {
            echo '<div style="width: 40%; margin: 0 auto; padding: 20px; border: 5px solid #8dbcc4; margin-top: 20px;">';
            echo '<h2>Viewing Your Information</h2>';
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
            echo '<p style="text-align: center; color: red; margin-top: 20px;">Info not found.</p>';
        }
    } else {
        echo 'Error: ' . mysqli_error($conn);
    }

    // Close the database connection
    mysqli_close($conn);

?>
 

