<?php
namespace Common\Model;

class OrderMstModel extends BaseModel {

    public function getOrderByNumber($order_no, $fields = null){
        $where = "order_no='".$order_no."'";
        $order = $this->getOne($where, null, $fields);
        return $order;
    }

    public function OrderPaySuccess($out_trade_no, $trade_no, $outsidePayTotal) {
        $data['pay_no']=$trade_no;
        $data['pay_time'] = date('Y-m-d H:i:s');
        $data['pay_money'] = $outsidePayTotal;
        $data['pay_status'] = 1;
        $where = "order_no='".$out_trade_no."'";
        $this->where($where)->save($data);
    }

    public function getOrderListByUserId($user_id, $page=1, $size=10){
        $where = "del_flag = 0 and user_del_flag=0 and user_mst_id = ".$user_id;

        $fields = null;
        $order = 'id desc';
        $orderList = $this->loadPageData($where, null, $fields, $order, $page, $size);

        if(!empty($orderList['aaData'])){
            foreach($orderList['aaData'] as &$o){
                $o = $order = $this->getOrderDetail($o);
            }
        }

        return $orderList;
    }

    public function getOrderById($user_id, $order_id){
        $where = "del_flag = 0 and user_del_flag=0 and user_mst_id = ".$user_id." and id=".$order_id;

        $order = $this->getOne($where);

        $order = $this->getOrderDetail($order);
        if(!empty($order['checkin_info'])){
            $order['checkin_info'] = json_decode($order['checkin_info'], true);
        }
        return $order;
    }

    public function getOrderDetail($order){
        $productModel = D('ProductMst');
        $hotelModel = D('HotelMst');
        $roomtypeModel = D('HotelRoomtype');

        $product = $productModel->getProductById($order['product_mst_id'],'hotel_mst_id,hotel_roomtype_id');
        $hotel = $hotelModel->getHotelById($product['hotel_mst_id'],'name');
        $roomtype = $roomtypeModel->getNameById($product['hotel_roomtype_id']);
        $order['product'] = $product;
        $order['hotel'] = $hotel;
        $order['roomtype'] = $roomtype;
        return $order;
    }

    public function getAdminList($condition, $page=0, $size=10){
        $where = "order_mst.del_flag=0";
        $where = $this->getCondition($where, $condition);

        $fields = "order_mst.*";
        $order = 'product_mst_id desc, created';
        $join = 'product_mst p on p.id = order_mst.product_mst_id AND p.title like \'%#title#%\'';
        $join = $this->getCondition($join, $condition);

        $data = $this->adminPageData($where, $fields, $order, $page, $size, $join);
        if(!empty($data['aaData'])){
            $productModel = D('ProductMst');
            $userModel = D('UserMst');
            foreach($data['aaData'] as &$d){
                $d['product'] = $productModel->getProductById($d['product_mst_id'],'id,title');
                $d['user'] = $userModel->getById($d['user_mst_id'],'id,nickname,headimgurl');
            }
        }
        return $data;
    }

}