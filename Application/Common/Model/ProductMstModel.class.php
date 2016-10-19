<?php
namespace Common\Model;

class ProductMstModel extends BaseModel {

    public function getIndexProductList($page=1, $size=10){

        $where = 'del_flag = 0 and status=1';
        $order = 'id desc';
        $fields = null;
        $data = $this->loadPageData($where, null, $fields, $order, $page, $size);
        return $data;
    }

    public function getProductById($id, $fields=null){
        $product = $this->getById($id, $fields);
        if(!empty($product['images'])){
            $product['images'] = json_decode($product['images']);
        }
        return $product;
    }

    public function updateSaledById($id, $num){
        $this->setInc('saled_num', $num);
    }
}