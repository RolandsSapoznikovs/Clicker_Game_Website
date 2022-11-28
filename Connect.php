<?php
  $FirstName = $_POST['FirstName'];
  $LastName = $_POST['LastName'];
  $Email = $_POST['Email'];
  $Password = $_POST['Password'];


  $conn = new mysqli('localhost','root','','FruitClicker')
if($conn->connect_error)
    die('Connection failed : '.$conn->connect_error);
}else{
  $stmt = $conn->prepare("Insert into Registration(FirstName, LastName, Email, Password)
    values(?, ?, ?, ?)");
  %stmt->bind_param("ssss",$FirstName, $LastName, $Email, $Password);
  $stmt->execute();
  echo "Registration Successfully";
  $stmt->close();
  $conn->close();
}
?>