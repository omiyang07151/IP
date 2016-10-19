<?php
namespace Admin\Controller;
use Common\Controller\AdminBaseController;

class UserController extends AdminBaseController {
    public function index(){
        $this->display();
    }

    public function indexdata(){
        $userModel = D('UserMst');

        $searchData = I('condition');
        $data = $userModel->getAdminUserList($searchData, $this->page, $this->size);
        $this->jsonpajax($data);
    }
}