<?php
/**
 * class_initer.php
 * 
 * @author  Yang,junlong at 2009-8-16 04:54:21 build.
 * @version $Id$
 */

if(!defined('GuestBook')) {
    exit('Access Denied');
}
/**
 * 站点数据初始化
 *
 */
class Initer{
    
    
    function config(){

        global $_CONFIG,$_site,$_CY;
         
        //配置文件
        include_once (BK_ROOT.'./config.php');
        
        $_CONFIG['bk_name'] = !empty($_CY["bkname"])?$_CY["bkname"]:"GuestBook";
        $_CONFIG['bk_dir'] = !empty($_CY["bkdir"])?$_CY["bkdir"]:"data";
        $_CONFIG['bk_suff'] = !empty($_CY["bksuff"])?$_CY["bksuff"]:".dat";
        $_CONFIG['form_time'] = !empty($_CY["formtime"])?$_CY["formtime"]:300;
        $_CONFIG['cookie_pre'] = !empty($_CY['cookiepre'])?$_CY['cookiepre']:"BK_";
        $_CONFIG['cookie_timeoff'] =!empty($_CY['cookietime'])?$_CY['cookietime']:300;
        $_CONFIG['cookie_domain'] = !empty($_CY['cookiedomain'])?$_CY['cookiedomain']:"";
        $_CONFIG['cookie_path'] = !empty($_CY['cookiepath'])?$_CY['cookiepath']:"/";
         
         

        $_CONFIG['char_set'] = !empty($_site['charset'])?$_site['charset']:"UTF-8";
        $_CONFIG['site_title'] = !empty($_site['title'])?$_site['title']:"PHP+TEXT留言本";
        $_CONFIG['site_title_size'] = !empty($_site['title_font_size'])?$_site['title_font_size']:14;
        $_CONFIG['author_name'] = !empty($_site['author_name'])?$_site['author_name']:"CrossYou";
        $_CONFIG['author_url'] = !empty($_site['author_url'])?$_site['author_url']:"http://www.crossyou.cn";
                
     }
     
     function constants(){
         
        define('PHP_SAPI_NAME',php_sapi_name());
        define('IS_APACHE',strstr($_SERVER['SERVER_SOFTWARE'], 'Apache') || strstr($_SERVER['SERVER_SOFTWARE'], 'LiteSpeed') );
        define('IS_IIS',PHP_SAPI_NAME =='isapi' ? 1 : 0);
        define('IS_CGI',substr(PHP_SAPI_NAME, 0,3)=='cgi' ? 1 : 0 );
        define('IS_WIN',strstr(PHP_OS, 'WIN') ? 1 : 0 );
        define('IS_LINUX',strstr(PHP_OS, 'Linux') ? 1 : 0 );
        define('IS_FREEBSD',strstr(PHP_OS, 'FreeBSD') ? 1 : 0 );
        define('NOW',time() );
     }
     
     function variables(){
        global $_CONFIG, $_CYCOOKIE;
         
         //站点变量
        include_once (BK_ROOT.'./source/function_variable.php');
        
        //GPC过滤
        $magic_quote = get_magic_quotes_gpc();
        if(!empty($magic_quote)) {
            $_GET = sStripslashes($_GET);
            $_POST = sStripslashes($_POST);
        }
       
        //获取本站COOKIE
        $prelength = strlen($_CONFIG['cookie_pre']);
        foreach($_COOKIE as $key => $val) {
            if(substr($key, 0, $prelength) == $_CONFIG['cookie_pre']) {
                $_CYCOOKIE[(substr($key, $prelength))] = !empty($magic_quote) ? sStripslashes($val) : $val;
            }
        }
        
        
       
    }
     
        // 数据文件连接
    function bkconnect() {
        global $_CYGLOBAL, $_CONFIG;
        include_once(BK_ROOT.'./source/class_op_txt.php');
    
        if(empty($_CYGLOBAL['bk'])) {
            $_CYGLOBAL['bk'] = new  bkstuff();
            $_CYGLOBAL['bk']->bksuff=$_CONFIG['bk_suff'];
            $_CYGLOBAL['bk']->bkname=$_CONFIG['bk_name'];
            $_CYGLOBAL['bk']->bkConnect($_CONFIG['bk_dir'] );
        }
    }

}
