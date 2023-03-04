<?php

$server = 'localhost';
$username = 'root';
$password = '';
$database = 'eduly';

$connection = new mysqli($server, $username, $password, $database);

if($connection->connect_error) {
	echo 'Connection has failed: ' . $connection->connect_error;
	 exit();
}