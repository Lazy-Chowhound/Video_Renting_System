<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 2018/6/28
 * Time: 16:20
 */
sleep(1);
header("content-type:text/html;charset=utf-8");
$radio = $_POST['radio'];
if($radio!="") {
    if ($_POST['username'] != "" && $_POST['password'] != ""&&'$radio'!="匿名用户") {
        $connection = mysqli_connect("localhost", "root", "") or die("数据库链接失败");
        mysqli_query($connection,"set names utf8");
        mysqli_select_db($connection, "data");
        $name = trim($_POST['username']);
        $password = trim($_POST['password']);
        $sql = "SELECT * FROM userinfo WHERE (name='$name' and type='$radio')";
        $result = mysqli_query($connection, $sql);
        if (mysqli_num_rows($result)>0) {
            $row = mysqli_fetch_array($result);
            if ($password == $row['password']){
                if ($radio == "注册用户") {
                    if($row[4]=="未批准"){
                        echo "<script language=\"javascript\">";
                        echo "alert(\"您的注册还未被批准!请耐心等待\");";
                        echo "location.href=\"../Login.html\"";
                        echo "</script>";
                    }
                    else {
                        echo "<script language=\"javascript\">";
                        echo "alert(\"登录成功！\\n欢迎\");";
                        echo "location.href=\"../Rent.html\"";
                        echo "</script>";
                    }
                } else if ($radio == "管理员") {
                    echo "<script language=\"javascript\">";
                    echo "alert(\"登录成功！\\n欢迎\");";
                    echo "location.href=\"../administrator.html\"";
                    echo "</script>";
                }
            } else {
                echo "<script language=\"javascript\">";
                echo "alert(\"密码不正确！\");";
                echo "location.href=\"../Login.html\"";
                echo "</script>";
                echo "<br>";
            }
        } else {
            echo "<script language=\"javascript\">";
            echo "alert(\"用户不存在！\");";
            echo "location.href=\"../Login.html\"";
            echo "</script>";
            echo "<br>";
        }
        mysqli_close($connection);
    } else if($name == "" && $password == ""&&$radio =="匿名用户"){
        echo "<script language=\"javascript\">";
        echo "alert(\"匿名登录成功！\\n欢迎\");";
        echo "location.href=\"../anonymous.html\"";
        echo "</script>";
        echo "<br>";
    }
    else if($radio =="匿名用户"&&($name != "" || $password != "")){
        echo "<script language=\"javascript\">";
        echo "alert(\"匿名用户无需输入用户名和密码\");";
        echo "location.href=\"../Login.html\"";
        echo "</script>";
        echo "<br>";
    }
    else{
        echo "<script language=\"javascript\">";
        echo "alert(\"用户名或密码不能为空\");";
        echo "location.href=\"../Login.html\"";
        echo "</script>";
        echo "<br>";
    }
}
else{
    echo "<script language=\"javascript\">";
    echo "alert(\"请先选择登录类型\");";
    echo "location.href=\"../Login.html\"";
    echo "</script>";
    echo "<br>";
}
mysqli_close($connection);