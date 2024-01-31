<!-- 

Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project

File Name: updateAddress
File Description: Redirected page so that the user may see their current address and submit a new address that they would like the
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
            <h1>Updating your Address:</h1><br>
            <label>Current Address: </label><br><br>
            <label id = "addressPlaceholder" style="display: block;"></label>
            <script>
                // JavaScript to access the nurse's address from the PHP session
                var address = <?php echo json_encode($_SESSION['nurseAddress']); ?>;
                document.getElementById("addressPlaceholder").textContent = address;
            </script><br><br>
        <form name="form" method="POST">
            <input type="text" name="addressInput" id="addressInput" placeholder=" Updated Address" required>
            <button id="editbtn" name="newAddress">Confirm changes</button><br></br></br>
        </form>
    </div>
</body>
</html>

<!-- 76987 Andrew Place Suite 422
West Jared, ND 55254 -->
<?php

    $NurseID = $_SESSION['nurseID'];

    if (isset($_POST['newAddress'])) {
        // Get data from the form
        $newValue = $_POST['addressInput'];
        include('connection.php'); // Include database connection

        // Check if the nurse exists
        $checkSql = "SELECT * FROM nurse WHERE `Employee ID` = '$NurseID'";
        $result = mysqli_query($conn, $checkSql);
        $row = mysqli_fetch_assoc($result);

        if ($row) {
            // Nurse found, proceed with update
            $updateSql = "UPDATE nurse SET `Address` = '$newValue' WHERE `Employee ID` = '$NurseID'";
            $_SESSION['nurseAddress'] = $newValue;
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
