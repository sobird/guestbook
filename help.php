<?php
/**
 * help.php
 * 
 * @author  Yang,junlong at 2009-8-18 05:25:08 build.
 * @version $Id$
 */

include_once 'main.php';
$ac = !empty($_GET["ac"]) ? $_GET["ac"] : "helpdoc";

include_once (BK_ROOT.'./tpl/default/'.$ac.'.php');
