<?php
session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

include './database/connection.php';
include './models/User.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

	$user_id = $_COOKIE['userID'];

	echo json_encode(User::getUserById($connection, $user_id));
}


