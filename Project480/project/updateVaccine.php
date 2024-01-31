<!--
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: updateVaccine.php
    File Description: this file updates the database when receiving more doses of an existing vaccine

    Last Updated: 11/24/23

-->

<!DOCTYPE html>
<html>
<head>
    <title>Update Vaccine</title>
    <link rel="stylesheet" type="text/css" href="adminStyle.css">
</head>

<body>
    <div id="form" method = "POST">
        <button id="btn" onclick = "window.location.href='adminDashboard.php'">Back to Dashboard</button>
        <h1>-- Update Vaccine --</h1>
        <h2>Please fill out the following information to update a vaccine in the database </h2>
        <form id="form1" method="POST">
            <label for="existingVaccine">Select Existing Vaccine: </label>
            <select id="existingVaccine" name="existingVaccine">
                <option value="" disabled selected>-- Select existing vaccine --</option>
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

            <label for="doses">Number of Doses To Add: </label>
            <input type="number" id="doses" name="doses" required><br><br>

            <button id="editbtn" type="submit" name="submitBtn">Update Vaccine</button>
        </form>
    </div>
</body>
</html>
 

<?php
    if (isset($_POST['submitBtn'])) {
        // Get data from the form
        $existingVaccineID = $_POST['existingVaccine'];
        $doses = $_POST['doses'];

        include('connection.php');

        $existingDose = "SELECT * FROM vaccine WHERE vaccineName = '$existingVaccineID'";
        $result = mysqli_query($conn, $existingDose);
        $row = mysqli_fetch_assoc($result);
        $existingQuantity = $row['quantity'];

        // Update the vaccine
        $sql = "UPDATE vaccine SET quantity = $existingQuantity + $doses WHERE vaccineName = '$existingVaccineID'";

        if (mysqli_query($conn, $sql)) {
            echo '<p style="text-align: center; color: green; margin-top: 20px;">Vaccine Updated Successfully!</p>';
        } else {
            echo '<p style="text-align: center; color: red; margin-top: 20px;">Error Updating Vaccine: ' . mysqli_error($conn) . '</p>';
        }
        mysqli_close($conn);
    }
?>