<!-- 

Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project

File Name: updateMyNurseInfo
File Description: Displays the current address and phone number of the user, they are able to update which ever information they'd like upon button submission
they will be redirected to a page to do so. They also have the option to go back to the homepage dashboard.

Last Updated: 11/19/23 

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
    <div id="form">
        <button id="btn" onclick = "window.location.href='nurseDashboard.php'">back to home page</button>
        <h1>Update the following information:</h1>
        <label>Current Address:</label><br><br>
        <label id = "addressPlaceholder" style="display: block;"></label>
        <script>
            // JavaScript to access the nurse's address from the PHP session
            var address = <?php echo json_encode($_SESSION['nurseAddress']); ?>;
            document.getElementById("addressPlaceholder").textContent = address;
        </script>
        <button id="editbtn" onclick = "window.location.href='updateAddress.php'">Update my Address</button><br></br></br>
        <label>Current Phone Number: </label><br><br>
        <label id = "phonePlaceholder" style="display: block;"></label>
        <script>
            // JavaScript to access the nurse's phone # from the PHP session
            var phone = <?php echo json_encode($_SESSION['nursePhone']); ?>;
            document.getElementById("phonePlaceholder").textContent = phone;
        </script>
        <button id="editbtn" onclick = "window.location.href='updatePhoneNum.php'">Update my Phone Number</button><br></br>
    </div>
</body>
</html>
