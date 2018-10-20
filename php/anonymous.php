<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 2018/6/29
 * Time: 21:08
 */
sleep(2);
header("content-type:text/html;charset=utf-8");
$connection = mysqli_connect("localhost", "root", "") or die("数据库连接失败");
mysqli_query($connection, "set names utf8");
mysqli_select_db($connection, "data");
$sql = "SELECT * FROM video ";
$result = mysqli_query($connection, $sql);
if (mysqli_num_rows($result)) {
    $video=array();
    while($row=mysqli_fetch_array($result,MYSQLI_NUM))
        $video[]=$row;
    echo json_encode($video);
} else {
    echo "<script language=\"javascript\">";
    echo "alert(\"当前无影像信息\");";
    echo "location.href=\"anonymous.html\"";
    echo "</script>";
}
mysqli_close($connection);