<?php
/**
 * tpl/default/index.php
 * 
 * @author  Yang,junlong at 2009-8-18 09:23:15 build.
 * @version $Id$
 */

$ac = !empty($_GET["ac"]) ? $_GET["ac"] : "?";

if(checksubmit("bk_btn")){
	
	$my_bk=$_POST['_BK'];
	if(empty($my_bk['subject'])){
		$message="<span class=\"error_box\">留言主题不能为空!</span>";
	}elseif (empty($my_bk['message'])){
		$message="<span class=\"error_box\">留言内容不能为空!</span>";
	}else{
	$my_bk['dateline']=$time_stamp;
	
    $my_bk=clearhtmlchars($my_bk);
	$_CYGLOBAL['bk']->bkWrite("",$my_bk);
	$message="<span class=\"correct_box\">留言成功,点击<a href=\"index.php\">刷新</a>按钮，可对留言进行编辑</span>";
	
	$username=$my_bk['bkid']."||".$_CONFIG['bk_name'];
	$password=md5("$username.$time_stamp");
	
	$bkcook=$username."\n".$password;
	$bkcook=bkCode($bkcook,'');
	$uncook=bkCode($bkcook,'DECODE');
	bkSetcookie($username,$bkcook,$_CY['cookietime']);
	bkSetcookie("cook_time_".$my_bk['bkid'],($_CYGLOBAL['timestamp']+$_CONFIG['cookie_timeoff']),$_CONFIG['cookie_timeoff']);
	$_SESSION['subject']=$my_bk['subject'];
	
	}
}


//编辑提交
if(checksubmit("edit_btn")){
	$succeedid=$_GET['editid'];
	$my_bk=$_POST['_ED'];
	$my_bk['dateline']=$time_stamp;
	if(empty($my_bk['subject'])){
		$editmsg="<span class=\"error_box\">不能修改为空主题!请重新编辑</span>";
	}elseif(empty($my_bk['message'])){
		$editmsg="<span class=\"error_box\">不能修改为空内容!请添加内容</span>";
	}else{

	$_CYGLOBAL['bk']->bkRead();
	$_CYGLOBAL['bk']->bkUpdate($my_bk['bkid'],$my_bk);
	$editmsg="<span class=\"correct_box\">修改成功</span>";
	}
}

//删除提交
if($ac=='delete'){
	$delid=$_GET['bkid'];
	$_CYGLOBAL['bk']->bkRead();
	$_CYGLOBAL['bk']->bkUpdate($delid," random",0);
	$message="<span class=\"correct_box\">删除成功！第".$delid."条留言</span>";
}

$_CYGLOBAL['bk']->bkRead();
$mybook=$_CYGLOBAL['bk']->bk_fetch_array();

$bknum=count($mybook);
$bkid=empty($mybook[$bknum-1]['bkid'])?0:$mybook[$bknum-1]['bkid'];

$subject=$_SESSION['subject'];
$member=!empty($_SESSION['username'])?"<span class=\"red\">".$_SESSION['username']."</span> 你好!":"你还没有登陆,";

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

<div id="bookform">
<div class="round">
<div  class="round1"></div><div  class="round2"></div>
<div  class="round3"></div><div  class="round4"></div>
<h3 class="list_header"> <a href="<?=$_CONFIG['author_url']; ?>" class="crossyou"><?=$_CONFIG['author_name']; ?></a>留言板</h3>
</div>

<div class="box">
<?=$message;?>
<form action="index.php?ac=submit" method="post" style="padding:0 0 0 5px;">
<input type="hidden" name="_BK[bkid]" value=<?=$bkid+1;?> />
题目:<input type="text" name="_BK[subject]" value="<?=$subject; ?>"  style="margin:5px;"/><span style="color:#ccc">(请不要为空!)</span>
<textarea name="_BK[message]" id="comment_message" rows="4" cols="60" style="width:98%;font-size:12px" ></textarea>
<input type="hidden" name="formcode" value="<?=formcode($_CONFIG['form_time']);?>" />
<input type="submit" id="bk_btn" name="bk_btn" class="submit" value="留言" />
</form>
</div>
</div>

<div id="book" class="book_list">
<div class="">
<div  class="round1"></div><div  class="round2"></div>
<div  class="round3"></div><div  class="round4"></div>
<h3 class="list_header"> 

