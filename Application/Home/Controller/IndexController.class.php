<?php
namespace Home\Controller;

use Common\Controller\HomeBaseController;
class IndexController extends HomeBaseController {
    public function index(){

        $productModel = D('ProductMst');

        $productList = $productModel->getIndexProductList($this->page, $this->size);
        $this->assign('productList', $productList);

        $this->display();
    }
}