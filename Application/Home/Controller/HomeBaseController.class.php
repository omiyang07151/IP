<?php
namespace Home\Controller;
use Common\Controller\BaseController;

class HomeBaseController extends BaseController{

    protected $access_token_path;
    protected $jsapi_ticket_path;
    private $appId;
    private $appSecret;
    protected $partnerId;
    protected $partnerKey;

    public function __construct()
    {
        parent::__construct();
        $wxpay = C('wechat');
        pr($wxpay);
        $this->appId = $wxpay['appId'];
        $this->appSecret = $wxpay['appSecret'];
        $this->partnerId = $wxpay['partnerId'];
        $this->partnerKey = $wxpay['partnerKey'];
        $wxConfig = C('wechat.WX_CONFIG');
        $this->access_token_path = $wxConfig['access_token_path'];
        $this->jsapi_ticket_path = $wxConfig['jsapi_ticket_path'];

        pr($this);
    }

    public function getOpenid(){
        $this->IsWxLogin();
        if (!isset($_GET['code'])){
            //触发微信返回code码
            $baseUrl = urlencode( $this->get_url());
            $url = $this->__CreateOauthUrlForCode($baseUrl);
            Header("Location: $url");
            die();
        } else {
            //获取code码，以获取openid
            $code = $_GET['code'];
            $openid = $this->getOpenidFromMp($code);
            $result = $this->saveClient($openid);
            session(['User'=>$result]);
        }
    }

    function get_url() {
        $sys_protocal = isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443' ? 'https://' : 'http://';
        $php_self = $_SERVER['PHP_SELF'] ? $_SERVER['PHP_SELF'] : $_SERVER['SCRIPT_NAME'];
        $path_info = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';
        $relate_url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : $php_self.(isset($_SERVER['QUERY_STRING']) ? '?'.$_SERVER['QUERY_STRING'] : $path_info);
        return $sys_protocal.(isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '').$relate_url;
    }

    function IsWxLogin(){
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
     *
     * 构造获取code的url连接
     * @param string $redirectUrl 微信服务器回跳的url，需要url编码
     *
     * @return 返回构造好的url
     */
    private function __CreateOauthUrlForCode($redirectUrl)
    {
//        $wxpay = \Config::get('wxpay.WX_PAY');
        $urlObj["appid"] = $this->appId;
        $urlObj["redirect_uri"] = "$redirectUrl";
        $urlObj["response_type"] = "code";
        $urlObj["scope"] = "snsapi_userinfo";
        $urlObj["state"] = "STATE"."#wechat_redirect";
        $bizString = $this->ToUrlParams($urlObj);
        return "https://open.weixin.qq.com/connect/oauth2/authorize?".$bizString;
    }
    /**
     *
     * 构造获取open和access_toke的url地址
     * @param string $code，微信跳转带回的code
     *
     * @return 请求的url
     */
    private function __CreateOauthUrlForOpenid($code)
    {
//        $wxpay = \Config::get('wxpay.WX_PAY');
        $urlObj["appid"] = $this->appId;
        $urlObj["secret"] = $this->appSecret;
        $urlObj["code"] = $code;
        $urlObj["grant_type"] = "authorization_code";
        $bizString = $this->ToUrlParams($urlObj);
        return "https://api.weixin.qq.com/sns/oauth2/access_token?".$bizString;
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