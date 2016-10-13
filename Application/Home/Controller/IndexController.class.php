<?php
namespace Home\Controller;

class IndexController extends HomeBaseController {
    public function index(){

        pr($this->user);
        $this->display();
    }
}