<?php 
//留言分页显示
$sumnum=$bknum;
$pagesize=$_GET['page']=='all'?$sumnum:100;
$sumpage=ceil($sumnum/$pagesize);
	
    if($_GET['page']=='all'){
	        echo "<a href=\"?page=0\" class=\"all\">取消全部</a>"; 
    }else {
    		echo "<a href=\"?page=all\" class=\"all\">全部</a>"; 
    }
	$page=$_GET['page']<=$sumpage&&$_GET['page']>=1&&!empty($_GET['page'])?$_GET['page']:1;


    $mod=$sumnum%$pagesize;

    if($sumpage>1){

	      for($i=$sumpage;$i>=1;$i--){
               if($i==1){
               	    echo "<a href=\"?\" class=\"all\">首页</a>";
               }elseif($i==$sumpage){
                    echo "<a href=\"?page=$sumpage\" class=\"all\">尾页</a>";
               }else{
	                echo "<a href=\"?page=$i\" class=\"all\">$i</a>";
               }	
           }

	       }else{
		echo "";
	}
	
echo $page."/".$sumnum;
?>
 
留言信息<span style="color:#ccc;">(每页<?=$pagesize?>条)</span></h3>
</div>
<ul class="line_list">
<?php
if(!$sumnum==0){
$startnum=($sumnum-1)-($page-1)*$pagesize;
for($i=$startnum;$i>=$startnum-(($sumpage==$page&&!$mod==0)?$mod-1:$pagesize-1);$i--){
	
	
	$cookname=($mybook[$i]['bkid'])."||".$_CONFIG["bk_name"]; 	
	$uncook=bkCode($_CYCOOKIE[$cookname],'DECODE');
	$validate=explode('||',$uncook,2);
    $bkid=$mybook[$i]['bkid'];
	$edit=!empty($_GET['edit'])?$_GET['edit']:'edit';

	if($ac=="edit"&&$bkid==$_GET['bkid']){
		if(!empty($_CYCOOKIE[$cookname])&&$validate[0]==$bkid){
?>		
<li><div id="edit_<?=$bkid; ?>">
<span class="tip_box">请输入要修改的内容</span>
<form action="index.php?editid=<?=$bkid.'#list_'.$bkid?>" method="post" style="padding:5px 15px 10px 15px;">
<input type="hidden" name="_ED[bkid]" value=<?=$bkid; ?> />
题目:<input type="text" name="_ED[subject]" value="<?=$mybook[$i]["subject"] ?>" style="margin:5px;"/><span style="color:#ccc">(请不要为空!)</span>
<textarea id="edit_message" name="_ED[message]" rows="4" cols="60" style="width:98%; font-size:12px" ><?=$mybook[$i]["message"] ?></textarea>
<input type="hidden" name="formcode" value="<?=formcode($_CONFIG['form_time']);?>" />
<input type="submit" id="edit_btn" name="edit_btn" class="submit" value="修改" />
</form>
</div>
</li>	
<?php } else{ ?>

<li>
<span class="error_box">您不能编辑别人的留言，或者您留言操作已经超时！</span>
<span class="time"><?=formatTime("Y-m-d",$mybook[$i]["dateline"],1) ?></span> <h4><?=$mybook[$i]["subject"] ?></h4>
<div class="message"><?=$mybook[$i]["message"] ?>
</div>
</li>
<?php }}else{?>


<li id="list_<?=$mybook[$i]["bkid"] ?>">
<?php
if($succeedid==$bkid){
	echo $editmsg;
}
 ?>
 
<span class="time"><?=formatTime("Y-m-d",$mybook[$i]["dateline"],1) ?></span> <h4><?=$mybook[$i]["subject"] ?></h4>
<? if(!empty($_CYCOOKIE[$cookname])&&$validate[0]==$mybook[$i]['bkid']){?>
<span class="edit"><a href="?ac=edit&bkid=<?=$bkid.'#edit_'.$bkid; ?>">编辑</a></span> 
<span class="edit"><a href="?ac=delete&bkid=<?=$bkid.'#edit_'.($bkid-1); ?>">删除</a></span> 
<?php
$start_cook_time=$_CYCOOKIE["cook_time_".$bkid];
$remain_cook_time=$start_cook_time-$time_stamp;
echo "将在".$remain_cook_time."秒后失去操作";
?>
<?php }?>
<div class="message"><?=$mybook[$i]["message"] ?>
</div>
</li>
<?php }}else{
$nowdate=date("Y-m-d");	
echo "<li> <span class=\"time\">$nowdate</span> <h4>暂时还没有留言！</h4></li>";
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
<li><a class="aboutme"href="help.php?ac=aboutme">关于我</a></li>
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
