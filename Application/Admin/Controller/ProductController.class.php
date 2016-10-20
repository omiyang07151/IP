<?php
namespace Admin\Controller;

use Common\Controller\AdminBaseController;
class ProductController extends AdminBaseController {
    public function index(){
        $this->display();
    }

    public function indexdata(){
        $productModel = D('ProductMst');

        $searchData = I('condition');
        $data = $productModel->getAdminList($searchData, $this->page, $this->size);
        $this->jsonpajax($data);
    }

    public function add(){
        $sysProvinceModel = D('SysProvince');
        $provinceList = $sysProvinceModel->getProvinceList();
        $this->assign('provinceList',$provinceList);

        $weekdays = array('1'=>'周一','2'=>'周二','3'=>'周三','4'=>'周四','5'=>'周五',
            '6'=>'周六','7'=>'周日');
        $this->assign('weekdays',$weekdays);

        $this->display();
    }

    public function edit(){

        $id = I('id');
        $productModel = D('ProductMst');
        $data = $productModel->getProductById($id);

        $data['images'] = json_encode($data['images']);


        $sysProvinceModel = D('SysProvince');
        $provinceList = $sysProvinceModel->getProvinceList();
        $this->assign('provinceList',$provinceList);

        if(!empty($data['sys_province_id'])){
            $sysCityModel = D('SysCity');
            $cityList = $sysCityModel->getCityList($data['sys_province_id']);
            $this->assign('cityList',$cityList);
        }

        if(!empty($data['sys_city_id']) && !empty($data['sys_province_id'])){
            $hotelModel = D('HotelMst');
            $where = 'del_flag=0 and sys_province_id = '.$data['sys_province_id'].' and sys_city_id='.$data['sys_city_id'];
            $hotelList = $hotelModel->buildSelectOptions('id,name', $where);
            $this->assign('hotelList', $hotelList);
        }

        if(!empty($data['sp_price'])){
            $data['sp_price'] = json_decode($data['sp_price'],true);
        }

        $weekdays = array('1'=>'周一','2'=>'周二','3'=>'周三','4'=>'周四','5'=>'周五',
            '6'=>'周六','7'=>'周日');
        $this->assign('weekdays',$weekdays);

        $this->assign('data', $data);
        $this->display('add');
    }

    public function save(){

        $productModel = D('ProductMst');
        $product = $productModel->create();



        if(!empty($product['images'])){
            foreach($product['images'] as $img){
                $result[] = $img;
            }
            $product['images'] = json_encode($result);
        }

        if(!empty($product['sp_price'])){
            $result = array();
            foreach($product['sp_price'] as $price){
                $result[] = $price;
            }
            $product['sp_price'] = json_encode($result);
        }

//        pr($product, true);

        if(empty($product['id'])){
            $productModel->insert($product);
        }
        else {
            $productModel->save($product);
        }

        $this->redirect('/admin/product');
    }
}