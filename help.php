<?php
/* +----------------------------------------------------------+
   | CrossYou.CN
   | $@file  V 1.0.1 UTF-8 2009-8-18 ����05:25:08 : $crossyou$
   |
*/
include_once 'main.php';
$ac=!empty($_GET["ac"])?$_GET["ac"]:"helpdoc";


include_once (BK_ROOT.'./tpl/default/'.$ac.'.php');
?>