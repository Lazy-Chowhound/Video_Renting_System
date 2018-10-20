<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 2018/7/1
 * Time: 21:59
 */
header("content-type:text/html;charset=utf-8");
$connection=mysqli_connect("localhost","root","") or die("数据库链接失败");
mysqli_query($connection,"set names utf8");
mysqli_select_db($connection,"data");
$name=$_POST['name'];
$number=$_POST['number'];
$sql="INSERT INTO video(number,name,status,rentdate,returndate) VALUES ('$number','$name','可借',NULL,NULL)";
$sqll="SELECT * FROM video WHERE number='$number'";
$search=mysqli_query($connection,$sqll);
if(mysqli_num_rows($search)>0) {
    echo json_encode("duplicate");
}
else{
    $result=mysqli_query($connection,$sql);
    if ($result==true) {
        echo json_encode('success');
    }
    else if($result==false){
        echo json_encode('failure');
    }
}