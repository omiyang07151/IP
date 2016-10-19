<?php
namespace Inoherb\Widget;

use Think\Controller;

class MenuWidget extends Controller {

    public function index($args, $arg2, $arg3=null){
//        echo 'MenuWidget';
        $this->assign('args', $args);
        $this->assign('arg2', $arg2);

        $this->display('Widget/menu');
    }
}