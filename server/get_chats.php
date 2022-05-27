<?php
// Скрипт для добавления чатов.
$usr_id = $_GET['usr_id'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$chats = $db->getChats($usr_id);
$data = $chats;
header('Content-Type: application/json');
echo json_encode($data);
