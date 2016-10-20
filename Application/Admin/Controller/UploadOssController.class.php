<?php
namespace Admin\Controller;
use Common\Controller\AdminBaseController;
class UploadOssController extends AdminBaseController {

    public function image(){

        if(is_array($_FILES['file']['name'])){
            $data = array();
            for($i=0;$i<count($_FILES['file']['name']);$i++){
                $ext = strtolower(substr(strrchr($_FILES["file"]['name'][$i],'.'),1));
                $objectName = md5(file_get_contents($_FILES['file']['tmp_name'][$i])).'.'.$ext;

                $filePath = $_FILES['file']['tmp_name'][$i];

                $image = $this->uploadToOSS($objectName, $filePath);
                if(!empty($image)){
                    $data[] = $image;
                }
            }

            if(count($data)==count($_FILES['file']['name'])){
                $this->success_output(array('data'=>$data));
            }
            else {
                $this->error_output();
            }
        }
        else {
            $ext = strtolower(substr(strrchr($_FILES["file"]['name'],'.'),1));
            $objectName = md5(file_get_contents($_FILES['file']['tmp_name'])).'.'.$ext;

            $filePath = $_FILES['file']['tmp_name'];

            $image = $this->uploadToOSS($objectName, $filePath);

            if(!empty($image)){
//                $this->success_output(array('data'=>$image));
                echo json_encode($image);
                exit();
            }
            else {
                $this->error_output();
            }
        }
    }

    public function multipleimage() {

//        if(is_array($_FILES['file']['name'])){
//            $data = array();
//            for($i=0;$i<count($_FILES['file']['name']);$i++){
//                $ext = strtolower(substr(strrchr($_FILES["file"]['name'][$i],'.'),1));
//                $objectName = md5(file_get_contents($_FILES['file']['tmp_name'][$i])).'.'.$ext;
//
//                $filePath = $_FILES['file']['tmp_name'][$i];
//
//                $image = $this->uploadToOSS($objectName, $filePath);
//                if(!empty($image)){
//                    $data[] = $image;
//                }
//            }
//
//            if(count($data)==count($_FILES['file']['name'])){
//                $this->success_output(array('data'=>$data));
//            }
//            else {
//                $this->error_output();
//            }
//        }
//        else {
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
//        }
    }

    function upload_test() {
        print_r($_FILES);
    }

    function uploadToOSS($objectName, $filePath){

        $bucket = C('OSS_BUCKET');

        import('Common.Util.ossutil');
        $ossUtil = new \OssUtil($bucket);

        $result = $ossUtil->uploadFile($objectName, $filePath);

        if($result['success']) {
            $image['url'] = C('IMG_PREFIX').C('OSS_BUCKET').'/'.$objectName;
            $image['uri'] = C('OSS_BUCKET').'/'.$objectName;
            return $image;
        } else {
            return null;
        }
    }


}
