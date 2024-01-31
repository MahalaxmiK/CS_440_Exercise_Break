<!-- 

Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project

File Name: nurseCancelTime
File Description: Allows for the nurse to cancel a vaccine appointment they have for a patient. There is also an option to go back to the homepage dashboard.

Last Updated: 11/25/23 

-->


<?php 
    include("connection.php");
    session_start();
    $nurseID = $_SESSION['nurseID'];
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
        <h1>-- Cancel a Vaccine Slot--</h1>
        <h2>Please fill out the following information to cancel a vaccine time slot </h2>
        <form id="form1" method="POST">
            <label for="timeSlot">Select an existing time slot you want to cancel: </label>
            <select id="timeSlot" name="timeSlot" required>
                <option value="" disabled selected>-- View Selection --</option>
                <?php
                    include('connection.php');

                    $sql = "SELECT DISTINCT(`hour`) FROM `nurseSchedule` WHERE `ID` = '$nurseID'";
                    $result = mysqli_query($conn, $sql);

                    while ($row = mysqli_fetch_assoc($result)) {
                        echo '<option value="' . $row['hour'] . '">' . $row['hour'] . '</option>';
                    }

                    mysqli_close($conn);
                ?>
            </select><br><br>

            <button id="editbtn" type="submit" name="submitBtn">Confirm Cancelation</button>
        </form>
    </div>
</body>
</html>
 

<?php

    if (isset($_POST['submitBtn'])) {
        // Get data from the form
        $hour = $_POST['timeSlot'];

        include('connection.php');

        $existingNurses = "SELECT * FROM schedule WHERE `hour` = '$hour'";
        $result = mysqli_query($conn, $existingNurses);
        $row = mysqli_fetch_assoc($result);
        $existingQuantity = $row['numNurses'];

        // Update the vaccine
        if ($existingQuantity > 0 ) {
            $sql = "UPDATE schedule SET numNurses = $existingQuantity - 1 WHERE `hour` = '$hour'";

            $scheduleNurse = "DELETE FROM `nurseSchedule` WHERE `hour` = '$hour' and `ID` = '$nurseID' LIMIT 1";

            if (mysqli_query($conn, $sql) & mysqli_query($conn, $scheduleNurse)) {
                echo '<p style="text-align: center; color: green; margin-top: 20px;">Slot succesfully cancelled!</p>';
            } else {
                echo '<p style="text-align: center; color: red; margin-top: 20px;">Error cancelling slot: ' . mysqli_error($conn) . '</p>';
            }
            mysqli_close($conn);
        } else {
            echo '<p style="text-align: center; color: red; margin-top: 20px;">Error cancelling slot: ' . mysqli_error($conn) . '</p>';
        }

    }
?>