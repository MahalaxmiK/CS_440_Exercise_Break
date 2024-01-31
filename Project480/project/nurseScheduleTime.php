<!-- 

Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project

File Name: nurseScheduleTime
File Description: Allows for the nurse to schedule a new vaccine appointment for a patient. They also have the option to go back to the homepage dashboard.

Last Updated: 11/24/23 

-->

<?php 
    include("connection.php");
    session_start();
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
    <div id="form" method = "POST">
        <button id="btn" onclick = "window.location.href='nurseDashboard.php'">Back to Dashboard</button>
        <h1>-- Schedule a Vaccine --</h1>
        <h2>Please fill out the following information to schedule a vaccine time slot </h2>
        <form id="form1" method="POST">
            <label for="timeSlot">Select a time slot: </label>
            <select id="timeSlot" name="timeSlot" required>
                <option value="" disabled selected>-- View Selection --</option>
                <?php
                    include('connection.php');

                    $sql = "SELECT * FROM schedule";
                    $result = mysqli_query($conn, $sql);

                    while ($row = mysqli_fetch_assoc($result)) {
                        echo '<option value="' . $row['hour'] . '">' . $row['hour'] . '</option>';
                    }

                    mysqli_close($conn);
                ?>
            </select><br><br>

            <button id="editbtn" type="submit" name="submitBtn">Confirm Slot</button>
        </form>
    </div>
</body>
</html>
 

<?php
    
    $nurseID = $_SESSION['nurseID'];

    if (isset($_POST['submitBtn'])) {
        // Get data from the form
        $hour = $_POST['timeSlot'];

        include('connection.php');

        $existingNurses = "SELECT * FROM schedule WHERE `hour` = '$hour'";
        $result = mysqli_query($conn, $existingNurses);
        $row = mysqli_fetch_assoc($result);
        $existingQuantity = $row['numNurses'];

        $slotLimit = "SELECT COUNT(`hour`) as total FROM `nurseSchedule` WHERE `ID` = '$nurseID' and `hour` = '$hour'";
        $result1 = mysqli_query($conn, $slotLimit);
        $row1 = mysqli_fetch_assoc($result1);
        $slotNumber = $row1['total'];

    
        // Update the vaccine
        if ($existingQuantity < 12 & $slotNumber < 10) {
            $sql = "UPDATE schedule SET numNurses = $existingQuantity + 1 WHERE `hour` = '$hour'";

            $scheduleNurse = "INSERT INTO `nurseSchedule`(`ID`, `hour`) VALUES ('$nurseID', '$hour')";

            if (mysqli_query($conn, $sql) & mysqli_query($conn, $scheduleNurse)) {
                echo '<p style="text-align: center; color: green; margin-top: 20px;">You are now scheduled for this time!</p>';
            } else {
                echo '<p style="text-align: center; color: red; margin-top: 20px;">Error scheduling, slot it full.</p>';
            }
            mysqli_close($conn);
        } else {
            echo '<p style="text-align: center; color: red; margin-top: 20px;">Error scheduling, slot it full.</p>';
        }

    }
?>