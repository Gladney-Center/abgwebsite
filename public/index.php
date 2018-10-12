<?php

// Path to your craft/ folder
$craftPath = '../craft';

define("CRAFT_TEMPLATES_PATH", "../templates/");

$envs = array(
	"local" => array(
		"en_us"        => array(
			"gladney",
		),
	),
	"dev" => array(
		"en_us"        => array(
		),
	),
	"staging" => array(
		"en_us"        => array(
			"gladney.harry.gw-staging.com",
			"www.gladney.harry.gw-staging.com",
		),
	),
	"production" => array(
		"en_us"        => array(
			"phpstack-15549-365960.cloudwaysapps.com",
			"gladney.org",
			"www.gladney.org",
			"adoptionsbygladney.com",
			"www.adoptionsbygladney.com",
		),
	),
);

$fallbackEnv = "local";
$fallbackLocale = "en_us";
$envSet = false;

function setEnv($locale, $env)
{
	if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {
		$requestScheme = "https://";
	} else {
		$requestScheme = "http://";
	}

	define('CRAFT_SITE_URL',  $requestScheme . $_SERVER['SERVER_NAME']);
	define('CRAFT_LOCALE', $locale);
	define('CRAFT_ENVIRONMENT', $env);
}

foreach($envs as $env => $locales)
{
	foreach($locales as $locale => $domains)
	{
		if (in_array($_SERVER['SERVER_NAME'], $domains)) {
			setEnv($locale, $env);
			$envSet = true;
			break;
		}
	}
}

if (!$envSet) {
	setEnv($fallbackLocale, $fallbackEnv);
}

// Do not edit below this line
$path = rtrim($craftPath, '/').'/app/index.php';

if (!is_file($path))
{
	if (function_exists('http_response_code'))
	{
		http_response_code(503);
	}

	exit('Could not find your craft/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in '.__FILE__);
}

require_once $path;
