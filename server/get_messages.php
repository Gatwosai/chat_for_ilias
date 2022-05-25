<?php
/**
 * Скрипт для вывода сообщений.
 */

$chat_id = $_GET['chat_id'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";

require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$messages = $db->getMessages($chat_id);
$data = $messages;
header('Content-Type: application/json');
echo json_encode($data);

