<?php
namespace Admin\Controller;
use Common\Controller\AdminBaseController;

class UploadController extends AdminBaseController {

    public function image() {

        $category = $_GET['category'];
        if(empty($category)){
            $path = C('UPLOAD_DEFAULT');
        }
        else {
            $path = C('UPLOAD_'.strtoupper($category));
        }


        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize   =     3145728 ;// 设置附件上传大小
        $upload->subName   =     '';
        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->savePath  =     $path.date('Ymd').'/'; // 设置附件上传（子）目录

        // 上传文件
        $info   =   $upload->upload();
        //echo $upload->getError();

        $result['name'] = '/'.C('UPLOAD_PREFIX').$info['file']['savepath'].$info['file']['savename'];
        $result['url'] = 'http://'.$_SERVER['SERVER_NAME'].'/'.C('UPLOAD_PREFIX').$info['file']['savepath'].$info['file']['savename'];
        $result['imgUrl'] = $result['url'];
        $result['status'] = 1;
        $result['type'] = 'ajax';
        $result['uri'] = '/'.C('UPLOAD_PREFIX').$info['file']['savepath'].$info['file']['savename'];

        echo json_encode($result);
        exit;

    }


    public function multipleimage() {

        $ext = strtolower(substr(strrchr($_FILES["file"]['name'],'.'),1));
        $objectName = md5(file_get_contents($_FILES['file']['tmp_name'])).'.'.$ext;

        $filePath = $_FILES['file']['tmp_name'];

        $image = $this->uploadToOSS($objectName, $filePath);

        $rs = array();
        if(!empty($image)){
            $rs['name']= $image['uri'];
            $rs['url'] = $image['url'];
            $rs['imgUrl'] = $image['url'];
            $rs['status'] = 1;
            $rs['type'] = 'ajax';
            header("Content-Type:text/html; charset=utf-8");
            exit(json_encode($rs));
        } else {
            $rs['status'] = 0;
            $rs['type'] = 'ajax';
            exit(json_encode($rs));
        }
    }

    function createDir($path){
        if (!file_exists($path)){
            $this->createDir(dirname($path));
            mkdir($path, 0777);
        }
    }
}