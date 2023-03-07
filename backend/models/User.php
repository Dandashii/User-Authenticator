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

	public static function login($connection, $email, $password) {
		$stmt = $connection->prepare('SELECT * FROM users WHERE email = ?');
		$stmt->bind_param('s', $email);
		$stmt->execute();
		$result = $stmt->get_result();
		$user = $result->fetch_assoc();

		if (!$user) {
			echo json_encode([
				'notification' => [
					'type' => 'Account',
					'message' => 'Account doesnt exist!'
				]
			]);
			exit();
		}

		if (!password_verify($password, $user['password'])) {
			echo json_encode([
				'notification' => [
					'type' => 'Password',
					'message' => 'Passwords is incorrect!'
				]
			]);
			exit();
		}

		$user_id = $user['id'];
		setcookie('userID', $user_id, time() + (86400 * 30), '/');

		return $user_id;
	}

	public static function getUserById($connection, $user_id): ?User {
		$stmt = $connection->prepare('SELECT * FROM users WHERE id = ?');
		$stmt->bind_param('i', $user_id);
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

		return new User($user->name, $user->email, $user->password);
	}
}