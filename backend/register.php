<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$formData = file_get_contents('php://input');

	//Retrieved data from the component
	$formData = json_decode($formData);

	echo $formData->email . $formData->password;
}


