<!--
    
    Mahin Patel, Yvette Rojas -- CS480 -- UI Health Project
    
    File Name: login.php
    File Description: handles the backend connection with the mySQL database once the user logs in

    Last Updated: 11/22/23

-->

<?php
session_start();
include('connection.php');

if (isset($_POST['submit'])) {
    $username = $_POST['user'];
    $password = $_POST['pass'];
    $userType = $_POST['userType']; // Get the selected user type from the form

    // Define the table name based on the selected user type
    $tableName = '';

    // Determine the table name based on the user type
    if ($userType === 'admin') {
        $tableName = 'admin';
    } elseif ($userType === 'nurse') {
        $tableName = 'nurse';
    } elseif ($userType === 'patient') {
        $tableName = 'patient';
    }

    // Check if the selected table name is not empty
    if (!empty($tableName)) {
        $sql = "SELECT * FROM $tableName WHERE username = '$username' AND password = '$password'";
        $result = mysqli_query($conn, $sql);
        $count = mysqli_num_rows($result);

        $_SESSION['userType'] = $userType;
        
        // Redirect the user to the appropriate dashboard
        if ($count >= 1) {
            if ($userType === 'nurse') {
                $data = array();
                $nurseSql = "SELECT FName, `Address`, `Phone #`, `Employee ID` FROM $tableName WHERE username = '$username' AND password = '$password'";
                $res = mysqli_query($conn, $nurseSql);
                while ($row = mysqli_fetch_assoc($res)) {
                    $data[] = $row;
                }
                $row = $data[0];
                $_SESSION['nurseName'] = $row['FName'];
                $_SESSION['nurseAddress'] = $row['Address'];
                $_SESSION['nursePhone'] = $row['Phone #'];
                $_SESSION['nurseID'] = $row['Employee ID'];
                header('Location: nurseDashboard.php');
                exit();
            } 
            elseif ($userType === 'admin') {
                $_SESSION['adminName'] = $username;
                header('Location: adminDashboard.php');
                exit();
            }
            elseif ($userType === 'patient') {
                $data = array();
                $patientSql = "SELECT FName, `Address`, `Phone #`, `SSN` FROM $tableName WHERE username = '$username' AND password = '$password'";
                $res = mysqli_query($conn, $patientSql);
                while ($row = mysqli_fetch_assoc($res)) {
                    $data[] = $row;
                }
                $row = $data[0];
                $_SESSION['patientName'] = $row['FName'];
                $_SESSION['patientAddress'] = $row['Address'];
                $_SESSION['patientPhone'] = $row['Phone #'];
                $_SESSION['patientID'] = $row['SSN'];
                header('Location: patientDashboard.php');
                exit();
            }
        }
        else {
            echo  '<script>
                        window.location.href = "index2.php";
                        alert("Login failed. Invalid username or password!!");
                    </script>';
        }
        
    } 
    else {
        // Handle the case where an invalid user type is selected
        echo 'Invalid user type selected';
    }
}
?>