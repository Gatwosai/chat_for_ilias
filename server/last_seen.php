<?php
// Скрипт для проверки онлайна пользователя.
$usr_id = $_GET['usr_id'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "ilias";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$lastSeen = $db->getLastSeen($usr_id);
$time = time() - strtotime($lastSeen);
echo $time / 3600;
