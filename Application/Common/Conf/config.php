<?php
if(file_exists(SITE_PATH.'../PLMConfig/config.php')){
    $ONLINE=include SITE_PATH.'../PLMConfig/config.php';
}
else {
    $ONLINE = array();
}

$config = array(

    'IS_TEST' => true,

	//'配置项'=>'配置值'
    'DEFAULT_MODULE'     => 'Home',
    'MODULE_ALLOW_LIST'  => array('Home','Admin'),

    /* URL配置 */
    'URL_CASE_INSENSITIVE' => true, //默认false 表示URL区分大小写 true则表示不区分大小写
    'URL_MODEL'            => 2, //URL模式
    'VAR_URL_PARAMS'       => '', // PATHINFO URL参数变量
    'URL_PATHINFO_DEPR'    => '/', //PATHINFO URL分割符

    'LOAD_EXT_CONFIG' => 'db,wechat,wxpay',
);

return array_merge($config, $ONLINE);

