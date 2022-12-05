<?php
  $UserName = $_POST['userinp'];
  $Email = $_POST['email'];
  $Password = $_POST['parolinp'];


  $conn = new mysqli('localhost','root','','fruitclicker');
  if($conn->connect_error){
      die('Connection failed : '.$conn->connect_error);
  }else{
    $stmt = $conn->prepare("Insert into registration(UserName, Email, Password)
      values(?, ?, ?)");
    $stmt->bind_param("ssss",$UserName, $Email, $Password);
    $stmt->execute();
    echo "registration Successfully";
    $stmt->close();
    $conn->close();
       }


?>