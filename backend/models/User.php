<?php

class User
{
	private int $id;
	private string $name;
	private string $email;
	private string $password;
	private string $jobTitle;
	private string $phoneNo;

	function __construct(string $name = null, string $email = null, string $password = null, string $jobTitle = null, string $phoneNo = null)
	{
		$this->name = $name;
		$this->email = $email;
		$this->password = $password;
		$this->jobTitle = $jobTitle;
		$this->phoneNo = $phoneNo;
	}

	public function getID(): int
	{
		return $this->id;
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

	public function setJobTitle($jobTitle): void
	{
		$this->jobTitle = $jobTitle;
	}

	public function getJobTitle(): string
	{
		return $this->jobTitle;
	}

	public function setPhoneNo($phoneNo): void
	{
		$this->phoneNo = $phoneNo;
	}

	public function getPhoneNo(): string
	{
		return $this->phoneNo;
	}

	public function register($connection, $table): void
	{
		$stmt = $connection->prepare('INSERT INTO ' . $table . '(name, email, password, jobTitle, phoneNo) values(?, ?, ?, ? ,?)');
	}

	public function login($connection, $table): void
	{

	}

	public function logout($connection, $table): void
	{

	}

	public static function findUser($method): string
	{
		return '';
	}
}