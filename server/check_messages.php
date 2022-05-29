<?php
// Скрипт проверки на непрочитанные сообщения.
$chat_id = $_GET['chat_id'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$res = $db->checkNewMessages($chat_id);
echo $res;
