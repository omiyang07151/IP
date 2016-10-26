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
        if(!empty($product['ticket_intro'])){
            $product['ticket_intro'] = html_entity_decode($product['ticket_intro']);
        }
        if(!empty($product['detail'])){
            $product['detail'] = html_entity_decode($product['detail']);
        }



        return $product;
    }

    public function processSpPrice($product){
        $result = array();
        if(!empty($product['sp_price'])){
            $sp_price = json_decode($product['sp_price'], true);

            for($i=1;$i<=7;$i++){
                $result[$i] = $product['p_price'];
            }
            foreach($sp_price as $sp){
                for($j=$sp['start_weekday'];$j<=$sp['end_weekday'];$j++){
                    $result[$j] = $sp['new_price'];
                }
            }
        }
        return $result;
    }

    public function updateSaledById($id, $num){
        $this->setInc('saled_num', $num);
    }

    public function getAdminList($condition, $page=1, $size = 10)
    {
        $where = "del_flag=0 AND title like '%#title#%'";
        $where = $this->getCondition($where, $condition);

        $fields = null;
        $order = 'id desc';
        $data = $this->adminPageData($where, $fields, $order, $page, $size);

        if(!empty($data['aaData'])){
            $hotelModel = D('HotelMst');
            $provinceModel = D('SysProvince');
            $cityModel = D('SysCity');
            foreach($data['aaData'] as &$d){
                $hotel = $hotelModel->getById($d['hotel_mst_id'], 'name');
                $d['hotel_name'] = $hotel['name'];
                $d['province_name'] = $provinceModel->getNameById($d['sys_province_id']);
                $d['city_name'] = $cityModel->getNameById($d['sys_city_id']);
            }
        }

        return $data;
    }
}