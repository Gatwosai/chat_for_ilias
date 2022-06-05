<?php
// Скрипт для получения информации о чате
$chat_id = $_GET['chat_id'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$usr_ids = $db->getUsrIdInChat($chat_id);
$creator = $db->getCreator($chat_id);

$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "ilias";
$db = new Database($srv, $usr, $pass, $dbName);
$info = $db->getInfo($usr_ids);
$imgs = $db->getImgForSearch($usr_ids);

$data = array();
foreach ($info as $key => $el) {
	$data[$key] = $el;
	$data[$key] += ['img' => $imgs[$key]];
	$data[$key] += ['usr_id' => $usr_ids[$key]];
}
$data[] = $creator;
header('Content-Type: application/json');
echo json_encode($data);
