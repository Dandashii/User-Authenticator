<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

include 'models/User.php';
include 'database/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$formData = file_get_contents('php://input');

	$formData = json_decode($formData);

	echo json_encode(User::resetPassword($connection, $table, $formData->email, $formData->password,
		$formData->newPassword, $formData->confirmPassword));
}


