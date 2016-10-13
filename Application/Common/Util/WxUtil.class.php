<?php
namespace Common\Util;

use Think\Log;

class WxUtil {

    protected $access_token_path;
    protected $jsapi_ticket_path;
    private $appId;
    private $appSecret;
    protected $partnerId;
    protected $partnerKey;

    private $oauth2_url = "https://open.weixin.qq.com/connect/oauth2/authorize?";
    private $access_url = "https://api.weixin.qq.com/sns/oauth2/access_token?";
    private $userinfo_url = 'https://api.weixin.qq.com/sns/userinfo?';

    public function __construct()
    {
        $wxpay = C('WX_PAY');
        $this->appId = $wxpay['appId'];
        $this->appSecret = $wxpay['appSecret'];
        $this->partnerId = $wxpay['partnerId'];
        $this->partnerKey = $wxpay['partnerKey'];
        $wxConfig = C('WX_CONFIG');
        $this->access_token_path = $wxConfig['access_token_path'];
        $this->jsapi_ticket_path = $wxConfig['jsapi_ticket_path'];

    }

    public function IsWxLogin(){
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        if (strpos($user_agent, 'MicroMessenger') === false) {
            // 非微信浏览器禁止浏览
            echo "请使用微信登录";
            exit;
        } else {
            // 微信浏览器，允许访问
            // 获取版本号
            preg_match('/.*?(MicroMessenger\/([0-9.]+))\s*/', $user_agent, $matches);
            $shenmegui = '<br>Version:'.$matches[2];
        }
    }

    /**
     * @param string $type snsapi_base/snsapi_userinfo
     */
    public function getOpenId(){
        $this->IsWxLogin();
        if (!isset($_GET['code'])){
            //触发微信返回code码
            $baseUrl = urlencode( $this->get_url());
            $url = $this->_CreateOauthUrlForCode($baseUrl, 'snsapi_base');
            Header("Location: $url");
            die();
        } else {
            //获取code码，以获取openid
            $code = $_GET['code'];
            list($openid, $access_token) = $this->getAccessTokenAndOpenid($code);

            return $openid;
        }
    }

    //获取用户信息
    public function getWxUserInfo(){
        $this->IsWxLogin();
        if (!isset($_GET['code'])){
            //触发微信返回code码
            $baseUrl = urlencode( $this->get_url());
            $url = $this->_CreateOauthUrlForCode($baseUrl, 'snsapi_base');
            Header("Location: $url");
            die();
        } else {
            //获取code码，以获取openid
            $code = $_GET['code'];
            list($openid, $access_token) = $this->_GetAccessTokenAndOpenid($code);
            $wxUser = $this->_GetWxUserByOpenId($access_token, $openid);

            return $wxUser;
        }
    }

    /**
     *
     * 构造获取code的url连接
     * @param string $redirectUrl 微信服务器回跳的url，需要url编码
     * @param string $type snsapi_base/snsapi_userinfo
     * @return 返回构造好的url
     */
    private function _CreateOauthUrlForCode($redirectUrl, $type='snsapi_base')
    {
        $urlObj["appid"] = $this->appId;
        $urlObj["redirect_uri"] = $redirectUrl;
        $urlObj["response_type"] = "code";
        $urlObj["scope"] = $type;
        $urlObj["state"] = "STATE"."#wechat_redirect";
        return $this->oauth2_url.$this->ToUrlParams($urlObj);
    }

    /**
     *
     * 构造获取open和access_toke的url地址
     * @param string $code，微信跳转带回的code
     *
     * @return 请求的url
     */
    private function _CreateOauthUrlForOpenid($code)
    {
        $urlObj["appid"] = $this->appId;
        $urlObj["secret"] = $this->appSecret;
        $urlObj["code"] = $code;
        $urlObj["grant_type"] = "authorization_code";
        $bizString = $this->ToUrlParams($urlObj);
        return $this->access_url.$bizString;
    }

    private function _GetAccessTokenAndOpenid($code)
    {
        $url = $this->_CreateOauthUrlForOpenid($code);

        //初始化curl
        $res = $this->curl($url);
        Log::write('=======getAccessTokenAndOpenid:'.$res);
        //取出openid
        if(!empty($res)){
            $data = json_decode($res,true);
        }
        $this->data = $data;

        $result['openid'] = $data['openid'];
        $result['access_token'] = $data['access_token'];

        return $result;
    }

    private function curl($url, $data=null){
        $ch = curl_init();
        //设置超时
        curl_setopt($ch, CURLOPT_TIMEOUT, 7200);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,FALSE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        //运行curl，结果以jason形式返回
        $res = curl_exec($ch);
        curl_close($ch);

        return $res;
    }

    private function saveAccessToken($data){
        $token['access_token'] = $data['access_token'];
        $token['expires_in'] = $data['expires_in'];
        file_put_contents($this->access_token_path, json_encode($token));
    }

    private function get_url() {
        $sys_protocal = isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443' ? 'https://' : 'http://';
        $php_self = $_SERVER['PHP_SELF'] ? $_SERVER['PHP_SELF'] : $_SERVER['SCRIPT_NAME'];
        $path_info = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';
        $relate_url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : $php_self.(isset($_SERVER['QUERY_STRING']) ? '?'.$_SERVER['QUERY_STRING'] : $path_info);
        return $sys_protocal.(isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '').$relate_url;
    }



    private function _GetWxUserByOpenId($access_token, $openid){
        $url = $this->userinfo_url.'access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN';

        $res = $this->curl($url);
        Log::write('=======getWxUserByOpenId:'.$res);
        if(!empty($res)){
            $user = json_decode($res,true);
            return $user;
        }

    }

    /**
     *
     * 拼接签名字符串
     * @param array $urlObj
     *
     * @return 返回已经拼接好的字符串
     */
    private function ToUrlParams($urlObj)
    {
        $buff = "";
        foreach ($urlObj as $k => $v)
        {
            if($k != "sign"){
                $buff .= $k . "=" . $v . "&";
            }
        }

        $buff = trim($buff, "&");
        return $buff;
    }
}