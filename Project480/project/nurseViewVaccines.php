<!-- 

Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project

File Name: nurseViewVaccines
File Description: Displays the current vaccines in the repositories, upon button press, the nurse can record that a vaccine dosage
has officially been given.

Last Updated: 11/24/23 

-->

<?php 
    include("connection.php");
    session_start();
    $NurseID = $_SESSION['nurseID'];
?>
   
<!DOCTYPE html>
<html lang = "en">
<head>
    <meta charset = "UTF-8">
    <meta http-equiv = "X-UA-Compatible" content = "IE=edge">
    <meta name ="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Nurse</title>
    <link rel="stylesheet" type="text/css" href="nurse.css">
</head>
<body>
    <div id="form">
        <button id="btn" onclick = "window.location.href='nurseDashboard.php'">back to home page</button><br><br>
        <h1>-- Record a Vaccine --</h3>
        <h2>Please fill out the following information to record an appointment into the database: </h2>
        <form id="form1" method="POST">
            <label for="vaccineTime">Select a time slot: </label>
            <select id="vaccineTime" name="vaccineTime" required>
                <option value="" disabled selected>-- View Selection --</option>
                <?php
                    include('connection.php');

                    $sql2 = "SELECT DISTINCT(`hour`) as `hour` FROM `nurseSchedule` WHERE `ID` = '$NurseID'";
                    $result2 = mysqli_query($conn, $sql2);
                    while ($row2 = mysqli_fetch_assoc($result2)) {
                        echo '<option value="' . $row2['hour'] . '">' . $row2['hour'] . '</option>';
                    }
                    mysqli_close($conn);
                ?>
            </select><br><br>

            <label for="doses">Enter SSN of Patient who was vaccinated: </label>
            <input type="text" id="patientID" name="patientID" required><br><br>

            <button id="editbtn" type="submit" name="submitBtn">Record Vaccine</button>
        </form>
    </div>
</body>
</html>


<?php

// update schedule, decrease nurse Count and patient Count,
//  delete 1 slot from corresponding time in nurseSchedule,
// update patientSchedule - doseXTaken
    if (isset($_POST['submitBtn'])) {
        // Get data from the form
        $vaccineTime = $_POST['vaccineTime'];
        $patientID = $_POST['patientID'];
        
        include('connection.php');

        $existingDose = "SELECT * FROM patientSchedule WHERE SSN = '$patientID' and `hour` = '$vaccineTime'";
        $result = mysqli_query($conn, $existingDose);
        $row = mysqli_fetch_assoc($result);
        $existingVaccine = $row['vaccineName'];

        if ($row != null) { // patient exists in database
            if (($row['dose1Taken'] == 0) & ($row['dose2Taken'] == 0)) {
                // update to 1, set hour to pending
                $existingPatients = "SELECT * FROM schedule WHERE `hour` = '$vaccineTime'";
                $result = mysqli_query($conn, $existingPatients);
                $row = mysqli_fetch_assoc($result);
                $existingNurses = $row['numNurses'];
                $existingPatients = $row['numPatients'];
                
                $sql = "UPDATE schedule SET numNurses = $existingNurses - 1, numPatients = $existingPatients - 1 WHERE `hour` = '$vaccineTime'";

                $cancelNurse = "DELETE FROM `nurseSchedule` WHERE `hour` = '$vaccineTime' and `ID` = '$NurseID' LIMIT 1";

                $updatePatient = "UPDATE `patientSchedule` SET `hour`= 'pending', `dose1Taken`='1' WHERE SSN = '$patientID' and `hour` = '$vaccineTime'";

                // decrease onHold value for specified vaccine, subtract 1 from total quantity
                $vaccHold = "SELECT * FROM vaccine WHERE `vaccineName`= '$existingVaccine'";
                $result2 = mysqli_query($conn, $vaccHold);
                $row2 = mysqli_fetch_assoc($result2);
                $existingVaccHolds = $row2['onHold'];
                $existingTotalVaccines = $row2['quantity'];
                $sql2 = "UPDATE vaccine SET `quantity`= $existingTotalVaccines - 1, onHold = $existingVaccHolds - 1 WHERE `vaccineName`= '$existingVaccine'";

                if (mysqli_query($conn, $sql) & mysqli_query($conn, $sql2) & mysqli_query($conn, $cancelNurse) & mysqli_query($conn, $updatePatient)) {
                    echo '<p style="text-align: center; color: green; margin-top: 20px;">You have successfully recorded the appointment!</p>';
                } else {
                    echo '<p style="text-align: center; color: red; margin-top: 20px;">Error recording appointment</p>';
                }
            } else if (($row['dose1Taken'] == 1) & ($row['dose2Taken'] == 0)) {
                $existingPatients = "SELECT * FROM schedule WHERE `hour` = '$vaccineTime'";
                $result = mysqli_query($conn, $existingPatients);
                $row = mysqli_fetch_assoc($result);
                $existingNurses = $row['numNurses'];
                $existingPatients = $row['numPatients'];
                
                $sql = "UPDATE schedule SET numNurses = $existingNurses - 1, numPatients = $existingPatients - 1 WHERE `hour` = '$vaccineTime'";

                $cancelNurse = "DELETE FROM `nurseSchedule` WHERE `hour` = '$vaccineTime' and `ID` = '$NurseID' LIMIT 1";

                $updatePatient = "UPDATE `patientSchedule` SET `hour`= 'done', `dose2Taken`='1' WHERE SSN = '$patientID' and `hour` = '$vaccineTime'";

                // decrease onHold value for specified vaccine, subtract 1 from total quantity
                $vaccHold = "SELECT * FROM vaccine WHERE `vaccineName`= '$existingVaccine'";
                $result2 = mysqli_query($conn, $vaccHold);
                $row2 = mysqli_fetch_assoc($result2);
                $existingVaccHolds = $row2['onHold'];
                $existingTotalVaccines = $row2['quantity'];
                $sql2 = "UPDATE vaccine SET `quantity`= $existingTotalVaccines - 1, onHold = $existingVaccHolds - 1 WHERE `vaccineName`= '$existingVaccine'";

                if (mysqli_query($conn, $sql) & mysqli_query($conn, $sql2) & mysqli_query($conn, $cancelNurse) & mysqli_query($conn, $updatePatient)) {
                    echo '<p style="text-align: center; color: green; margin-top: 20px;">You have successfully recorded the appointment!</p>';
                } else {
                    echo '<p style="text-align: center; color: red; margin-top: 20px;">Error recording appointment</p>';
                }
            }
        } else {  // patient not in database
            echo '<p style="text-align: center; color: red; margin-top: 20px;">Error recording vaccination!</p>';
            echo '<p style="text-align: center; color: red; margin-top: 20px;">Appointment could have already been recorded, or patient does not exist :(</p>';
        }
        mysqli_close($conn);
    }
?>