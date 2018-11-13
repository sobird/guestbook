<?php
/**
 * main.php
 * 
 * @author  Yang,junlong at 2009-8-17 05:15:25 build.
 * @version $Id$
 */

// 获取UNIX时间戳
$timearr = explode(' ',microtime());
$start_time = $timearr[0] + $timearr[1];
$time_stamp = $timearr[1];

// 定义全局数组变量
$_CYGLOBAL = $_site = $_CYCOOKIE = $_CONFIG = $_CY = array();

// 站点基本常量
@define('GuestBook', TRUE);
define('BK_VER', '1.0.1');
define('BK_RELEASE', '20090901');
define('D_BUG', 0);
define('BK_INC','CrossYou.CN');
define('BK_ROOT', dirname(__FILE__).DIRECTORY_SEPARATOR);

// 是否进行调试
D_BUG ? error_reporting(7) : error_reporting(0);

// 初始化数据
$_CYGLOBAL['timestamp'] = $time_stamp;

//公用函数
include_once (BK_ROOT.'./source/function_main.php');
include_once (BK_ROOT.'./source/class_initer.php');

$INITER = new Initer();
$INITER->config();
$INITER->variables();
$INITER->constants();


$INITER->bkconnect();

session_start();

if($_GET['theme']=='red'){
    $_SESSION["theme"]="red";
}
if($_GET['theme']=='purple'){
    $_SESSION["theme"]="purple";
}
if($_GET['theme']=='default'){
    $_SESSION["theme"]="default";
}

$theme = !empty($_SESSION['theme']) ? $_SESSION['theme'] : 'default';
