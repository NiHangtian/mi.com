<?php
  include('./ku.php');

  $id=$_REQUEST['id'];
  $username=$_REQUEST['username'];
  $password=$_REQUEST['password'];
  $emily=$_REQUEST['emily'];
  $phone=$_REQUEST['phone'];
  $adder=$_REQUEST['adder'];
  
  $sql="UPDATE `gupi` SET `password`='$password',`emily`='$emily',`phone`='$phone',`adder`='$adder' WHERE `id`=$id";
  
  $mysqli->query($sql);
  var_dump($sql);
  $mysqli->close();
  echo '<script>location.href="../admin.php"</script>';

?>