<?php

/**
* General Configuration
*
* All of your system's general configuration settings go in here.
* You can see a list of the default settings in craft/app/etc/config/defaults/general.php
*/

// Determine the incoming protocol
if (isset($_SERVER['HTTPS']) && (strcasecmp($_SERVER['HTTPS'], 'on') === 0 || $_SERVER['HTTPS'] == 1)
|| isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strcasecmp($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') === 0
) {
  $protocol = "https://";
} else {
  $protocol = "http://";
}

return array(

  "*" => array(
    "appId"                     => $_SERVER['SERVER_NAME'],
    "environmentVariables"      => array(
      "basePath"              => $_SERVER["DOCUMENT_ROOT"],
      "baseUrl"               => $protocol . $_SERVER['SERVER_NAME'],
    ),
    "errorTemplatePrefix"       => "_errors/",
    "maxUploadFileSize"         => 33554432, //32mb
    "omitScriptNameInUrls"      => true,
    "siteUrl"                   => $protocol . $_SERVER['SERVER_NAME'],
    "siteVariables" => array(
      "googleAnalytics"       => "",
      "dateFormat"            => "M d, Y",
    ),
    "craftEnv"                  => CRAFT_ENVIRONMENT,
    'backupDbOnUpdate' => false,
  ),
  "local" => array(
    "devMode"                   => true,
    "testToEmailAddress"        => "dev@simplygoodwork.com",
    "patrol" => array(
      "forceSsl" => false,
    )
  ),
  "dev" => array(
    "devMode"                   => true,
    "testToEmailAddress"        => "dev@simplygoodwork.com",
  ),
  "staging" => array(
    "devMode"					=> true,
    "testToEmailAddress"		=> "dev@simplygoodwork.com",
    "patrol" => array(
      "forceSsl" => false,
    )
  ),
  "production" => array(
    "allowAutoUpdates"          => false,
    "siteVariables" => array(
      "googleAnalytics"        => "UA-1007524-1",
    ),
  ),

);
