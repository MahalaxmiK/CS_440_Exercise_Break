<?php 
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $servername = "localhost";
    $username = "root";
    $password = "Cps45133281";
    $db_name = "UIHealth";  

    $conn = new mysqli($servername, $username, $password, $db_name);

    if($conn->connect_error){
        die("Connection failed".$conn->connect_error);
    }
    echo "";
?>
