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

	public static function login($connection, $table, $email, $password): ? User
	{
		if (empty($email)) {
			echo json_encode([
				'notification' => [
					'type' => 'Email',
					'message' => 'Email cannot be empty!'
				]]);
			exit();
		}

		if (empty($password)) {
			echo json_encode([
				'notification' => [
					'type' => 'Password',
					'message' => 'Password cannot be empty!'
				]]);
			exit();
		}

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