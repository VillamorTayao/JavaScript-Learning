<?php
    if($_SERVER["REQUEST METHOD"] == "POST"){
        $host = "localhost";
        $dbusername = "root";
        $dbpassword = "";
        $dbname = "testdb"

        $username = $_POST['UserOrEmail'];
        $password = $_POST['password'];
        
        $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

        if($conn->connection_error){
            die("Connection failed: ". $conn->connection_error);
        }

        $query = "SELECT * FROM testtable WHERE UserOrEmail = '$username' AND password = '$password'";

        $result = $conn->query($query);

        if ($result->num_rows == 1){
            header("Location: success.html");
            exit();
        } else {
            header("Location: failed.html");
            exit();
        }

        $conn->close();
    }
?>