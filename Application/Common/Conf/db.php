<?php
if(file_exists(SITE_PATH.'../Config/Web/Common/db.php')){
    $ONLINE=include SITE_PATH.'../Config/Web/Common/db.php';
}
else {
    $ONLINE = array();
}
$config = array(
    /* 数据库配置 */
    'DB_TYPE'   => 'mysql', // 数据库类型
    'DB_HOST'   => '127.0.0.1', // 服务器地址
    'DB_NAME'   => 'ip', // 数据库名
    'DB_USER'   => 'root', // 用户名
    'DB_PWD'    => 'root',  // 密码
    'DB_PORT'   => '3306', // 端口
    'DB_PREFIX' => '', // 数据库表前缀
);

return array_merge($config, $ONLINE);