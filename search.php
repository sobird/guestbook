<?php
/**
 * search.php
 * 
 * @author  Yang,junlong at 2009-8-18 02:50:47 build.
 * @version $Id$
 */

include_once 'main.php';

// 获取方法
$str = $_GET['keyword'];

if(empty($str)){
    $message="<span class=\"tip_box\">请输入关键字搜索!</span>";
}else{

    $_CYGLOBAL['bk']->bkRead();
    $mybook=$_CYGLOBAL['bk']->bkSearch($str);
    $cost_time=$_CYGLOBAL['bk']->cost_time;
    $bknum=count($mybook);
    $userid=empty($mybook[$bknum-1]['userid'])?0:$mybook[$bknum-1]['userid'];
}

$member=!empty($_SESSION['username'])?"<span class=\"red\">".$_SESSION['username']."</span> 你好!":"你还没有登陆,";
$cost_time=!empty($cost_time )?"查询花费".$cost_time."秒":"内容为空没有进行查询";
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?=$_CONFIG['char_set']; ?>" />
<link href="tpl/<?=$theme; ?>/style.css" rel="stylesheet" type="text/css" media="all" />
<title><?=$_CONFIG['site_title']; ?></title>
</head>

<body>
<div id="header">
<div class="headerwarp">

<div id="logo">
<a href="<?=getSiteUrl(); ?>" title="<?=$title; ?>">
<h1 style="font-size:<?=$_CONFIG['site_title_size']; ?>px"><?=$_CONFIG['site_title']; ?><sub><?=BK_VER; ?></sub>
</h1>
</a>
</div>

<div class="navbar">
<ul >

<?php if(empty($_SESSION['username'])) { ?>
<li><a href="login.php">登陆</a></li>
<?php }else{ ?>
<li><a href="login.php?ac=logout">注销</a></li>
<?php } ?>

<li><a href="help.php">帮助</a></li>
<li class="search">
<form action="search.php" method="get" style="padding:0 0 0 5px;">
<input type="hidden" name="formcode" value="<?=formcode($_CY['formtime']);?>" />
<input type="text" name="keyword" id="keyword" style="margin:5px;"/>
<input type="submit" id="search_btn" name="search_btn" class="submit" value="搜索" />
</form>
</li>
<li><?=$member; ?></li>
</ul>
</div>
</div>
</div>


<div id="container">
<div id="home">


<div id="book" class="book_list">
<div class="round">
<div class="round1"></div><div  class="round2"></div>
<div class="round3"></div><div  class="round4"></div>
<h3 class="list_header"> 

<?php 
//留言分页显示
$sumnum=$bknum;
$pagesize=$_GET['page']=='all'?$sumnum:10;
$sumpage=ceil($sumnum/$pagesize);
    
if($_GET['page']=='all'){
    echo "<a href=\"?page=0&keyword=".$str."\" class=\"all\">取消全部</a>"; 
}else {
    echo "<a href=\"?page=all&keyword=".$str."\" class=\"all\">全部</a>"; 
}

$page=$_GET['page']<=$sumpage&&$_GET['page']>=1&&!empty($_GET['page'])?$_GET['page']:1;

$mod=$sumnum%$pagesize;

if($sumpage>1){
    echo "<a href=\"?page=$sumpage&keyword=$str\" class=\"all\">尾页</a>";
    for($i=$sumpage;$i>=1;$i--){
        echo "<a href=\"?page=$i&keyword=$str\" class=\"all\">$i</a>";  
    }
    echo "<a href=\"?&keyword=$str\" class=\"all\">首页</a>";
}else{
    echo "";
}
    
echo $page."/".$sumnum;
?>
 
搜索信息列表<span style="color:#ccc;">(每页十条)<?=$cost_time ?></span></h3>
<?=$message;?>
</div>
<ul class="line_list">
<?php
if(!$sumnum==0){
$startnum=($sumnum-1)-($page-1)*$pagesize;
for($i=$startnum;$i>=$startnum-(($sumpage==$page&&!$mod==0)?$mod-1:$pagesize-1);$i--){            
?>
<li id="list_<?=$mybook[$i]["bkid"] ?>">
<span class="time"><?=formatTime("Y-m-d",$mybook[$i]["dateline"],1)?></span> <h4><?=$mybook[$i]["subject"] ?></h4>
<div class="message"><?=$mybook[$i]["message"] ?>
</div>
</li>
<?php }}else{
$nowdate=date("Y-m-d");    
echo "<li> <span class=\"time\">$nowdate</span> <h4> 没有搜索到相关信息！</h4></li>";
}?>

</ul>
</div>
</div>
<div id="sidebar">
<div class="sideround">
<div  class="sideround1"></div><div  class="sideround2"></div>
<div  class="sideround3"></div><div  class="sideround4"></div>
</div>

<div class="navlist">
<ul>
<li><a href="index.php">首 页</a></li>
<li><a class="aboutme"href="help.php?ac=aboutMe">关于我</a></li>
<li class="theme">
<a  class="tab"href="index.php?theme=default">主题(默认值)</a>
<ul class="menu">
<li><a class="first" href="index.php?theme=red">红色</a></li>
<li><a href="index.php?theme=purple">紫色</a></li>
</ul>
</li>
</ul>
</div>

</div>
</div>
<div class="clear"></div>
<div id="footer">

<div class="copyright">
<span style="color:#ccc">留言本(<a href="<?=$_CONFIG['author_url']; ?>"><?=$_CONFIG['author_name']; ?></a>)<span>&copy;</span> 2009</span><span style="color:#ccc; margin-left:10px;">本页面程序执行时间:<?=phpRunTime($start_time); ?>/内存使用:<?=getMemoryUsed(); ?>/浏览器:<?=getClientBrowser() ?>/当前IP:<?=getClientIpAddr(); ?></span>
</div>
</div>
</body>
</html>