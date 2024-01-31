<!--
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: patientDashboard.php
    File Description: creates the dashboard for the patient, and gives them the options of what actions they can take.
                      whatever action they choose, it will direct them to the corresponding page

    Last Updated: 11/21/23

-->

<?php
    session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Patient Dashboard</title>
    <link rel="stylesheet" type="text/css" href="patient.css">
</head>
<body>
    <div id="form">
        <button id="editbtn" onclick = "window.location.href='index2.php'">Log out</button><br>
        <h1 id = "patientNamePlaceholder"></h1>
        <script>
            // JavaScript to access the admin's name from the PHP session
            var patientName =  <?php echo json_encode($_SESSION['patientName']); ?>;
            document.getElementById("patientNamePlaceholder").textContent = "Welcome -- " + patientName;
        </script>
        <h2>Select an action:</h2>
        <form id="redirectSite" name="form" method="POST">
            <select id="userAction" name="userAction">
                <option value="" disabled selected>View Selection</option>
                <option value="updatePatientInfo.php">Update My Information</option>
                <option value="schedulePatientVaccine.php">Schedule a Vaccination Time</option>
                <option value="cancelPatientVaccine.php">Cancel Schedule</option>
                <option value="viewMyPatientInfo.php">View my Information</option>
            </select>
            <input type="submit" id="btn" value="go" name = "submit"/>
        </form>
    </div>
    <script>
        // Get the form element
        const redirectForm = document.getElementById('redirectSite');

        // Add a form submit event listener to handle the redirection
        redirectForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission behavior
            
            // Get the selected option's value
            const selectedPage = document.getElementById('userAction').value;
            
            // Check if a valid option was selected
            if (selectedPage !== "") {
                // Redirect to the selected page
                window.location.href = selectedPage;
            }
        });
    </script>
</body>
</html>