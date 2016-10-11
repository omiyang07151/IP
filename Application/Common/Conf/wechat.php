<?php
return array(
    'WX_PAY' => array(
        'appId' => 'wx988f95d6a5d30aaf',
        'appSecret' => 'd311a603d82c18faae38b6aaabd57199',
        'partnerId'  => '1397444302',
        'partnerKey'=> 'fd709e75702f562e8b6ecdc6b1d53bdd',
    ),

    'WX_CONFIG' => array(
        'access_token_path' => storage_path('wxtoken'.DIRECTORY_SEPARATOR.'access_token.json'),
        'jsapi_ticket_path' => storage_path('wxtoken'.DIRECTORY_SEPARATOR.'jsapi_ticket.json'),
    ),
);