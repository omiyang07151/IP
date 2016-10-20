<?php
return array(
	//'配置项'=>'配置值'
    'LAYOUT_ON'=>true,
    'LAYOUT_NAME'=>'Layout/admin',
    /* 模板相关配置 */
    'TMPL_PARSE_STRING' => array(
        '__IMG__'    => __ROOT__ . '/Assets/' . MODULE_NAME . '/images',
        '__CSS__'    => __ROOT__ . '/Assets/' . MODULE_NAME . '/css',
        '__JS__'     => __ROOT__ . '/Assets/' . MODULE_NAME . '/js',
        '__VIDEO__'     => __ROOT__ . '/Assets/' . MODULE_NAME . '/video',
        '__COMM_IMG__'    => __ROOT__ . '/Assets/Common/images',
        '__COMM_CSS__'    => __ROOT__ . '/Assets/Common/css',
        '__COMM_JS__'     => __ROOT__ . '/Assets/Common/js',
        '__COMM_VIDEO__'     => __ROOT__ . '/Assets/Common/video',
    ),
    'ADMIN_DEFAULT_PAGE'=>0,
    'ADMIN_DEFAULT_SIZE'=>10,
    'UPLOAD_DEFAULT'=>'',
    'IMG_UPLOAD_URL' => '/admin/upload/image',
    'MULTIIMG_UPLOAD_URL' => '/admin/upload/image',

    'LOAD_EXT_CONFIG' => 'upload',
);