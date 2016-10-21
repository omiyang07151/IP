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

    public function detail(){

        $id = I('id');
        $orderModel = D('OrderMst');

        $order = $orderModel->getById($id);
        $order['checkin_info'] = json_decode($order['checkin_info'], true);

        $productModel = D('ProductMst');
        $order['product'] = $productModel->getProductById($order['product_mst_id']);

        $userModel = D('UserMst');
        $order['user'] = $userModel->getById($order['user_mst_id']);

        $this->assign('order', $order);

        $this->display();
    }
}