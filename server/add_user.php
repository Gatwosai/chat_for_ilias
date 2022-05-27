<?php
// Скрипт для добавления пользователя в чат.
$usr_id = $_GET['usr_id'];
$chat_id = $_GET['chat_id'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
echo $db->addUser($chat_id, $usr_id);

