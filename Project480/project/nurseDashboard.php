<!-- 

Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project

File Name: nurseDashboard
File Description: Displays the 5 opotions that a nurse has upon entering the portal,
upon selection and button submission the user it redirecting to correspoding page

Last Updated: 11/19/23 

-->

<?php 
    session_start();
?>
   
<!DOCTYPE html>
<html>
<head>
    <title>Nurse Dashboard</title>
    <link rel="stylesheet" type="text/css" href="nurse.css">
</head>
<body>
    <div id="form">
        <button id="editbtn" onclick = "window.location.href='index2.php'">Log out</button><br>
        <h1 id = "nurseNamePlaceholder"></h1>
        <script>
            // JavaScript to access the admin's name from the PHP session
            var nurseName =  <?php echo json_encode($_SESSION['nurseName']); ?>;
            document.getElementById("nurseNamePlaceholder").textContent = "Welcome -- " + nurseName;
        </script>
        <h2>Select an action:</h2>
        <form id="redirectSite" name="form" method="POST">
            <select id="userAction" name="userAction">
                <option value="" disabled selected>View Selection</option>
                <option value="updateMyNurseInfo.php">Update My Information</option>
                <option value="nurseScheduleTime.php">Schedule a Time</option>
                <option value="nursecancelTime.php">Cancel a Time</option>
                <option value="viewMyNurseInfo.php">View My Information</option>
                <option value="nurseViewVaccines.php">View Vaccine Repository</option>
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