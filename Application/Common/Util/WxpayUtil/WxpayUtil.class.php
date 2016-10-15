<?php
namespace Common\Util\WxpayUtil;

require_once(dirname(__FILE__).'/lib/WxPayApi.class.php');
require_once(dirname(__FILE__).'/lib/WxPayDataBase.class.php');
require_once(dirname(__FILE__).'/lib/WxPayException.class.php');
//require_once(dirname(__FILE__).'/lib/wxpay.class.php');

class WxpayUtil {

    public $body;
    public $outTradeNo;
    public $totalFee;
    public $productId;
    public $notifyUrl;

    private $appId;
    private $partnerId;
    private $partnerKey;

    function __construct($appId, $partnerId, $partnerKey)
    {
        $this->appId = $appId;
        $this->partnerId = $partnerId;
        $this->partnerKey = $partnerKey;
        DEFINE('WXPAY_APP_ID',$this->appId);
        DEFINE('WXPAY_APP_SECRET','');
        DEFINE('WXPAY_PARTNER_ID',$this->partnerId);
        DEFINE('WXPAY_PARTNER_KEY',$this->partnerKey);
    }

    public function wxPrepay(){

        $inputObj = new \WxPayUnifiedOrder();
        $inputObj->SetBody($this->body);
        $inputObj->SetOut_trade_no($this->outTradeNo);
        $inputObj->SetTotal_fee($this->totalFee);
        $inputObj->SetNotify_url($this->notifyUrl);
//        if(!$isWechat){
            $inputObj->SetAppid($this->appId);
            $inputObj->SetMch_id($this->partnerId);
            $inputObj->SetTrade_type('NATIVE');
            $inputObj->SetProduct_id($this->productId);
//        }
//        else{
//            $inputObj->SetAppid($this->appId);//公众账号ID
//            $inputObj->SetMch_id($this->partnerId);//商户号
//            $inputObj->SetTrade_type('APP');
//        }

        $result = \WxPayApi::unifiedOrder($inputObj);
        \Think\Log::write('**** wx pre pay order *****:'.json_encode($result));
        if($result['result_code']=='SUCCESS' && $result['return_code']=='SUCCESS'){
//            $data['appid'] = $result['appid'];//WxPayConfig::APPID;
//            $data['partnerid'] = $this->partnerId;
//            $data['noncestr'] = \WxPayApi::getNonceStr();
//            $data['prepayid'] = $result['prepay_id'];
//            $data['package'] = 'Sign=WXPay';
//            $data['timestamp'] = time();//WxPayApi::getMillisecond();
//            $data['sign'] = $this->makSign($data);

            /**
             * 注意, 注意
             * 自定义参数必须加载签名算法之后
             */
            $data['code_url'] = $result['code_url'];
//            $data['code'] = \WxPayApi::getNonceStr();
            /**
             * 注意, 注意
             * 自定义参数必须加载签名算法之后
             */

            return $data;
        } else {
            return false;
        }
    }

    public static function resultInit($xml, $partnerKey='') {
        if(!empty($partnerKey)) {
            DEFINE('WXPAY_PARTNER_KEY', $partnerKey);
        }
        try {
            $xml = \WxPayResults::Init($xml);
        } catch (\WxPayException $e) {
            \Think\Log::write('-*-*-*-*-*-*-*-*- wxpay error notify -*-*-*-*-*-*-*-*- init error : ' . $e->errorMessage());
            die('<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[RESPONSE CHECK ERROR]]></return_msg></xml>');
        }
        return $xml;
    }

    public static function checkNotifyData($notify_data) {
        $verify_result = false;
        $is_fail = false;
        $log_message = '';

        if(!empty($notify_data)) {
            if(isset($notify_data['return_code']) && $notify_data['return_code'] == 'SUCCESS') {
                //支付接口调用成功

                if(isset($notify_data['result_code']) && $notify_data['result_code'] == 'SUCCESS') {
                    $log_message ='-*-*-*-*-*-*-*-*- wxpay notify -*-*-*-*-*-*-*-*- pay success ';
                    //支付成功
                    $verify_result = true;
                } elseif(isset($notify_data['result_code']) && $notify_data['result_code'] == 'FAIL') {
                    //支付失败
                    $log_message ='-*-*-*-*-*-*-*-*- wxpay error notify -*-*-*-*-*-*-*-*- pay fail :'. $notify_data['return_msg'];
                } else {
                    //未知的错误
                    $is_fail = true;
                    $log_message ='-*-*-*-*-*-*-*-*- wxpay error notify -*-*-*-*-*-*-*-*- undefined error code when return code :success ';
                }

            } elseif(isset($notify_data['return_code']) && $notify_data['return_code'] == 'FAIL') {
                //通信失败
                $log_message ='-*-*-*-*-*-*-*-*- wxpay error notify -*-*-*-*-*-*-*-*- connect fail ';
            } else {
                //未知的错误
                $is_fail = true;
                $log_message ='-*-*-*-*-*-*-*-*- wxpay error notify -*-*-*-*-*-*-*-*- undefined error code when return code unkown';
            }
        } else {
            $is_fail = true;
            $log_message ='-*-*-*-*-*-*-*-*- wxpay error notify -*-*-*-*-*-*-*-*- xml format data empty ';
            //未知错误
        }

        \Think\Log::write($log_message);

        if($is_fail) {
            die('<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[RETURN_CODE OR RESULT_CODE UNDEFINED]]></return_msg></xml>');
        }

        return $verify_result;
    }

    protected function makSign($params){
        ksort($params);
        $string = $this->ToUrlParams($params);
        //签名步骤二：在string后加入KEY
        $string = $string . "&key=".\WxPayConfig::KEY;
        //签名步骤三：MD5加密
        $string = md5($string);
        //签名步骤四：所有字符转为大写
        $result = strtoupper($string);
        return $result;
    }

    protected function ToUrlParams($params)
    {
        $buff = "";
        foreach ($params as $k => $v)
        {
            if($k != "sign" && $v != "" && !is_array($v)){
                $buff .= $k . "=" . $v . "&";
            }
        }

        $buff = trim($buff, "&");
        return $buff;
    }
}