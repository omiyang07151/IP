<?php
namespace Home\Controller;

class BookingController extends HomeBaseController {

    public function index(){

        $product_id = I('pid');

        $productModel = D('ProductMst');
        $product = $productModel->getProductById($product_id);

        $roomModel = D('HotelRoomtype');
        $product['roomtype'] = $roomModel->getNameById($product['hotel_roomtype_id']);

        $this->assign('product', $product);

        $this->display();
    }
}