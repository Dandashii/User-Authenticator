<?php

$server = '127.0.0.1';
$username = 'root';
$password = '';
$database = 'eduly';
$table = 'users';

$connection = new mysqli($server, $username, $password, $database);

if($connection->connect_error) {
	echo 'Connection has failed: ' . $connection->connect_error;
	exit();
}