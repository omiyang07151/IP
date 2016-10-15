<?php
namespace Home\Model;

use Common\Model\BaseModel;

class OrderMstModel extends BaseModel {

    public function getOrderByNumber($order_no){
        $where = "order_no='".$order_no."'";
        $order = $this->getOne($where);
        return $order;
    }

    public function OrderPaySuccess($out_trade_no, $trade_no, $outsidePayTotal) {
        $data['pay_no']=$trade_no;
        $data['pay_time'] = date('Y-m-d');
        $data['pay_money'] = $outsidePayTotal;
        $where = "order_no='".$out_trade_no."'";
        $this->where($where)->save($data);
    }

}