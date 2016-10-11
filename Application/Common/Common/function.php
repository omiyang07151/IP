<?php
/**
 * 系统公共库文件
 * 主要定义系统公共函数库
 */

function has_prefix($prefix, $str){
    if(is_array($prefix)){
        foreach($prefix as $p){
            $len = mb_strlen($p,'utf-8');
            if(mb_substr($str, 0, $len, 'utf-8') == $p){
                return true;
            }else{
                return false;
            }
        }
    }
    else {
        $len = mb_strlen($prefix,'utf-8');
        if(mb_substr($str, 0, $len, 'utf-8') == $prefix){
            return true;
        }else{
            return false;
        }
    }
}
/**
 * 检测用户是否登录
 * @return integer 0-未登录，大于0-当前登录用户ID
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function is_login(){
    $user = session('user_auth');
    if (empty($user)) {
        return 0;
    } else {
        return session('user_auth_sign') == data_auth_sign($user) ? $user['uid'] : 0;
    }
}

/**
 * 检测当前用户是否为管理员
 * @return boolean true-管理员，false-非管理员
 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
 */
function is_administrator($uid = null){
    $uid = is_null($uid) ? is_login() : $uid;
    return $uid && (intval($uid) === C('USER_ADMINISTRATOR'));
}


if (! function_exists('storage_path')) {
    /**
     * Get the path to the storage folder.
     *
     * @param  string  $path
     * @return string
     */
    function storage_path($path = '')
    {
        return app('path.storage').($path ? DIRECTORY_SEPARATOR.$path : $path);
    }
}

function pr($data, $exit = false){
    echo '<meta charset="utf-8">';
    echo '<pre>';
    print_r($data);
    echo '</pre>';
    if($exit){
        die('index.php function pr');
    }
}

function isMobile(){
    // 如果有HTTP_X_WAP_PROFILE则一定是移动设备
    if (isset ($_SERVER['HTTP_X_WAP_PROFILE']))
        return true;

    //此条摘自TPM智能切换模板引擎，适合TPM开发
    if(isset ($_SERVER['HTTP_CLIENT']) &&'PhoneClient'==$_SERVER['HTTP_CLIENT'])
        return true;

    //如果via信息含有wap则一定是移动设备,部分服务商会屏蔽该信息
    if (isset ($_SERVER['HTTP_VIA']))
        //找不到为flase,否则为true
        return stristr($_SERVER['HTTP_VIA'], 'wap') ? true : false;

    //判断手机发送的客户端标志,兼容性有待提高
    if (isset ($_SERVER['HTTP_USER_AGENT'])) {
        $clientkeywords = array(
            'nokia','sony','ericsson','mot','samsung','htc','sgh','lg',
            'sharp','sie-','philips','panasonic','alcatel','lenovo','iphone',
            'ipod','blackberry','meizu','android','netfront','symbian','ucweb',
            'windowsce','palm','operamini','operamobi','openwave','nexusone',
            'cldc','midp','wap','mobile'
        );

        //从HTTP_USER_AGENT中查找手机浏览器的关键字
        if (preg_match("/(" . implode('|', $clientkeywords) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT']))) {
            return true;
        }
    }
    //协议法，因为有可能不准确，放到最后判断
    if (isset ($_SERVER['HTTP_ACCEPT'])) {
        // 如果只支持wml并且不支持html那一定是移动设备
        // 如果支持wml和html但是wml在html之前则是移动设备
        if ((strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') !== false) && (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false || (strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') < strpos($_SERVER['HTTP_ACCEPT'], 'text/html')))) {
            return true;
        }
    }
    return false;
}

function getIP()
{
    global $ip;

    if (getenv("HTTP_CLIENT_IP"))
        $ip = getenv("HTTP_CLIENT_IP");
    else if(getenv("HTTP_X_FORWARDED_FOR"))
        $ip = getenv("HTTP_X_FORWARDED_FOR");
    else if(getenv("REMOTE_ADDR"))
        $ip = getenv("REMOTE_ADDR");
    else
        $ip = "Unknow";

    return $ip;
}

function pr_debug($data, $exit=true){
    if($_GET['debug']!=1){
        return;
    }

    if(is_array($data)){
        echo '<pre>';
        print_r($data);
        echo '</pre>';
    }
    else {
        echo $data.'====================<br>';
    }

    if($exit){
        die('======= die pr_debug =======');
    }
}