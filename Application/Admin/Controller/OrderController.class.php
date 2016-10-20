<?php
namespace Admin\Controller;

use Common\Controller\AdminBaseController;
class OrderController extends AdminBaseController {

    public function index(){
        $this->display();
    }

    public function indexdata(){
        $orderModel = D('OrderMst');

        $searchData = I('condition');
        $data = $orderModel->getAdminList($searchData, $this->page, $this->size);
//        pr($data, true);
        $this->jsonpajax($data);
    }
}