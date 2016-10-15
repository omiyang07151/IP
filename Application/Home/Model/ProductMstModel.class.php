<?php
namespace Home\Model;

use Common\Model\BaseModel;

class ProductMstModel extends BaseModel {

    public function getIndexProductList($page=1, $size=10){

        $where = 'del_flag = 0 and status=1';
        $order = 'id desc';
        $fields = null;
        $data = $this->loadPageData($where, null, $fields, $order, $page, $size);
        return $data;
    }

    public function getProductById($id){
        $product = $this->getById($id);
        $product['images'] = json_decode($product['images']);

        return $product;
    }
}