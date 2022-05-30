<?php
/**
 * Скрипт для вывода сообщений.
 */

$chat_id = $_GET['chat_id'];
$usr_id = $_GET['usr_id'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$messages = $db->getMessages($chat_id, $usr_id);

$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "ilias"; 
$db = new Database($srv, $usr, $pass, $dbName);
$imgs = $db->getImgForMsg($messages);
$data = array();
foreach ($messages as $key => $el) {
	$data[$key] = $el;
	$data[$key] += ['img' => $imgs[$key]];
}
header('Content-Type: application/json');
echo json_encode($data);

