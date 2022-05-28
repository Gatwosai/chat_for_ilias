<?php
/**
 * Скрипт для поиска пользователей ilias.
 */
$usr_id = $_GET['usr_id'];
$key = $_GET['key'];
$srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "ilias";
require_once("class.db.php");
$db = new Database($srv, $usr, $pass, $dbName);
$search = $db->searchUser($key);

/*srv = "localhost";
$usr = "iliasuser";
$pass = "123";
$dbName = "chat";
$db = new Database($srv, $usr, $pass, $dbName);*/
$imgs = $db->getImg($search);

$data = array();
foreach ($search as $key => $el) {
	$data[$key] = $el;
	$data[$key] += ['img' => $imgs[$key]];
}
header('Content-Type: application/json');
echo json_encode($data);

