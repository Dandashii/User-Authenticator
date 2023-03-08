<?php

class User
{
	public int $id;
	public string $name;
	public string $email;
	public string $password;

	function __construct(string $name = null, string $email = null, string $password = null)
	{
		$this->name = $name;
		$this->email = $email;
		$this->password = $password;
	}

	public function getID(): int
	{
		return $this->id;
	}

	public function setId($id): void
	{
		$this->id = $id;
	}

	public function setName($name): void
	{
		$this->name = $name;
	}

	public function getName(): string
	{
		return $this->name;
	}

	public function setEmail($email): void
	{
		$this->email = $email;
	}

	public function getEmail(): string
	{
		return $this->email;
	}

	public function setPassword($password): void
	{
		$this->password = $password;
	}

	public function getPassword(): string
	{
		return $this->password;
	}

	public function register($connection, $table, $confirmPassword): bool
	{
		if (strlen($this->name) > 40) {
			echo json_encode([
				'notification' => [
					'type' => 'Name',
					'message' => 'Your name cannot be longer than 40 characters!'
				]
			]);
			exit();
		}

		if (!ctype_alpha($this->name)) {
			echo json_encode([
				'notification' => [
					'type' => 'Name',
					'message' => 'Your name can only contain letters!'
				]
			]);
			exit();
		}

		if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
			echo json_encode([
				'notification' => [
					'type' => 'Email',
					'message' => 'Invalid email address!'
				]
			]);
			exit();
		}

		if (strlen($this->password) < 8 || strlen($this->password) > 30) {
			echo json_encode([
				'notification' => [
					'type' => 'Name',
					'message' => 'Password can only be between 8 and 30 characters long!'
				]
			]);
			exit();
		}

		if (!preg_match('/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,30}$/', $this->password)) {
			echo json_encode([
				'notification' => [
					'type' => 'Name',
					'message' => 'Password should contain numbers, letters, and special characters!'
				]
			]);
			exit();
		}

		$stmt = $connection->prepare("SELECT * FROM $table WHERE email = ?");
		$stmt->bind_param("s", $this->email);
		$stmt->execute();
		$result = $stmt->get_result();
		$user = $result->fetch_assoc();
		$stmt->close();

		if ($user !== null) {
			echo json_encode([
				'notification' => [
					'type' => 'Email',
					'message' => 'Email already exists!'
				]
			]);
			exit();
		}

		if ($this->password !== $confirmPassword) {
			echo json_encode([
				'notification' => [
					'type' => 'Password',
					'message' => 'Passwords do no match!'
				]
			]);
			exit();
		}

		$hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);

		$stmt = $connection->prepare("INSERT INTO $table (name, email, password) VALUES (?, ?, ?)");
		$stmt->bind_param("sss", $this->name, $this->email, $hashedPassword);
		$result = $stmt->execute();
		$stmt->close();

		return $result;
	}

	public static function login($connection, $table, $email, $password): ? User
	{

		$stmt = $connection->prepare("SELECT * FROM $table WHERE email = ?");
		$stmt->bind_param("s", $email);
		$stmt->execute();
		$result = $stmt->get_result();
		$user = $result->fetch_object();
		$stmt->close();

		if (!$user) {
			echo json_encode([
				'notification' => [
					'type' => 'Account',
					'message' => 'Account doesnt exist!'
				]
			]);
			exit();
		}

		if (!password_verify($password, $user->password)) {
			echo json_encode([
				'notification' => [
					'type' => 'Password',
					'message' => 'Password is incorrect!'
				]
			]);
			exit();
		}

		return new User($user->name, $user->email, $password);
	}

	public static function resetPassword($connection, $table, $email, $oldPassword, $newPassword, $confirmNewPassword): User
	{
		$passwords = [$newPassword, $confirmNewPassword];

		foreach ($passwords as $pass) {
			if (strlen($pass) < 8 || strlen($pass) > 30) {
				echo json_encode([
					'notification' => [
						'type' => 'Name',
						'message' => 'Password can only be between 8 and 30 characters long!'
					]
				]);
				exit();
			}

			if (!preg_match('/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,30}$/', $pass)) {
				echo json_encode([
					'notification' => [
						'type' => 'Name',
						'message' => 'Password should contain numbers, letters, and special characters!'
					]
				]);
				exit();
			}
		}

		$stmt = $connection->prepare("SELECT * FROM $table WHERE email = ?");
		$stmt->bind_param("s", $email);
		$stmt->execute();
		$result = $stmt->get_result();
		$user = $result->fetch_object();
		$stmt->close();

		if (!password_verify($oldPassword, $user->password)) {
			echo json_encode([
				'notification' => [
					'type' => 'Password',
					'message' => 'Current password is incorrect!'
				]
			]);
			exit();
		}

		if ($oldPassword === $newPassword) {
			echo json_encode([
				'notification' => [
					'type' => 'Password',
					'message' => 'New password cannot be the same as the current password!'
				]
			]);
			exit();
		}

		if ($newPassword !== $confirmNewPassword) {
			echo json_encode([
				'notification' => [
					'type' => 'Password',
					'message' => 'New passwords do not match!'
				]
			]);
			exit();
		}

		$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

		$stmt = $connection->prepare("UPDATE $table SET password = ? WHERE email = ?");
		$stmt->bind_param("ss", $hashedPassword, $email);
		$result = $stmt->execute();
		$stmt->close();

		return new User($user->name, $user->email, $confirmNewPassword);
	}
}