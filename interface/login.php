<?php
include('./conn.php');
 
 $password=$_REQUEST['password'];
 $phone=$_REQUEST['phone'];
 

 $sql="select * from gupi where phone ='$phone'and password='$password'";
 $result=$mysqli->query($sql);
 
//  var_dump($result->fetch_assoc());
if($result->num_rows>0){
    $row = $result->fetch_assoc();
   
    
   echo  1;
  
}else{
   echo  0;

};
?>