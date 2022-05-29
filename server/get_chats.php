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

$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "ilias";
$db = new Database($srv, $usr, $pass, $dbName);
$imgs = $db->getImg($chats);
$db->updateLastSeen($usr_id);

$i = 0;
$data = array();
foreach ($chats as $key => $el) {
	$data[$key] = $el;
	if ($el['usr_id'] != 0) {
		$data[$key] += ['img' => $imgs[$i]];
		$i = $i + 1;
	}
}
header('Content-Type: application/json');
echo json_encode($data);

