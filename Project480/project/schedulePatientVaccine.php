<!--

    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: schedulePatientVaccine.php
    File Description: Patient has the ability to choose whatever time vaccination time is available.

    Last Updated: 11/24/23

-->

<!-- NOT DONE -->
<?php 
    session_start();
    include('connection.php');
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
        <h1>-- Schedule a Vaccine --</h1>
        <h2>Please fill out the following information to register for an appointment </h2>
        <form id="form1" method="POST">
            <label for="existingVaccine">Select a vaccine: </label>
            <select id="existingVaccine" name="existingVaccine" required>
                <option value="" disabled selected>-- View Selection --</option>
                <?php
                    include('connection.php');

                    $sql = "SELECT * FROM vaccine";
                    $result = mysqli_query($conn, $sql);

                    while ($row = mysqli_fetch_assoc($result)) {
                        echo '<option value="' . $row['vaccineName'] . '">' . $row['vaccineName'] . '</option>';
                    }

                    mysqli_close($conn);
                ?>
            </select><br><br>

            <label for="doses">Will this be your first dose? </label>
            <select id="doses" name="doses" required>
                <option value="" disabled selected>-- Answer --</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
            </select><br><br>

            <label for="timeSlot">Select an available time slot: </label>
            <select id="timeSlot" name="timeSlot" required>
                <option value="" disabled selected>-- View Selection --</option>
                <?php
                    include('connection.php');

                    $existingSlots = "SELECT * FROM schedule where `numNurses` > 0";
                    $result2 = mysqli_query($conn, $existingSlots);
                    
                    while ($row2 = mysqli_fetch_assoc($result2)) {
                        echo '<option value="' . $row2['hour'] . '">' . $row2['hour'] . '</option>';
                    }
                    mysqli_close($conn);
                ?>
            </select><br><br>

            <button id="editbtn" type="submit" name="submitBtn">Update Vaccine</button>
        </form>
    </div>
</body>
</html>
 

<?php
    $PatientID = $_SESSION['patientID'];

    if (isset($_POST['submitBtn'])) {
        // Get data from the form
        $existingVaccine = $_POST['existingVaccine'];
        $doses = $_POST['doses'];
        $hour = $_POST['timeSlot'];

        
        include('connection.php');

        $existingDose = "SELECT * FROM patientSchedule WHERE SSN = '$PatientID' and vaccineName = '$existingVaccine'";
        $result = mysqli_query($conn, $existingDose);
        $row = mysqli_fetch_assoc($result);

        if ($row != null) { // patient exists in database
            if (($row['dose1Taken'] == 1) & ($row['dose2Taken'] == 1)) {
                echo '<p style="text-align: center; color: red; margin-top: 20px;">It looks like you already gotten this vaccine!</p>';
            } else if ($doses == 'yes' & $row['dose1Taken'] == 1) {
                  // patient already made an appointment for first shot but want to ask for first shot again
                echo '<p style="text-align: center; color: red; margin-top: 20px;">It looks like you already had your first dose!</p>';
                echo '<p style="text-align: center; color: red; margin-top: 20px;">Schedule your second dose!</p>';
            } else if (($doses == 'no' & $row['dose1Taken'] == 0) or ($doses == 'yes' & $row['dose1Taken'] == 0)) {
                // patient already made an appointment but hasn't received shot
                echo '<p style="text-align: center; color: red; margin-top: 20px;">Please wait until you get your first vaccine before scheduling again!</p>';
            } else if ($doses == 'no' & $row['dose1Taken'] == 1) {
                // update time if it's a new time
                $existingPatients = "SELECT * FROM schedule WHERE `hour` = '$hour'";
                $result = mysqli_query($conn, $existingPatients);
                $row = mysqli_fetch_assoc($result);
                $existingQuantity = $row['numPatients'];
            
                // Update the vaccine
                if ($existingQuantity < 100) {
                    $sql = "UPDATE schedule SET numPatients = $existingQuantity + 1 WHERE `hour` = '$hour'";

                    // increase onHold value for specified vaccine
                    $vaccHold = "SELECT * FROM vaccine WHERE `vaccineName`= '$existingVaccine'";
                    $result2 = mysqli_query($conn, $vaccHold);
                    $row2 = mysqli_fetch_assoc($result2);
                    $existingVaccHolds = $row2['onHold'];
                    $sql2 = "UPDATE vaccine SET onHold = $existingVaccHolds + 1 WHERE `vaccineName`= '$existingVaccine'";

                    $schedulePatient = "UPDATE `patientSchedule` SET `hour`= '$hour' WHERE `SSN`='$PatientID' AND `vaccineName`= '$existingVaccine'";

                    if (mysqli_query($conn, $sql) & mysqli_query($conn, $sql2) & mysqli_query($conn, $schedulePatient)) {
                        echo '<p style="text-align: center; color: green; margin-top: 20px;">You are now scheduled for your second dose!</p>';
                    } else {
                        echo '<p style="text-align: center; color: red; margin-top: 20px;">Error scheduling, second dose was not scheduled</p>';
                    }
                } else {
                    echo '<p style="text-align: center; color: red; margin-top: 20px;">Error scheduling, slot it full: ' . mysqli_error($conn) . '</p>';
                }

            } 
        } else {  // patient not in database
            if ($doses == 'yes') {
                $existingPatients = "SELECT * FROM schedule WHERE `hour` = '$hour'";
                $result = mysqli_query($conn, $existingPatients);
                $row = mysqli_fetch_assoc($result);
                $existingQuantity = $row['numPatients'];
            
                // Update the vaccine
                if ($existingQuantity < 100) {
                    $sql = "UPDATE schedule SET numPatients = $existingQuantity + 1 WHERE `hour` = '$hour'";

                    // increase onHold value for specified vaccine
                    $vaccHold = "SELECT * FROM vaccine WHERE `vaccineName`= '$existingVaccine'";
                    $result2 = mysqli_query($conn, $vaccHold);
                    $row2 = mysqli_fetch_assoc($result2);
                    $existingVaccHolds = $row2['onHold'];
                    $sql2 = "UPDATE vaccine SET onHold = $existingVaccHolds + 1 WHERE `vaccineName`= '$existingVaccine'";

                    $schedulePatient = "INSERT INTO `patientSchedule`(`SSN`, `vaccineName`, `hour`, `dose1Taken`, `dose2Taken`) VALUES ('$PatientID','$existingVaccine','$hour','0','0')";

                    if (mysqli_query($conn, $sql) & mysqli_query($conn, $sql2) & mysqli_query($conn, $schedulePatient)) {
                        echo '<p style="text-align: center; color: green; margin-top: 20px;">You are now scheduled for this time!</p>';
                    } else {
                        echo '<p style="text-align: center; color: red; margin-top: 20px;">Error scheduling, slot it full: ' . mysqli_error($conn) . '</p>';
                    }
                } else {
                    echo '<p style="text-align: center; color: red; margin-top: 20px;">Error scheduling, slot it full: ' . mysqli_error($conn) . '</p>';
                }
            } else {
                echo '<p style="text-align: center; color: red; margin-top: 20px;">Error Scheduling your appointment!</p>';
            } 
        }
        mysqli_close($conn);
    }
?>