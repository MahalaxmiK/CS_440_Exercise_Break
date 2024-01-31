<!--

    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: cancelPatientVaccine.php
    File Description: Patient has the ability to choose whatever time vaccination time is available.

    Last Updated: 11/21/23

-->

<!-- NOT DONE -->
<?php 
    session_start();
    include('connection.php');
    $PatientID = $_SESSION['patientID'];
?>
   
<!DOCTYPE html>
<html>
<head>
    <title>Patient Vaccine</title>
    <link rel="stylesheet" type="text/css" href="patient.css">
</head>

<body>
    <div id="form" method = "POST">
        <button id="btn" onclick = "window.location.href='patientDashboard.php'">Back to Dashboard</button>
        <h1>-- Cancel a Vaccine Appointment--</h1>
        <h2>Please fill out the following information to cancel your appointment </h2>
        <form id="form1" method="POST">
            <label for="existingVaccine">Select an appointment you would like to cancel: </label>
            <select id="existingVaccine" name="existingVaccine" required>
                <option value="" disabled selected>-- View Selection --</option>
                <?php
                    include('connection.php');

                    $existingDose = "SELECT * FROM patientSchedule WHERE SSN = '$PatientID' AND `hour` != 'pending' AND `hour` != 'done'";
                    $result = mysqli_query($conn, $existingDose);

                    while ($row = mysqli_fetch_assoc($result)) {
                        echo '<option value="' . $row['vaccineName'] . '">' .$row['vaccineName'].', '.$row['hour'].'</option>';
                    }

                    mysqli_close($conn);
                ?>
            </select><br><br>

            <button id="editbtn" type="submit" name="submitBtn">Cancel Appointment</button>
        </form>
    </div>
</body>
</html>
 

<?php

    if (isset($_POST['submitBtn'])) {
        // Get data from the form
        $existingVaccine = $_POST['existingVaccine'];
        
        include('connection.php');

        $existingDose = "SELECT * FROM patientSchedule WHERE SSN = '$PatientID' and vaccineName = '$existingVaccine'";
        $result = mysqli_query($conn, $existingDose);
        $row = mysqli_fetch_assoc($result);
        $hour = $row['hour'];

        if ($row != null) { // patient exists in database
            if ($row['dose1Taken'] == 0) {
                // patient already made an appointment for first shot, hasn't gotten it
                //   DELETE from patientSchedule
                $existingPatients = "SELECT * FROM schedule WHERE `hour` = '$hour'";
                $result = mysqli_query($conn, $existingPatients);
                $row = mysqli_fetch_assoc($result);
                $existingQuantity = $row['numPatients'];
                
                $sql = "UPDATE schedule SET numPatients = $existingQuantity - 1 WHERE `hour` = '$hour'";

                // decrease onHold value for specified vaccine
                $vaccHold = "SELECT * FROM vaccine WHERE `vaccineName`= '$existingVaccine'";
                $result2 = mysqli_query($conn, $vaccHold);
                $row2 = mysqli_fetch_assoc($result2);
                $existingVaccHolds = $row2['onHold'];
                $sql2 = "UPDATE vaccine SET onHold = $existingVaccHolds - 1 WHERE `vaccineName`= '$existingVaccine'";

                $cancelPatient = "DELETE FROM `patientSchedule` WHERE SSN = '$PatientID' and vaccineName = '$existingVaccine'";

                if (mysqli_query($conn, $sql) & mysqli_query($conn, $sql2) & mysqli_query($conn, $cancelPatient)) {
                    echo '<p style="text-align: center; color: green; margin-top: 20px;">You have successfully cancelled your appointment!</p>';
                } else {
                    echo '<p style="text-align: center; color: red; margin-top: 20px;">Error cancelling</p>';
                }
            } else if ($row['hour'] == 'pending') { // should not get here, just in case tho
                // patient got first shot but hasn't made second appointment
                echo '<p style="text-align: center; color: red; margin-top: 20px;">You do not have any appointments to cancel!</p>';
            } else if ($row['dose2Taken'] == 0) {
                // update time so that they can adjust later
                $existingPatients = "SELECT * FROM schedule WHERE `hour` = '$hour'";
                $result = mysqli_query($conn, $existingPatients);
                $row = mysqli_fetch_assoc($result);
                $existingQuantity = $row['numPatients'];
                
                $sql = "UPDATE schedule SET numPatients = $existingQuantity - 1 WHERE `hour` = '$hour'";

                // decrease onHold value for specified vaccine
                $vaccHold = "SELECT * FROM vaccine WHERE `vaccineName`= '$existingVaccine'";
                $result2 = mysqli_query($conn, $vaccHold);
                $row2 = mysqli_fetch_assoc($result2);
                $existingVaccHolds = $row2['onHold'];
                $sql2 = "UPDATE vaccine SET onHold = $existingVaccHolds - 1 WHERE `vaccineName`= '$existingVaccine'";

                $cancelPatient = "UPDATE `patientSchedule` SET `hour` = 'pending' WHERE SSN = '$PatientID' and vaccineName = '$existingVaccine'";

                if (mysqli_query($conn, $sql) & mysqli_query($conn, $sql2) & mysqli_query($conn, $cancelPatient)) {
                    echo '<p style="text-align: center; color: green; margin-top: 20px;">You have successfully cancelled your appointment!</p>';
                } else {
                    echo '<p style="text-align: center; color: red; margin-top: 20px;">Error cancelling</p>';
                }
            } 
        } else {  // patient not in database
            echo '<p style="text-align: center; color: red; margin-top: 20px;">Error cancelling your appointment!</p>';
        }
        mysqli_close($conn);
    }
?>