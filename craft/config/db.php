<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(
	"*" => array(
		"server" 		=> "127.0.0.1",
		"tablePrefix" 	=> "craft",
	),
	"local" => array(
		"server" 		=> "35.184.47.38",
		"user"			=> "waiting_child",
		"database" 		=> "child",
		"password" 		=> "98H4H#E3UsT7dV",
	),
	"dev" => array(
		"user" 			=> "",
		"password"		=> "",
		"database"		=> "",
	),
	"staging" => array(
		"user" 			=> "1d67c6b45516",
		"password"		=> "373aef278af7b391",
		"database"		=> "gladney",
	),
	"production" => array(
		"server"		=> "35.184.47.38",
		"user" 			=> "waiting_child",
		"password" 		=> "98H4H#E3UsT7dV",
		"database" 		=> "child",
	),
);