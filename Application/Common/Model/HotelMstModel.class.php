<?php
namespace Common\Model;

class HotelMstModel extends BaseModel {

    public function getHotelById($id, $fields=null){
        $hotel = $this->getById($id, $fields);
        if(!empty($hotel['facility'])){
            $hotel['facility'] = json_decode($hotel['facility']);
        }
        return $hotel;
    }

    public function getAdminHotelList($searchParams, $page=1, $size=10){
        $where = "del_flag=0 AND name like '%#name#%'";
        $where = $this->getCondition($where, $searchParams);

        $fields = null;
        $order = 'id desc';

        $data = $this->adminPageData($where, $fields, $order, $page, $size);
        if(!empty($data['aaData'])){
            $roomtypeModel = D('HotelRoomtype');
            $provinceModel = D('SysProvince');
            $cityModel = D('SysCity');
            foreach($data['aaData'] as &$d){
                $d['roomtype'] = $roomtypeModel->getNameByHotelId($d['id'], 'name,market_price');
                $d['province_name'] = $provinceModel->getNameById($d['sys_province_id']);
                $d['city_name'] = $cityModel->getNameById($d['sys_city_id']);
            }
        }
        return $data;
    }

}