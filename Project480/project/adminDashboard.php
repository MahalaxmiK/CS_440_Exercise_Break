<!--
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: adminDashboard.php
    File Description: creates the dashboard for the admin, and gives them the options of what actions they can take.
                      whatever action they choose, it will direct them to the corresponding page

    Last Updated: 11/22/23

-->

<?php
    session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <link rel="stylesheet" type="text/css" href="adminStyle.css">
</head>
<body>
    <div id="form">
        <button id="editbtn" onclick = "window.location.href='index2.php'">Log out</button><br>
        <h1 id = "adminNamePlaceholder"></h1>
        <script>
            // JavaScript to access the admin's name from the PHP session
            var adminName = "<?php echo $_SESSION['adminName']; ?>";
            document.getElementById("adminNamePlaceholder").textContent = "Welcome -- " + adminName;
        </script>
        <h2>Select an action:</h2>
        <form id="redirectSite" name="form" method="POST">
            <select id="userAction" name="userAction">
                <option value="" disabled selected>View Selection</option>
                <option value="registerNurse.php">Register Nurse</option>
                <option value="viewNurseInfo.php">View Nurse Info</option>
                <option value="updateNurse.php">Update Nurse Info</option>
                <option value="deleteNurse.php">Delete a Nurse</option>
                <option value="viewPatientInfo.php">View Patient Info</option>
                <option value="addVaccine.php">Add Vaccine</option>
                <option value="updateVaccine.php">Update Vaccine</option>
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
            
            // Check if a valid option was selected (not the placeholder)
            if (selectedPage !== "") {
                // Redirect to the selected page
                window.location.href = selectedPage;
            }
        });
    </script>
</body>
</html>