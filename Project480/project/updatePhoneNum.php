<!-- 

Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project

File Name: updatePhoneNum
File Description: Redirected page so that the user may see their current phone number and submit a new number that they would like the
nurse table to have updated. This is then seen to be updated when the user clicks the back button.

Last Updated: 11/19/23 

-->

<?php 
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
    <div id="form">
        <button id="btn" onclick = "window.location.href='updateMyNurseInfo.php'">back</button><br><br>
        <h1>Updating your Phone Number:</h1><br>
        <label>Current Phone Number: </label><br><br>
        <label id = "phonePlaceholder" style="display: block;"></label>
        <script>
            // JavaScript to access the nurse's phone # from the PHP session
            var phone = <?php echo json_encode($_SESSION['nursePhone']); ?>;
            document.getElementById("phonePlaceholder").textContent = phone;
        </script><br><br>
        <form name="form" method="POST">
            <input type="text" name="phoneInput" id="phoneInput" placeholder=" Updated Phone Number" required>
            <button id="editbtn" name="newNum">Confirm changes</button><br></br></br>
        </form>
    </div>
</body>
</html>

<?php

    $NurseID = $_SESSION['nurseID'];

    if (isset($_POST['newNum'])) {
        // Get data from the form
        $newValue = $_POST['phoneInput'];
        include('connection.php'); // Include database connection

        // Check if the nurse exists
        $checkSql = "SELECT * FROM nurse WHERE `Employee ID` = '$NurseID'";
        $result = mysqli_query($conn, $checkSql);
        $row = mysqli_fetch_assoc($result);

        if ($row) {
            // Nurse found, proceed with update
            $updateSql = "UPDATE nurse SET `Phone #` = '$newValue' WHERE `Employee ID` = '$NurseID'";
            $_SESSION['nursePhone'] = $newValue;
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