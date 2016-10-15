<?php
namespace Home\Controller;

class DetailController extends HomeBaseController {

    public function index(){

        $id = I('id');

        $productModel = D('ProductMst');
        $product = $productModel->getProductById($id);
        $this->assign('product', $product);

        $hotelModel = D('HotelMst');
        $hotel = $hotelModel->getHotelById($product['hotel_mst_id']);
        $this->assign('hotel', $hotel);

        $this->display();
    }
}