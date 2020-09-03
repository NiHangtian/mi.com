<?php
    include("./conn.php");

    
    $password=$_REQUEST['password'];
    $phone=$_REQUEST['phone'];
    

    $sql = "select * from message where username = '$username'";

    $result = $mysqli->query($sql);
    
    if($result->num_rows>0){
        echo 0;
        $mysqli->close();
        die();
    }else{
        $insert = "insert into message (`password`,`phone`) values ('$password','$phone')";
        
        $mysqli->query($insert);
        
        $mysqli->close();
        
        echo 1;
    }
?>