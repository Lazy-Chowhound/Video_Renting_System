function setTable(){
    document.getElementById('retrieve').style.display='none';
    document.getElementById('table').style.display='none';
    setLoad();
     setTimeout(function () {
         document.getElementById('loading').style.display='none';
     },1800);
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST","php/anonymous.php",true);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(null);
    xmlhttp.onreadystatechange=function() {
        if(xmlhttp.readyState==4&&xmlhttp.status==200) {
            var info=xmlhttp.responseText;
            var table=eval(info);
            var div=document.getElementById("table");
            var tab="<table border='1' bordercolor='black' width='900' height='150' class='table2'>"
            tab+="<tr><th>编号</th><th>影像名</th><th>状态</th><th>借出时间</th><th>应还时间</th></tr>"
            for(var i=0;i<table.length;i++)
            {
                tab+="<tr>";
                for(var j=0;j<5;j++)
                {
                    if(table[i][j]) {
                        tab += "<td>" + table[i][j] + "</td>";
                    }
                    else{
                        tab+="<td></td>"
                    }
                }
                tab+="</tr>";
            }
            tab+="</table>"
            div.innerHTML=tab;
            document.getElementById('table').style.display='block';
        }
    }
}

function setSearch() {
    document.getElementById('table').style.display='none';
    document.getElementById('retrieve').style.display='block';
    document.getElementById('videoname').value='';
    document.getElementById('hide').style.display='none';
}

function search() {
    if (document.getElementById('videoname').value == ""){
        alert("请输入书名！");
    }
    else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'php/search.php', true)
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send('name='+document.getElementById('videoname').value);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status === 200 && xmlhttp.readyState == 4) {
                var info = xmlhttp.responseText;
                var table = eval(info);
                var div = document.getElementById('searchresult');
                if (table == 'none') {
                    var tab = "<table border='1' bordercolor='black' width='900' height='150' id='hide' class='none'>";
                    tab += "<tr><th>暂无相关影像制品信息</th></tr>";
                    div.innerHTML = tab;
                }
                else {
                    var tab = "<table border='1' bordercolor='black' width='900' height='150' id='hide' class='searchresult'>";
                    tab += "<tr><th>编号</th><th>影像名</th><th>状态</th><th>借出时间</th><th>应还时间</th></tr>";
                    for (var i = 0; i < table.length; i++) {
                        tab += "<tr>";
                        for (var j = 0; j < 5; j++) {
                            if (table[i][j]) {
                                tab += "<td>" + table[i][j] + "</td>";
                            }
                            else {
                                tab += "<td></td>"
                            }
                        }
                        tab += "</tr>";
                    }
                    tab += "</table>"
                    div.innerHTML = tab;
                }
            }
        }
    }
}

function setLoad() {
   document.getElementById('loading').style.display='flex';
}


