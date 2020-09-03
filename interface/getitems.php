<?php
    include('./conn.php');

    $listid = $_REQUEST['listid'];

    
    $sql = "select * from product where id in ($listid)";
   

    $res = $mysqli->query($sql);

    $mysqli->close();

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;
?>