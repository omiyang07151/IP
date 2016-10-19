<?php
namespace Inoherb\Widget;

use Think\Controller;

class FormWidget extends Controller {


    public function input($name, $value = null, $attr = null){


        $this->assign('name', $this->createName($name));
        $this->assign('value', $value);


        $default_attr['class'] = ['form-control'];
        $default_attr['id'] = $this->createId($name);
        $attr = $this->mergeAttr($default_attr, $attr);

        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        echo $this->fetch('Widget/Form/input');
    }

    public function password($name, $value = null, $attr = null){


        $this->assign('name', $this->createName($name));
        $this->assign('value', $value);


        $default_attr['class'] = ['form-control'];
        $default_attr['id'] = $this->createId($name);
        $attr = $this->mergeAttr($default_attr, $attr);

        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        echo $this->fetch('Widget/Form/password');
    }

    public function hidden($name, $value = null, $attr = null){


        $this->assign('name', $this->createName($name));
        $this->assign('value', $value);

        $default_attr['id'] = $this->createId($name);
        $attr = $this->mergeAttr($default_attr, $attr);

        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        echo $this->fetch('Widget/Form/hidden');
    }

    public function select($name, $options, $value = null, $attr = null) {
        $this->assign('name', $this->createName($name));
        $this->assign('options', $options);
        $this->assign('value', $value);


        $default_attr['class'] = ['form-control'];
        $default_attr['show_all'] = true;
        $default_attr['all_text'] = "全部";
        $default_attr['id'] = $this->createId($name);

        $attr = $this->mergeAttr($default_attr, $attr);


        $this->assign('show_all', $attr['show_all']);
        unset($attr['show_all']);

        $this->assign('all_text', $attr['all_text']);
        unset($attr['all_text']);


        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        $this->display('Widget/Form/select');
    }

    public function radio($name, $options, $value= null, $attr=null){
        $this->assign('name', $this->createName($name));
        $this->assign('options', $options);

        if(empty($value)){
            $keys = array_keys($options);
            $value = $keys[0];
        }
        $this->assign('value', $value);

        $default_attr['class'] = ['form-control'];
        $default_attr['id'] = $this->createId($name);

        $attr = $this->mergeAttr($default_attr, $attr);

        if(!empty($attr)){
            $this->assign('attr', $attr);
        }



        layout(false);
        $this->display('Widget/Form/radio');
    }

    public function checkbox($name, $options, $value= array(), $attr=null, $isExecuteICheck=true){
        $this->assign('name', $this->createName($name));
        $this->assign('options', $options);
        $this->assign('isExecuteICheck', $isExecuteICheck);


        if(!is_array($value)){
            $value = explode(',', $value);
        }
        $this->assign('value', $value);

        $default_attr['class'] = ['form-control'];
        $default_attr['id'] = $this->createId($name);

        $attr = $this->mergeAttr($default_attr, $attr);

        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        $this->display('Widget/Form/checkbox');
    }

    public function calendar($name, $value=null, $attr=null){

        $this->assign('name', $this->createName($name));
        $this->assign('value', $value);
        $default_attr['class'] = ['form-control','form-control-inline','input-medium','default-date-picker'];
        $default_attr['id'] = $this->createId($name);

        $attr = $this->mergeAttr($default_attr, $attr);

        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        $this->display('Widget/Form/calendar');
    }

    public function calendarRangeWithHI($name, $value=null, $attr=null){

        if(!is_array($name) && count($name)!=2){
            return false;
        }
        $this->assign('name_from', $this->createName($name[0]));
        $this->assign('name_to', $this->createName($name[1]));
        $this->assign('id_from', $this->createId($name[0]));
        $this->assign('id_to', $this->createId($name[1]));
        $this->assign('value', $value);

        $default_attr['class'] = ['form-control','form_datetime'];
        $attr = $this->mergeAttr($default_attr, $attr);

        if(!empty($attr['placeholder'])){
            if(!is_array($attr['placeholder'])){
                $placeholder = explode(",",$attr['placeholder']);
            }
            else {
                $placeholder = $attr['placeholder'];
            }
            unset($attr['placeholder']);
        }
        else {
            $placeholder = ['开始时间','结束时间'];
        }
        $this->assign('holder', $placeholder);

        unset($attr['class']['id']);
        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        $this->display('Widget/Form/calendarRangeWithHI');
    }

    public function calendarRange($name, $value=array(), $attr=null){

        if(!is_array($name) && count($name)!=2){
            return false;
        }
        $this->assign('name_from', $this->createName($name[0]));
        $this->assign('name_to', $this->createName($name[1]));
        $this->assign('id_from', $this->createId($name[0]));
        $this->assign('id_to', $this->createId($name[1]));
        $this->assign('value', $value);

        $default_attr['class'] = ['form-control'];
        $attr = $this->mergeAttr($default_attr, $attr);

        if(!empty($attr['placeholder'])){
            if(!is_array($attr['placeholder'])){
                $placeholder = explode(",",$attr['placeholder']);
            }
            else {
                $placeholder = $attr['placeholder'];
            }
            unset($attr['placeholder']);
        }
        else {
            $placeholder = ['开始时间','结束时间'];
        }
        $this->assign('holder', $placeholder);

        unset($attr['class']['id']);
        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        $this->display('Widget/Form/calendarRange');
    }

