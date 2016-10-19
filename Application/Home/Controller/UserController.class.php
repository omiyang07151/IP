<?php
namespace Home\Controller;

use Common\Controller\HomeBaseController;
class UserController extends HomeBaseController {

    public function orderlist(){

        $orderModel = D('OrderMst');
        $orderList = $orderModel->getOrderListByUserId($this->user['id'], $this->page, $this->size);
        $this->assign('orderList', $orderList);
        $this->display();
    }

    public function orderinfo(){

        $order_id = I('id');

        $orderModel = D('OrderMst');
        $order = $orderModel->getOrderById($this->user['id'], $order_id);
        $this->assign('order', $order);
        $this->display();
    }
}