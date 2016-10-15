<?php
namespace Home\Controller;

class IndexController extends HomeBaseController {
    public function index(){

        $productModel = D('ProductMst');

        $productList = $productModel->getIndexProductList($this->page, $this->size);
        $this->assign('productList', $productList);

        $this->display();
    }
}