    public function textRange($name, $value=array(),  $attr=null){

        if(!is_array($name) && count($name)!=2){
            return false;
        }
        $this->assign('name_from', $this->createName($name[0]));
        $this->assign('name_to', $this->createName($name[1]));
        $this->assign('id_from', $this->createId($name[0]));
        $this->assign('id_to', $this->createId($name[1]));
        $this->assign('value', $value);

        $default_attr['class'] = ['form-control'];
        $attr = $this->mergeAttr($default_attr, $attr);

        if(!empty($attr['placeholder'])){
            if(!is_array($attr['placeholder'])){
                $placeholder = explode(",",$attr['placeholder']);
            }
            else {
                $placeholder = $attr['placeholder'];
            }
            unset($attr['placeholder']);
        }
        else {
            $placeholder = ['最低','最高'];
        }
        $this->assign('holder', $placeholder);

        unset($attr['class']['id']);
        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        $this->display('Widget/Form/textRange');
    }

    public function textarea($name, $value=null, $attr=null){
        $this->assign('name', $this->createName($name));
        $this->assign('value', $value);

        $default_attr['class'] = ['form-control'];
        $default_attr['id'] = $this->createId($name);

        $attr = $this->mergeAttr($default_attr, $attr);

        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        $this->display('Widget/Form/textarea');
    }

    /*
     * opt string 编辑框可选参数
     * */
    public function richtext($name, $value=null, $attr=null){
        $this->assign('name', $this->createName($name));
        $this->assign('value', $value);

        $default_attr['class'] = ['form-control'];
        $default_attr['id'] = $this->createId($name);


        $attr = $this->mergeAttr($default_attr, $attr);
        $this->assign('id', $attr['id']);

        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        $this->display('Widget/Form/richtext');
    }

    public function uploadimg($name, $value=null, $attr=null, $prefix=null){

        $action = C('IMG_UPLOAD_URL');
        $this->assign('action', $action);


        $this->assign('name', $this->createName($name));
        $this->assign('value', $value);
        $this->assign('prefix', $prefix);

        $id = $this->createId($name);
        $this->assign('id', $id);

        $default_attr = array();
        $attr = $this->mergeAttr($default_attr, $attr);

        if(!empty($attr['category'])){
            $this->assign('category', $attr['category']);
            unset($attr['category']);
        }

        if(!empty($attr)){
            $this->assign('attr', $attr);
        }

        layout(false);
        $this->display('Widget/Form/uploadimg');
    }

    /**
     * @param $urlName
     * @param $sortName
     * @param null $value  value:{{url:url,value:value}, ...}
     */
    public function uploadmultipleimgs($urlName, $sortName, $value=null){

        $action = C('MULTIIMG_UPLOAD_URL');
        $this->assign('action', $action);

        $this->assign('urlName', $this->createName($urlName));
        $this->assign('sortName', $this->createName($sortName));
        $this->assign('value', $value);
//        $this->assign('prefix', $prefix);

//        $id = $this->createId($name);
//        $this->assign('id', $id);

//        $default_attr = array();
//        $attr = $this->mergeAttr($default_attr, $attr);
//
//        if(!empty($attr['category'])){
//            $this->assign('category', $attr['category']);
//            unset($attr['category']);
//        }
//
//        if(!empty($attr)){
//            $this->assign('attr', $attr);
//        }

        layout(false);
        $this->display('Widget/Form/uploadmultipleimgs');
    }

    public function createName($name){
        $arr = explode('/', $name);
        if(count($arr)>1){
            $result = '';
            for($i=0;$i<count($arr);$i++){
                if($i==0){
                    $result .= $arr[$i];
                }
                else {
                    $result .= "[".$arr[$i]."]";
                }
            }
            return $result;
        }
        else {
            return $name;
        }
    }



    public function createId($name) {

        $arr = explode('/', $name);

        if(count($arr)>1){
            $result = '';
            for($i=0;$i<count($arr);$i++){
                $result .= ucfirst($arr[$i]);
            }
            return $result;
        }
        else {
            return ucfirst($name);
        }
        echo $name;exit;
    }

    public function mergeAttr($default, $attr){
        foreach($default as $key=>$val){
            if(!empty($attr[$key]) || $attr[$key] === '0'){
                if(is_array($attr[$key]) && is_array($default[$key])){
                    $attr[$key] = array_merge_recursive($default[$key], $attr[$key]);
                }
            }
            else{
                $attr[$key] = $default[$key];
            }
        }

        return $attr;
    }
}