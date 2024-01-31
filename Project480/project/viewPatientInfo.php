
<!--
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: viewPatientInfo.php
    File Description: file that lets the admin view patient info by inputting the patient SSN

    Last Updated: 11/24/23

-->

<!DOCTYPE html>
<html>
<head>
    <title>Admin Patient Info</title>
    <link rel="stylesheet" type="text/css" href="adminStyle.css">
</head>

<body>
   
    <form id="form" action="viewPatientInfo.php" method="POST">
        <button id="btn" onclick = "window.location.href='adminDashboard.php'">Back to Dashboard</button>
        <h1>-- View Patient Information --</h1><br>
        <label for="ssn">Patient SSN: </label>
        <input type="text" id="ssn" name="ssn" required><br>

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
        $PatientSSN = $_POST['ssn'];

        include('connection.php'); // Include database connection

        $sql = "SELECT * FROM patient WHERE `SSN` = '$PatientSSN'";

        if (mysqli_query($conn, $sql)) {
            $row = mysqli_fetch_assoc(mysqli_query($conn, $sql));

            if ($row) {
                echo '<div style="width: 40%; margin: 0 auto; padding: 20px; border: 5px solid #8dbcc4; margin-top: 20px;">';
                echo '<h2>Patient Information</h2>';
                
                echo '<p><strong>First Name:</strong> ' . $row['Fname'] . '</p>';
                echo '<p><strong>Middle Initial:</strong> ' . $row['MI'] . '</p>';
                echo '<p><strong>Last Name:</strong> ' . $row['Lname'] . '</p>';
                echo '<p><strong>SSN:</strong> ' . $row['SSN'] . '</p>';
                echo '<p><strong>Age:</strong> ' . $row['Age'] . '</p>';
                echo '<p><strong>Gender:</strong> ' . $row['Gender'] . '</p>';
                echo '<p><strong>Race:</strong> ' . $row['Race'] . '</p>';
                echo '<p><strong>Occupation Class:</strong> ' . $row['Occupation Class'] . '</p>';
                echo '<p><strong>Medical History Description:</strong> ' . $row['Medical History Description'] . '</p>';
                echo '<p><strong>Phone Number:</strong> ' . $row['Phone #'] . '</p>';
                echo '<p><strong>Address:</strong> ' . $row['Address'] . '</p>';
                // times they are scheduled for a vaccine
                echo '<p><strong>Scheduled Times:</strong></p>';
                $sql = "SELECT `vaccineName`, `dose1Taken`, `hour` FROM `patientSchedule` WHERE `SSN` = '$PatientSSN' and `hour` != 'pending' and `hour` != 'done' GROUP BY 'hour'";
                $result = mysqli_query($conn, $sql);
                while ($row = mysqli_fetch_assoc($result)) {
                    if ($row['dose1Taken'] == 0) {
                        echo  '~ '.$row['vaccineName'] . ' (Dose #1) scheduled at ' . $row['hour'] ;
                    } else {
                        echo  '~ '.$row['vaccineName'] . ' (Dose #2) scheduled at ' . $row['hour'] ;
                    }
                }
                /// vaccination history
                echo '<p><strong>Vaccination History:</strong></p>';
                $sql2 = "SELECT `vaccineName` FROM `patientSchedule` WHERE `SSN` = '$PatientSSN' and `hour` = 'pending' GROUP BY 'hour'";
                $result2 = mysqli_query($conn, $sql2);
                while ($row2 = mysqli_fetch_assoc($result2)) {
                        echo  '~ (Dose #1) of '.$row2['vaccineName'] . ' has been taken' ;
                }
                echo "<br><br>";
                $sql2 = "SELECT `vaccineName` FROM `patientSchedule` WHERE `SSN` = '$PatientSSN' and `hour` = 'done' GROUP BY 'hour'";
                $result2 = mysqli_query($conn, $sql2);
                while ($row2 = mysqli_fetch_assoc($result2)) {
                        echo  '~ Both doses of '.$row2['vaccineName'] . ' have been completed';
                }
                echo '</div>';
            } else {
                echo '<p style="text-align: center; color: red; margin-top: 20px;">Patient not found.</p>';
            }
        } else {
            echo 'Error: ' . mysqli_error($conn);
        }


        // Close the database connection
        mysqli_close($conn);
    }
?>
 

